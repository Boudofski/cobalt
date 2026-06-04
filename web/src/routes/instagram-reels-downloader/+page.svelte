<script>
    import Omnibox from "$components/save/Omnibox.svelte";

    const faqs = [
        {
            q: "How do I download an Instagram Reel?",
            a: "Open the Reel on Instagram, tap the three-dot menu (⋯), and select 'Copy link'. Paste the link into SnapSave above and click download.",
        },
        {
            q: "Can I download Reels without logging in to Instagram?",
            a: "Yes. SnapSave works on public Reels without any Instagram account or login.",
        },
        {
            q: "What resolution are downloaded Reels?",
            a: "SnapSave downloads Instagram Reels at the highest resolution available, typically up to 1080p.",
        },
        {
            q: "Why can't I download a Reel?",
            a: "SnapSave can only download public Reels. Private accounts, restricted content, and removed videos cannot be downloaded.",
        },
        {
            q: "Does SnapSave work on mobile?",
            a: "Yes. SnapSave is fully mobile-friendly. Open snapssave.com in your mobile browser, paste the Reel link, and save the file.",
        },
    ];
</script>

<svelte:head>
    <title>Instagram Reels Downloader — Save Reels Free in HD | SnapSave</title>
    <meta name="description" content="Download Instagram Reels for free in HD. No account needed. Paste any public Reel link and save it to your device instantly with SnapSave." />
    <meta property="og:title" content="Instagram Reels Downloader — Save Reels Free in HD | SnapSave" />
    <meta property="og:description" content="Download Instagram Reels for free in HD. No account needed. Paste any public Reel link and save it instantly with SnapSave." />
    <meta name="twitter:title" content="Instagram Reels Downloader — SnapSave" />
    <meta name="twitter:description" content="Download Instagram Reels free in HD. No login required." />
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I download an Instagram Reel?","acceptedAnswer":{"@type":"Answer","text":"Open the Reel on Instagram, tap the three-dot menu (⋯), and select 'Copy link'. Paste the link into SnapSave above and click download."}},{"@type":"Question","name":"Can I download Reels without logging in to Instagram?","acceptedAnswer":{"@type":"Answer","text":"Yes. SnapSave works on public Reels without any Instagram account or login."}},{"@type":"Question","name":"What resolution are downloaded Reels?","acceptedAnswer":{"@type":"Answer","text":"SnapSave downloads Instagram Reels at the highest resolution available, typically up to 1080p."}},{"@type":"Question","name":"Why can't I download a Reel?","acceptedAnswer":{"@type":"Answer","text":"SnapSave can only download public Reels. Private accounts, restricted content, and removed videos cannot be downloaded."}},{"@type":"Question","name":"Does SnapSave work on mobile?","acceptedAnswer":{"@type":"Answer","text":"Yes. SnapSave is fully mobile-friendly. Open snapssave.com in your mobile browser, paste the Reel link, and save the file."}}]}</script>
</svelte:head>

<div class="lp-page">
    <section class="lp-hero">
        <div class="lp-hero-inner">
            <div class="lp-badge">Free · HD · No Login</div>
            <h1 class="lp-title">Instagram Reels Downloader</h1>
            <p class="lp-sub">
                Save any public Instagram Reel in HD quality. Paste the link below and download in seconds.
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
            <h2 class="lp-heading">How to download Instagram Reels</h2>
            <ol class="lp-steps">
                <li>Open Instagram and navigate to the Reel you want to save.</li>
                <li>Tap the three-dot menu (⋯) and select <strong>Copy link</strong>.</li>
                <li>Paste the copied link into SnapSave above.</li>
                <li>Click the download button. Your Reel will be saved to your device.</li>
            </ol>
        </div>
    </section>

    <section class="lp-section lp-alt">
        <div class="lp-inner">
            <h2 class="lp-heading">Why SnapSave for Reels?</h2>
            <ul class="lp-bullets">
                <li><strong>No watermark</strong> — saves the original file directly from Instagram.</li>
                <li><strong>HD quality</strong> — up to 1080p where available.</li>
                <li><strong>No account</strong> — no Instagram login required.</li>
                <li><strong>Zero storage</strong> — we never keep your links or files.</li>
                <li><strong>Works everywhere</strong> — desktop and mobile browsers supported.</li>
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
                <a href="/instagram-video-downloader" class="lp-link">Instagram Video Downloader</a>
                <a href="/tiktok-video-downloader" class="lp-link">TikTok Video Downloader</a>
                <a href="/facebook-video-downloader" class="lp-link">Facebook Video Downloader</a>
                <a href="/twitter-video-downloader" class="lp-link">Twitter Video Downloader</a>
                <a href="/pinterest-video-downloader" class="lp-link">Pinterest Video Downloader</a>
                <a href="/reddit-video-downloader" class="lp-link">Reddit Video Downloader</a>
                <a href="/blog/how-to-save-instagram-reels-online" class="lp-link">How to Save Instagram Reels →</a>
            </div>
        </div>
    </section>
