#!/usr/bin/env bash
# SnapSave EC2 backend — full production setup
# Run as ubuntu user on the EC2 server:
#   bash setup.sh
# ─────────────────────────────────────────────

set -euo pipefail

# ── CONFIG ────────────────────────────────────
API_IP="13.60.230.102"
API_PORT="9000"

# Set this to wherever you cloned the cobalt repo
REPO_DIR="${REPO_DIR:-/home/ubuntu/cobalt}"
API_DIR="$REPO_DIR/api"

PM2_NAME="snapsave-api"
ECOSYSTEM="$REPO_DIR/infra/ecosystem.config.cjs"
# ─────────────────────────────────────────────

log() { echo -e "\033[1;34m[setup]\033[0m $*"; }
ok()  { echo -e "\033[1;32m[ok]\033[0m $*"; }
warn(){ echo -e "\033[1;33m[warn]\033[0m $*"; }
die() { echo -e "\033[1;31m[error]\033[0m $*"; exit 1; }

# ── 1. Sanity checks ──────────────────────────
log "Checking environment..."

[[ -d "$API_DIR" ]] || die "API dir not found: $API_DIR — set REPO_DIR env var before running"
[[ -f "$API_DIR/package.json" ]] || die "No package.json in $API_DIR"

node_version=$(node --version 2>/dev/null) || die "node not found — install Node 18+ first"
log "Node: $node_version"

pnpm_version=$(pnpm --version 2>/dev/null) || die "pnpm not found — run: npm install -g pnpm"
log "pnpm: $pnpm_version"

# ── 2. Kill any old manual node processes ─────
log "Cleaning up old node processes on port $API_PORT..."
OLD_PIDS=$(lsof -ti tcp:"$API_PORT" 2>/dev/null || true)
if [[ -n "$OLD_PIDS" ]]; then
    warn "Killing PIDs using port $API_PORT: $OLD_PIDS"
    kill -9 $OLD_PIDS 2>/dev/null || true
    sleep 1
fi
ok "Port $API_PORT clear"

# ── 3. Install PM2 ────────────────────────────
if ! command -v pm2 &>/dev/null; then
    log "Installing PM2 globally..."
    npm install -g pm2
else
    log "PM2 already installed: $(pm2 --version)"
fi

# ── 4. Install API dependencies ───────────────
log "Installing API dependencies..."
cd "$API_DIR"
pnpm install --frozen-lockfile 2>/dev/null || pnpm install
ok "Dependencies ready"

# ── 5. Write ecosystem config ─────────────────
log "Writing ecosystem config..."
cat > "$ECOSYSTEM" << EOFCONFIG
module.exports = {
    apps: [
        {
            name: "$PM2_NAME",
            script: "src/cobalt.js",
            cwd: "$API_DIR",
            instances: 1,
            exec_mode: "fork",
            autorestart: true,
            watch: false,
            max_memory_restart: "400M",
            env: {
                NODE_ENV: "production",
                API_PORT: "$API_PORT",
                API_URL: "http://$API_IP:$API_PORT",
                CORS_WILDCARD: "1",
            },
            error_file: "/home/ubuntu/.pm2/logs/snapsave-api-error.log",
            out_file:  "/home/ubuntu/.pm2/logs/snapsave-api-out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",
            max_restarts: 10,
            restart_delay: 4000,
            min_uptime: "10s",
        },
    ],
};
EOFCONFIG
ok "Ecosystem config written to $ECOSYSTEM"

# ── 6. Stop existing PM2 process if running ───
if pm2 list | grep -q "$PM2_NAME"; then
    warn "Stopping existing PM2 process: $PM2_NAME"
    pm2 delete "$PM2_NAME" || true
fi

# ── 7. Start via PM2 ──────────────────────────
log "Starting $PM2_NAME via PM2..."
pm2 start "$ECOSYSTEM"
sleep 2

# ── 8. Verify it started ──────────────────────
STATUS=$(pm2 list | grep "$PM2_NAME" | grep -o "online\|stopped\|errored" || echo "unknown")
if [[ "$STATUS" == "online" ]]; then
    ok "PM2 process is ONLINE"
else
    die "PM2 process status: $STATUS — check logs: pm2 logs $PM2_NAME"
fi

# ── 9. Test API response ──────────────────────
log "Testing API response..."
sleep 1
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 "http://localhost:$API_PORT" 2>/dev/null || echo "000")
if [[ "$HTTP_CODE" == "200" ]]; then
    ok "API responds HTTP 200 on port $API_PORT"
elif [[ "$HTTP_CODE" == "000" ]]; then
    warn "Could not reach API on port $API_PORT — check pm2 logs $PM2_NAME"
else
    ok "API responds HTTP $HTTP_CODE on port $API_PORT (expected for root endpoint)"
fi

# ── 10. Save PM2 process list ─────────────────
log "Saving PM2 process list..."
pm2 save
ok "PM2 config saved"

# ── 11. Set up systemd startup ────────────────
log "Configuring PM2 startup (systemd)..."
STARTUP_CMD=$(pm2 startup systemd -u ubuntu --hp /home/ubuntu 2>&1 | grep "sudo env" || true)

if [[ -n "$STARTUP_CMD" ]]; then
    log "Running startup command..."
    eval "$STARTUP_CMD"
    ok "PM2 startup configured"
else
    warn "Could not auto-detect startup command. Run manually:"
    warn "  pm2 startup systemd -u ubuntu --hp /home/ubuntu"
    warn "  (copy and run the sudo command it outputs)"
fi

# ── 12. Install nginx ─────────────────────────
log "Installing nginx..."
sudo apt-get update -qq
sudo apt-get install -y nginx
sudo systemctl enable nginx
ok "nginx installed"

# ── 13. Copy nginx config (disabled until HTTPS ready) ──
NGINX_EXAMPLE="$REPO_DIR/infra/nginx/snapsave-api.conf"
log "Nginx config example is at: $NGINX_EXAMPLE"
log "When you have a domain + SSL cert, run:"
log "  sudo cp $NGINX_EXAMPLE /etc/nginx/sites-available/snapsave-api"
log "  sudo ln -s /etc/nginx/sites-available/snapsave-api /etc/nginx/sites-enabled/"
log "  sudo certbot --nginx -d api.snapssave.com"
log "  sudo nginx -t && sudo systemctl reload nginx"

# ── 14. Memory / system info ──────────────────
echo ""
log "─── System summary ───────────────────────"
echo "  Node:   $(node --version)"
echo "  pnpm:   $(pnpm --version)"
echo "  PM2:    $(pm2 --version)"
echo "  RAM:    $(free -h | awk '/^Mem:/ {print $2 " total, " $3 " used, " $7 " available"}')"
echo "  CPU:    $(nproc) core(s)"
echo "  Uptime: $(uptime -p)"
echo ""
log "─── PM2 status ────────────────────────────"
pm2 list

echo ""
ok "Setup complete. API is running on http://localhost:$API_PORT"
echo ""
echo "Useful commands:"
echo "  pm2 status           → process list"
echo "  pm2 logs snapsave-api → live logs"
echo "  pm2 restart snapsave-api"
echo "  pm2 stop snapsave-api"
echo "  pm2 monit            → real-time monitor"
