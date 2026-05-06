<script>
    import Omnibox from "$components/save/Omnibox.svelte";

    const faqs = [
        {
            q: "How do I download an Instagram video?",
            a: "Copy the Instagram video URL from your browser or the app's share menu, paste it into SnapSave above, and click the download button. Your file will be saved instantly.",
        },
        {
            q: "Can I download Instagram videos without an account?",
            a: "Yes. SnapSave requires no account or login. Just paste the public link and download.",
        },
        {
            q: "Does SnapSave download Instagram Stories?",
            a: "SnapSave can download publicly accessible Instagram content. Stories from private accounts or that have expired cannot be downloaded.",
        },
        {
            q: "What quality are the downloaded videos?",
            a: "SnapSave fetches the highest quality available from Instagram — typically up to 1080p.",
        },
        {
            q: "Is it legal to download Instagram videos?",
            a: "Downloading for personal, offline use is generally permitted in most regions. Always respect the original creator's rights. Do not re-upload or redistribute content without permission.",
        },
    ];
</script>

<svelte:head>
    <title>Instagram Video Downloader — Save Instagram Videos Free | SnapSave</title>
    <meta name="description" content="Download Instagram videos for free in HD quality. No login required. Paste any public Instagram video link and save it instantly with SnapSave." />
    <meta property="og:title" content="Instagram Video Downloader — Save Instagram Videos Free | SnapSave" />
    <meta property="og:description" content="Download Instagram videos for free in HD quality. No login required. Paste any public Instagram video link and save it instantly with SnapSave." />
    <meta name="twitter:title" content="Instagram Video Downloader — SnapSave" />
    <meta name="twitter:description" content="Download Instagram videos for free in HD quality. No login required." />
</svelte:head>

