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
                API_URL: "https://api.snapssave.com",
                CORS_WILDCARD: "1",

                // YouTube bot-protection tokens (poToken + contentBinding).
                // Required server: bgutil-ytdlp-pot-provider (see SERVER.md).
                // Install it, then uncomment this line and reload PM2.
                // YOUTUBE_SESSION_SERVER: "http://127.0.0.1:4416",

                // YouTube auth cookies — fixes "bot" error for ALL quality levels
                // including standard HD (1080p and below) where YOUTUBE_SESSION_SERVER
                // alone has no effect. See SERVER.md for how to export cookies.
                // COOKIE_PATH: "/home/ubuntu/cobalt/api/cookies.json",
            },

            error_file: "/home/ubuntu/.pm2/logs/snapsave-api-error.log",
            out_file: "/home/ubuntu/.pm2/logs/snapsave-api-out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",

            // Restart after 10 crashes, then back off
            max_restarts: 10,
            restart_delay: 4000,
            min_uptime: "10s",
        },

        // YouTube poToken server — generates proof-of-origin tokens for >1080p downloads.
        // Install first (see SERVER.md), then uncomment this block and run:
        //   pm2 reload infra/ecosystem.config.cjs --update-env && pm2 save
        //
        // {
        //     name: "snapsave-pot",
        //     script: "build/main.js",
        //     cwd: "/home/ubuntu/bgutil-ytdlp-pot-provider/server",
        //     instances: 1,
        //     exec_mode: "fork",
        //     autorestart: true,
        //     watch: false,
        //     max_memory_restart: "300M",
        //     env: {
        //         NODE_ENV: "production",
        //     },
        //     error_file: "/home/ubuntu/.pm2/logs/snapsave-pot-error.log",
        //     out_file: "/home/ubuntu/.pm2/logs/snapsave-pot-out.log",
        //     log_date_format: "YYYY-MM-DD HH:mm:ss Z",
        //     max_restarts: 10,
        //     restart_delay: 4000,
        //     min_uptime: "10s",
        // },
    ],
};
