# SnapSave — Server Operations

## Infrastructure Overview

| Component | Location | URL |
|-----------|----------|-----|
| Frontend  | Vercel (static) | https://snapssave.com |
| API       | AWS EC2 Ubuntu (`t3.micro`) | http://13.60.230.102:9000 |
| Process manager | PM2 | `snapsave-api` |

**Target state (once domain + SSL are set up):**
- API served at `https://api.snapssave.com`
- nginx reverse proxy on EC2: port 80/443 → localhost:9000
- Vercel `WEB_DEFAULT_API` = `https://api.snapssave.com`

---

## Initial Server Setup

SSH into the server, then run the setup script from the repo:

```bash
ssh -i /path/to/key.pem ubuntu@13.60.230.102

# Set REPO_DIR if the repo is not at /home/ubuntu/cobalt
export REPO_DIR=/home/ubuntu/cobalt

bash ~/cobalt/infra/setup.sh
```

The script handles everything: PM2 install, process start, systemd startup, nginx install.

---

## PM2 — Daily Operations

```bash
# View status
pm2 status

# Live logs
pm2 logs snapsave-api

# Last 200 log lines
pm2 logs snapsave-api --lines 200

# Restart API (zero-downtime)
pm2 restart snapsave-api

# Stop API
pm2 stop snapsave-api

# Real-time CPU/memory monitor
pm2 monit

# After any manual config changes:
pm2 save
```

---

## Updating the API

```bash
ssh -i /path/to/key.pem ubuntu@13.60.230.102

cd /home/ubuntu/cobalt
git pull origin main

cd api
pnpm install --frozen-lockfile

pm2 restart snapsave-api
pm2 logs snapsave-api --lines 50
```

---

## Startup / Reboot Recovery

PM2 is configured to start automatically on boot via systemd.

To verify:
```bash
sudo systemctl status pm2-ubuntu
```

To re-run setup if systemd was lost:
```bash
pm2 startup systemd -u ubuntu --hp /home/ubuntu
# Run the sudo command it outputs
pm2 save
```

To test reboot safety (DO NOT run carelessly — reboots the server):
```bash
sudo reboot
# Wait ~60 seconds, then:
ssh -i /path/to/key.pem ubuntu@13.60.230.102
pm2 status
curl http://13.60.230.102:9000
```

---

## Nginx — Reverse Proxy (for HTTPS / domain setup)

### When you have DNS pointing api.snapssave.com → 13.60.230.102:

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx -y

# Copy the prepared nginx config
sudo cp ~/cobalt/infra/nginx/snapsave-api.conf /etc/nginx/sites-available/snapsave-api
sudo ln -s /etc/nginx/sites-available/snapsave-api /etc/nginx/sites-enabled/

# Test
sudo nginx -t

# Get SSL certificate (auto-configures nginx)
sudo certbot --nginx -d api.snapssave.com

# Reload
sudo systemctl reload nginx
```

Then update `web/vercel.json`:
```json
"WEB_DEFAULT_API": "https://api.snapssave.com"
```
and redeploy on Vercel.

---

## Firewall / Networking

### Ubuntu UFW
```bash
sudo ufw status
sudo ufw allow 22      # SSH
sudo ufw allow 80      # HTTP
sudo ufw allow 443     # HTTPS
sudo ufw allow 9000    # Direct API access (can close after nginx is set up)
sudo ufw enable
```

### AWS Security Group (console)
Required inbound rules:
| Type  | Protocol | Port | Source    |
|-------|----------|------|-----------|
| SSH   | TCP      | 22   | Your IP   |
| HTTP  | TCP      | 80   | 0.0.0.0/0 |
| HTTPS | TCP      | 443  | 0.0.0.0/0 |
| Custom TCP | TCP | 9000 | 0.0.0.0/0 |

---

## Health Checks

```bash
# Test API locally on server
curl http://localhost:9000

# Test API from outside
curl http://13.60.230.102:9000

# After HTTPS is set up
curl https://api.snapssave.com

# Check what's listening on port 9000
sudo lsof -i :9000

# Check system resources
free -h
df -h
uptime
```

---

## Vercel Environment Variables

In Vercel project settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `WEB_DEFAULT_API` | `http://13.60.230.102:9000` (HTTP — temporary) |
| `WEB_DEFAULT_API` | `https://api.snapssave.com` (HTTPS — target state) |

The value is also set in `web/vercel.json` under `build.env` for convenience.

**Important:** Once you have HTTPS set up, update `vercel.json` and redeploy.

---

## ⚠️ Mixed Content Warning

Vercel serves the frontend over HTTPS. The current API is HTTP.  
**Browsers block HTTP requests from HTTPS pages (mixed content).**

This means the downloader will fail in production until you:
1. Set up a domain (e.g. `api.snapssave.com`) pointing to the EC2 IP
2. Run certbot to get an SSL certificate
3. Enable the nginx config
4. Update `WEB_DEFAULT_API` to `https://api.snapssave.com`

---

## Log Locations

```
~/.pm2/logs/snapsave-api-out.log     # stdout
~/.pm2/logs/snapsave-api-error.log   # stderr
/var/log/nginx/access.log            # nginx access (after setup)
/var/log/nginx/error.log             # nginx errors
```

---

## Troubleshooting

**API not responding:**
```bash
pm2 status
pm2 logs snapsave-api --lines 100
sudo lsof -i :9000
```

**PM2 not starting on boot:**
```bash
pm2 startup systemd -u ubuntu --hp /home/ubuntu
# run the sudo command it gives you
pm2 save
sudo systemctl enable pm2-ubuntu
```

**Port 9000 already in use:**
```bash
sudo lsof -ti tcp:9000 | xargs kill -9
pm2 restart snapsave-api
```

**Out of memory:**
```bash
free -h
pm2 monit
# If needed, reduce max_memory_restart in ecosystem.config.cjs and pm2 reload
```
