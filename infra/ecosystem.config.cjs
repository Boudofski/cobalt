module.exports = {
    apps: [
        // ── Main API ─────────────────────────────────────────────────────────
        {
            name: "snapsave-api",
            script: "src/cobalt.js",
            cwd: "/home/ubuntu/cobalt/api",

            instances: 1,
            exec_mode: "fork",

            autorestart: true,
            watch: false,
            max_memory_restart: "400M",

            env: {
                NODE_ENV: "production",
                API_PORT: "9000",
                API_URL: "https://api.snapssave.com",
                CORS_WILDCARD: "1",

                // poToken server — cobalt fetches tokens every 5 min.
                // If the pot server is unreachable, cobalt logs a warning and
                // continues working normally (no crash, no downtime).
                YOUTUBE_SESSION_SERVER: "http://127.0.0.1:4416",

                // YouTube auth cookies — uncomment to fix bot errors for ≤1080p.
                // See SERVER.md for how to export cookies.
                // COOKIE_PATH: "/home/ubuntu/cobalt/api/cookies.json",
            },

            error_file: "/home/ubuntu/.pm2/logs/snapsave-api-error.log",
            out_file: "/home/ubuntu/.pm2/logs/snapsave-api-out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",

            max_restarts: 10,
            restart_delay: 4000,
            min_uptime: "10s",
        },

        // ── YouTube poToken server ────────────────────────────────────────────
        // Generates poToken + contentBinding for YouTube bot bypass (>1080p only).
        // Install: cd /home/ubuntu/bgutil-ytdlp-pot-provider/server && npm ci && npx tsc
        {
            name: "snapsave-pot",
            script: "build/main.js",
            cwd: "/home/ubuntu/bgutil-ytdlp-pot-provider/server",

            instances: 1,
            exec_mode: "fork",

            autorestart: true,
            watch: false,
            max_memory_restart: "300M",

            env: {
                NODE_ENV: "production",
            },

            error_file: "/home/ubuntu/.pm2/logs/snapsave-pot-error.log",
            out_file: "/home/ubuntu/.pm2/logs/snapsave-pot-out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",

            max_restarts: 10,
            restart_delay: 4000,
            min_uptime: "10s",
        },
    ],
};
