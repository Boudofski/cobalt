<script lang="ts">
    import { onMount } from "svelte";

    const API_URL = "https://api.snapssave.com";

    type Status = "checking" | "online" | "degraded" | "offline";

    let apiStatus: Status = "checking";
    let lastChecked = "";
    let responseTime = 0;

    const check = async () => {
        apiStatus = "checking";
        const start = Date.now();
        try {
            const res = await fetch(API_URL, { method: "HEAD", signal: AbortSignal.timeout(6000) });
            responseTime = Date.now() - start;
            // cobalt API returns 405 for HEAD on / which means it's reachable
            if (res.ok || res.status === 405 || res.status === 404) {
                apiStatus = responseTime > 3000 ? "degraded" : "online";
            } else {
                apiStatus = "degraded";
            }
        } catch {
            apiStatus = "offline";
            responseTime = 0;
        }
        lastChecked = new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    };

    onMount(check);
</script>

<svelte:head>
    <title>SnapSave Status — Service Status Page</title>
    <meta name="description" content="Check the current status of SnapSave's video downloader API and services." />
    <meta name="robots" content="noindex, follow" />
</svelte:head>

<div class="status-page">
    <div class="status-container">

        <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="/">SnapSave</a>
            <span>›</span>
            <span>Status</span>
        </nav>

        <header class="status-header">
            <h1 class="status-title">Service Status</h1>
            <p class="status-sub">Current operational status of SnapSave's API and downloader.</p>
        </header>

        <div class="status-card" data-status={apiStatus}>
            <div class="status-indicator">
                <div class="status-dot" aria-hidden="true"></div>
                <div class="status-label-group">
                    <span class="status-name">SnapSave API</span>
                    <span class="status-url">{API_URL}</span>
                </div>
                <span class="status-badge">
                    {#if apiStatus === "checking"}
                        Checking…
                    {:else if apiStatus === "online"}
                        Online{responseTime ? ` · ${responseTime}ms` : ""}
                    {:else if apiStatus === "degraded"}
                        Degraded
                    {:else}
                        Offline
                    {/if}
                </span>
            </div>
        </div>

        <div class="platform-card">
            <h2 class="platform-heading">Supported platforms</h2>
            <div class="platform-grid">
                {#each ["Instagram", "TikTok", "Facebook", "X / Twitter", "Pinterest", "Reddit", "Snapchat", "Vimeo", "Twitch", "SoundCloud", "Dailymotion", "Bluesky"] as platform}
                    <span class="platform-chip">{platform}</span>
                {/each}
            </div>
            <p class="platform-note">Support depends on the source platform's availability. Occasional failures are normal when a platform temporarily restricts automated access.</p>
        </div>

        <div class="actions-row">
            {#if apiStatus !== "checking"}
                <button class="recheck-btn" on:click={check}>Check again</button>
            {/if}
            {#if lastChecked}
                <span class="last-checked">Last checked at {lastChecked}</span>
            {/if}
        </div>

        <div class="contact-row">
            <p>Experiencing persistent issues? <a href="/about/contact">Contact support →</a></p>
        </div>

    </div>
</div>

<style>
    .status-page { display: flex; justify-content: center; padding: 48px var(--padding) 80px; min-height: 100%; }
    .status-container { max-width: 640px; width: 100%; display: flex; flex-direction: column; gap: 24px; }

    .breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--gray); }
    .breadcrumb a { color: var(--blue); text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }

    .status-header { display: flex; flex-direction: column; gap: 8px; }
    .status-title { font-size: clamp(24px, 3.5vw, 32px); font-weight: 700; letter-spacing: -0.8px; color: var(--secondary); margin: 0; }
    .status-sub { font-size: 14.5px; color: var(--gray); margin: 0; line-height: 1.6; }

    .status-card {
        padding: 20px 22px; border-radius: var(--border-radius);
        background: var(--button); border: 1px solid var(--button-stroke);
    }
    .status-card[data-status="online"] { border-color: rgba(34,197,94,0.4); }
    .status-card[data-status="degraded"] { border-color: rgba(234,179,8,0.4); }
    .status-card[data-status="offline"] { border-color: rgba(239,68,68,0.4); }

    .status-indicator { display: flex; align-items: center; gap: 14px; }

    .status-dot {
        width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
        background: var(--gray);
        animation: pulse 2s infinite;
    }
    .status-card[data-status="checking"] .status-dot { background: var(--gray); }
    .status-card[data-status="online"] .status-dot { background: #22C55E; }
    .status-card[data-status="degraded"] .status-dot { background: #EAB308; }
    .status-card[data-status="offline"] .status-dot { background: #EF4444; animation: none; }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
    }

    .status-label-group { display: flex; flex-direction: column; gap: 2px; flex: 1; }
    .status-name { font-size: 14px; font-weight: 600; color: var(--secondary); }
    .status-url { font-size: 12px; color: var(--gray); }

    .status-badge {
        font-size: 13px; font-weight: 600; padding: 4px 12px;
        border-radius: 999px; white-space: nowrap;
    }
    .status-card[data-status="checking"] .status-badge { background: rgba(100,116,139,0.15); color: var(--gray); }
    .status-card[data-status="online"] .status-badge { background: rgba(34,197,94,0.12); color: #22C55E; }
    .status-card[data-status="degraded"] .status-badge { background: rgba(234,179,8,0.12); color: #EAB308; }
    .status-card[data-status="offline"] .status-badge { background: rgba(239,68,68,0.12); color: #EF4444; }

    .platform-card { padding: 20px 22px; border-radius: var(--border-radius); background: var(--button); border: 1px solid var(--button-stroke); display: flex; flex-direction: column; gap: 14px; }
    .platform-heading { font-size: 14px; font-weight: 700; color: var(--secondary); margin: 0; }
    .platform-grid { display: flex; flex-wrap: wrap; gap: 8px; }
    .platform-chip { padding: 4px 12px; border-radius: 999px; background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.2); font-size: 12.5px; color: var(--blue); font-weight: 500; }
    .platform-note { font-size: 12.5px; color: var(--gray); line-height: 1.6; margin: 0; }

    .actions-row { display: flex; align-items: center; gap: 14px; }
    .recheck-btn { padding: 8px 18px; border-radius: var(--border-radius); background: var(--button); border: 1px solid var(--button-stroke); font-size: 13px; font-weight: 600; color: var(--secondary); cursor: pointer; transition: border-color 0.18s; }
    .recheck-btn:hover { border-color: var(--blue); color: var(--blue); }
    .last-checked { font-size: 12.5px; color: var(--gray); }

    .contact-row { font-size: 13.5px; color: var(--gray); }
    .contact-row a { color: var(--blue); text-decoration: underline; }

    @media (max-width: 535px) { .status-page { padding: 32px 16px 60px; } .status-indicator { flex-wrap: wrap; } .status-badge { align-self: flex-start; margin-left: 24px; } }
</style>
