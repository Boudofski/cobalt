// ROLLBACK CONFIG — API only, no pot server, no YOUTUBE_SESSION_SERVER.
// Use this to instantly restore a known-good state:
//
//   pm2 delete snapsave-pot
//   pm2 reload infra/ecosystem.api-only.config.cjs --update-env
//   pm2 save
//   pm2 status   # snapsave-api should be online
//
module.exports = {
    apps: [
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
            },

            error_file: "/home/ubuntu/.pm2/logs/snapsave-api-error.log",
            out_file: "/home/ubuntu/.pm2/logs/snapsave-api-out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",

            max_restarts: 10,
            restart_delay: 4000,
            min_uptime: "10s",
        },
    ],
};
