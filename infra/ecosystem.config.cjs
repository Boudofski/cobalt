module.exports = {
    apps: [
        {
            name: "snapsave-api",
            script: "src/cobalt.js",

            // Updated by setup.sh — set to your actual cobalt/api path
            cwd: "/home/ubuntu/cobalt/api",

            instances: 1,
            exec_mode: "fork",

            autorestart: true,
            watch: false,
            max_memory_restart: "400M",

            env: {
                NODE_ENV: "production",
                API_PORT: "9000",
                API_URL: "http://13.60.230.102:9000",
                CORS_WILDCARD: "1",
            },

            error_file: "/home/ubuntu/.pm2/logs/snapsave-api-error.log",
            out_file: "/home/ubuntu/.pm2/logs/snapsave-api-out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",

            // Restart after 10 crashes, then back off
            max_restarts: 10,
            restart_delay: 4000,
            min_uptime: "10s",
        },
    ],
};