<div class="lp-page">
    <section class="lp-hero">
        <div class="lp-hero-inner">
            <div class="lp-badge">Free · HD · No Login</div>
            <h1 class="lp-title">Instagram Video Downloader</h1>
            <p class="lp-sub">
                Save any public Instagram video in HD quality. Paste the link, click download — done in seconds.
            </p>
            <div class="lp-omnibox">
                <Omnibox />
            </div>
            <p class="lp-disclaimer">
                Only download public content you own or have permission to save. Respect creators' rights and Instagram's terms.
            </p>
        </div>
    </section>

    <section class="lp-section">
        <div class="lp-inner">
            <h2 class="lp-heading">How to download Instagram videos</h2>
            <ol class="lp-steps">
                <li>Open Instagram and find the video you want to save.</li>
                <li>Tap the three-dot menu (⋯) → <strong>Copy link</strong>, or copy the URL from your browser's address bar.</li>
                <li>Paste the link into SnapSave above.</li>
                <li>Click the download button and save the file to your device.</li>
            </ol>
        </div>
    </section>

    <section class="lp-section lp-alt">
        <div class="lp-inner">
            <h2 class="lp-heading">Why use SnapSave?</h2>
            <ul class="lp-bullets">
                <li><strong>No signup</strong> — no account, no email, no tracking.</li>
                <li><strong>HD quality</strong> — downloads at the highest resolution available.</li>
                <li><strong>Fast</strong> — most downloads complete in under 5 seconds.</li>
                <li><strong>Private</strong> — we never store your links or files.</li>
                <li><strong>Multi-platform</strong> — also works with TikTok, YouTube, Facebook, and more.</li>
            </ul>
        </div>
    </section>

    <section class="lp-section">
        <div class="lp-inner">
            <h2 class="lp-heading">Frequently asked questions</h2>
            <div class="lp-faq">
                {#each faqs as faq}
                    <details class="faq-item">
                        <summary class="faq-q">{faq.q}<span class="faq-chevron" aria-hidden="true">+</span></summary>
                        <div class="faq-a">{faq.a}</div>
                    </details>
                {/each}
            </div>
        </div>
    </section>

    <section class="lp-section lp-links">
        <div class="lp-inner">
            <h2 class="lp-heading">Also available</h2>
            <div class="lp-link-grid">
                <a href="/instagram-reels-downloader" class="lp-link">Instagram Reels Downloader</a>
                <a href="/tiktok-video-downloader" class="lp-link">TikTok Video Downloader</a>
                <a href="/youtube-shorts-downloader" class="lp-link">YouTube Shorts Downloader</a>
                <a href="/facebook-video-downloader" class="lp-link">Facebook Video Downloader</a>
                <a href="/twitter-video-downloader" class="lp-link">Twitter Video Downloader</a>
            </div>
        </div>
    </section>
</div>

<style>
    .lp-page { display: flex; flex-direction: column; width: 100%; }

    .lp-hero {
        display: flex; justify-content: center; align-items: center;
        min-height: 80vh; padding: 60px var(--padding) 40px;
    }
    .lp-hero-inner {
        display: flex; flex-direction: column; align-items: center;
        gap: 18px; max-width: 680px; width: 100%; text-align: center;
    }
    .lp-badge {
        display: inline-flex; align-items: center; padding: 5px 14px;
        border-radius: 999px; background: var(--button); border: 1px solid var(--button-elevated);
        font-size: 12px; font-weight: 600; letter-spacing: 0.5px; color: var(--blue); text-transform: uppercase;
    }
    .lp-title {
        font-size: clamp(24px, 4.5vw, 44px); font-weight: 700;
        letter-spacing: -1.2px; color: var(--secondary); margin: 0; line-height: 1.15;
    }
    .lp-sub {
        font-size: 16px; color: var(--gray); line-height: 1.6; max-width: 500px; margin: 0;
    }
    .lp-omnibox { width: 100%; max-width: 640px; }
    .lp-disclaimer {
        font-size: 11.5px; color: var(--gray); opacity: 0.65; line-height: 1.5; max-width: 520px; margin: 0;
    }

    .lp-section {
        padding: 64px var(--padding); display: flex; justify-content: center;
        border-top: 1px solid var(--content-border);
    }
    .lp-alt { background: var(--button); }
    .lp-inner { max-width: 720px; width: 100%; }
    .lp-heading {
        font-size: clamp(18px, 2.5vw, 26px); font-weight: 700;
        color: var(--secondary); margin: 0 0 24px; letter-spacing: -0.5px;
    }

    .lp-steps { padding-left: 20px; display: flex; flex-direction: column; gap: 12px; margin: 0; }
    .lp-steps li { color: var(--gray); font-size: 14.5px; line-height: 1.6; }
    .lp-bullets { padding-left: 20px; display: flex; flex-direction: column; gap: 10px; margin: 0; }
    .lp-bullets li { color: var(--gray); font-size: 14.5px; line-height: 1.6; }

    .lp-faq { display: flex; flex-direction: column; gap: 8px; }
    .faq-item {
        border-radius: var(--border-radius); background: var(--button);
        border: 1px solid var(--button-stroke); overflow: hidden;
    }
    .faq-item[open] { border-color: rgba(59,130,246,0.35); }
    .faq-q {
        display: flex; align-items: center; justify-content: space-between;
        gap: 16px; padding: 14px 18px; font-size: 14px; font-weight: 600;
        color: var(--secondary); cursor: pointer; list-style: none;
    }
    .faq-q::-webkit-details-marker { display: none; }
    .faq-chevron { font-size: 18px; font-weight: 300; color: var(--gray); flex-shrink: 0; }
    .faq-item[open] .faq-chevron { transform: rotate(45deg); color: var(--blue); }
    .faq-a {
        padding: 0 18px 14px; font-size: 13.5px; color: var(--gray);
        line-height: 1.7; border-top: 1px solid var(--button-stroke); padding-top: 12px;
    }

    .lp-links { }
    .lp-link-grid { display: flex; flex-wrap: wrap; gap: 10px; }
    .lp-link {
        padding: 8px 16px; border-radius: var(--border-radius);
        background: var(--button); border: 1px solid var(--button-stroke);
        font-size: 13px; font-weight: 500; color: var(--blue); text-decoration: none;
        transition: border-color 0.2s;
    }
    .lp-link:hover { border-color: var(--blue); }

    @media (max-width: 535px) {
        .lp-hero { min-height: 70vh; padding: 40px 16px 32px; }
        .lp-section { padding: 48px 16px; }
    }
</style>