</div>

<style>
    .lp-page {
        display: flex;
        flex-direction: column;
        width: 100%;
        --platform-accent: #C13584;
    }

    .lp-hero {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 82vh;
        padding: 64px var(--padding) 44px;
    }

    .lp-hero-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        max-width: 680px;
        width: 100%;
        text-align: center;
    }

    .lp-badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 6px 16px;
        border-radius: 999px;
        background: var(--button);
        border: 1px solid var(--button-stroke);
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.8px;
        color: var(--platform-accent);
        text-transform: uppercase;
    }

    .lp-badge::before {
        content: "";
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--platform-accent);
        opacity: 0.75;
        flex-shrink: 0;
    }

    .lp-title {
        font-size: clamp(26px, 4.5vw, 46px);
        font-weight: 800;
        letter-spacing: -1.5px;
        color: var(--secondary);
        margin: 0;
        line-height: 1.12;
        font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    }

    .lp-sub {
        font-size: 16.5px;
        color: var(--gray);
        line-height: 1.7;
        max-width: 500px;
        margin: 0;
        font-weight: 400;
    }

    .lp-omnibox {
        width: 100%;
        max-width: 640px;
        filter: drop-shadow(0 2px 20px rgba(59,130,246,0.10));
    }

    .lp-disclaimer {
        font-size: 11.5px;
        color: var(--gray);
        opacity: 0.65;
        line-height: 1.6;
        max-width: 520px;
        margin: 0;
    }

    .lp-section {
        padding: 72px var(--padding);
        display: flex;
        justify-content: center;
        border-top: 1px solid var(--content-border);
    }

    .lp-alt { background: var(--button); }
    .lp-inner { max-width: 720px; width: 100%; }

    .lp-heading {
        font-size: clamp(19px, 2.5vw, 28px);
        font-weight: 700;
        color: var(--secondary);
        margin: 0 0 28px;
        letter-spacing: -0.6px;
        font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    }

    /* Steps as numbered cards */
    .lp-steps {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        counter-reset: lp-step;
    }

    .lp-steps li {
        counter-increment: lp-step;
        display: flex;
        align-items: flex-start;
        gap: 14px;
        font-size: 14.5px;
        color: var(--gray);
        line-height: 1.65;
        padding: 16px 18px;
        border-radius: 14px;
        background: var(--button);
        border: 1px solid var(--button-stroke);
    }

    .lp-steps li::before {
        content: counter(lp-step);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 22px;
        height: 22px;
        border-radius: 6px;
        background: color-mix(in srgb, var(--blue) 10%, transparent);
        border: 1px solid color-mix(in srgb, var(--blue) 20%, transparent);
        color: var(--blue);
        font-size: 10.5px;
        font-weight: 800;
        flex-shrink: 0;
        margin-top: 2px;
    }

    .lp-bullets {
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 0;
    }

    .lp-bullets li {
        color: var(--gray);
        font-size: 14.5px;
        line-height: 1.65;
    }

    .lp-faq { display: flex; flex-direction: column; gap: 8px; }

    .faq-item {
        border-radius: 14px;
        background: var(--button);
        border: 1px solid var(--button-stroke);
        overflow: hidden;
        transition: border-color 0.2s;
    }

    .faq-item[open] {
        border-color: color-mix(in srgb, var(--platform-accent) 50%, transparent);
    }

    .faq-q {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 16px 20px;
        font-size: 14px;
        font-weight: 600;
        color: var(--secondary);
        cursor: pointer;
        list-style: none;
        transition: color 0.15s;
    }

    .faq-q::-webkit-details-marker { display: none; }

    .faq-chevron {
        font-size: 20px;
        font-weight: 300;
        color: var(--gray);
        flex-shrink: 0;
        transition: transform 0.2s;
        line-height: 1;
    }

    .faq-item[open] .faq-chevron {
        transform: rotate(45deg);
        color: var(--platform-accent);
    }

    .faq-a {
        padding: 14px 20px 18px;
        font-size: 13.5px;
        color: var(--gray);
        line-height: 1.75;
        font-weight: 400;
        border-top: 1px solid var(--button-stroke);
    }

    .lp-link-grid { display: flex; flex-wrap: wrap; gap: 8px; }

    .lp-link {
        padding: 8px 16px;
        border-radius: var(--border-radius);
        background: var(--button);
        border: 1px solid var(--button-stroke);
        font-size: 13px;
        font-weight: 500;
        color: var(--blue);
        text-decoration: none;
        transition: border-color 0.15s, background 0.15s;
    }

    @media (hover: hover) {
        .faq-q:hover { color: var(--platform-accent); }
        .lp-link:hover { border-color: rgba(59,130,246,0.4); background: var(--button-hover); }
    }

    @media (max-width: 535px) {
        .lp-hero { min-height: 72vh; padding: 44px 16px 36px; }
        .lp-section { padding: 52px 16px; }
    }
</style>
