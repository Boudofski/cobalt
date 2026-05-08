<script>
    import Omnibox from "$components/save/Omnibox.svelte";

    const faqs = [
        {
            q: "How do I download a Facebook video?",
            a: "Open the Facebook video in your browser, copy the URL from the address bar, paste it into SnapSave above, and click download.",
        },
        {
            q: "Can I download Facebook Reels?",
            a: "Yes. SnapSave supports Facebook Reels and regular Facebook videos. Paste the public link and save.",
        },
        {
            q: "Do I need a Facebook account?",
            a: "No Facebook account is needed to use SnapSave. However, the video must be publicly accessible.",
        },
        {
            q: "What quality are Facebook videos downloaded in?",
            a: "SnapSave downloads at the highest quality Facebook provides, typically HD where available.",
        },
        {
            q: "Why can't I download a Facebook video?",
            a: "Only publicly visible Facebook videos can be downloaded. Videos from private profiles, friends-only posts, or restricted content cannot be saved.",
        },
    ];
</script>

<svelte:head>
    <title>Facebook Video Downloader — Save Facebook Videos Free | SnapSave</title>
    <meta name="description" content="Download Facebook videos and Reels for free in HD. No login required. Paste any public Facebook video link and save it with SnapSave." />
    <meta property="og:title" content="Facebook Video Downloader — Save Facebook Videos Free | SnapSave" />
    <meta property="og:description" content="Download Facebook videos and Reels for free in HD. No login required. Paste the link and save instantly." />
    <meta name="twitter:title" content="Facebook Video Downloader — SnapSave" />
    <meta name="twitter:description" content="Download Facebook videos free in HD. No login required." />
</svelte:head>

<div class="lp-page">
    <section class="lp-hero">
        <div class="lp-hero-inner">
            <div class="lp-badge">Free · HD · No Login</div>
            <h1 class="lp-title">Facebook Video Downloader</h1>
            <p class="lp-sub">
                Save any public Facebook video or Reel in HD quality. Paste the link below and download instantly.
            </p>
            <div class="lp-omnibox">
                <Omnibox />
            </div>
            <p class="lp-disclaimer">
                Only download public content you own or have permission to save. Respect creators' rights and Facebook's terms.
            </p>
        </div>
    </section>

    <section class="lp-section">
        <div class="lp-inner">
            <h2 class="lp-heading">How to download Facebook videos</h2>
            <ol class="lp-steps">
                <li>Open the Facebook video in your browser.</li>
                <li>Copy the URL from the address bar (or right-click the video and copy the video link).</li>
                <li>Paste the link into SnapSave above.</li>
                <li>Click download and save the file to your device.</li>
            </ol>
        </div>
    </section>

    <section class="lp-section lp-alt">
        <div class="lp-inner">
            <h2 class="lp-heading">Why use SnapSave?</h2>
            <ul class="lp-bullets">
                <li><strong>No Facebook account needed</strong> — just paste the public URL.</li>
                <li><strong>HD quality</strong> — downloads the highest resolution available.</li>
                <li><strong>Supports Reels</strong> — works with both regular videos and Facebook Reels.</li>
                <li><strong>Zero logging</strong> — your links are never stored or tracked.</li>
                <li><strong>All platforms</strong> — also works with Instagram, TikTok, Twitter, Pinterest, and more.</li>
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
                <a href="/instagram-reels-downloader" class="lp-link">Instagram Reels Downloader</a>
                <a href="/tiktok-video-downloader" class="lp-link">TikTok Video Downloader</a>
                <a href="/twitter-video-downloader" class="lp-link">Twitter Video Downloader</a>
                <a href="/pinterest-video-downloader" class="lp-link">Pinterest Video Downloader</a>
                <a href="/reddit-video-downloader" class="lp-link">Reddit Video Downloader</a>
            </div>
        </div>
    </section>
</div>

<style>
    .lp-page { display: flex; flex-direction: column; width: 100%; }
    .lp-hero { display: flex; justify-content: center; align-items: center; min-height: 80vh; padding: 60px var(--padding) 40px; }
    .lp-hero-inner { display: flex; flex-direction: column; align-items: center; gap: 18px; max-width: 680px; width: 100%; text-align: center; }
    .lp-badge { display: inline-flex; align-items: center; padding: 5px 14px; border-radius: 999px; background: var(--button); border: 1px solid var(--button-elevated); font-size: 12px; font-weight: 600; letter-spacing: 0.5px; color: var(--blue); text-transform: uppercase; }
    .lp-title { font-size: clamp(24px, 4.5vw, 44px); font-weight: 700; letter-spacing: -1.2px; color: var(--secondary); margin: 0; line-height: 1.15; }
    .lp-sub { font-size: 16px; color: var(--gray); line-height: 1.6; max-width: 500px; margin: 0; }
    .lp-omnibox { width: 100%; max-width: 640px; }
    .lp-disclaimer { font-size: 11.5px; color: var(--gray); opacity: 0.65; line-height: 1.5; max-width: 520px; margin: 0; }
    .lp-section { padding: 64px var(--padding); display: flex; justify-content: center; border-top: 1px solid var(--content-border); }
    .lp-alt { background: var(--button); }
    .lp-inner { max-width: 720px; width: 100%; }
    .lp-heading { font-size: clamp(18px, 2.5vw, 26px); font-weight: 700; color: var(--secondary); margin: 0 0 24px; letter-spacing: -0.5px; }
    .lp-steps { padding-left: 20px; display: flex; flex-direction: column; gap: 12px; margin: 0; }
    .lp-steps li { color: var(--gray); font-size: 14.5px; line-height: 1.6; }
    .lp-bullets { padding-left: 20px; display: flex; flex-direction: column; gap: 10px; margin: 0; }
    .lp-bullets li { color: var(--gray); font-size: 14.5px; line-height: 1.6; }
    .lp-faq { display: flex; flex-direction: column; gap: 8px; }
    .faq-item { border-radius: var(--border-radius); background: var(--button); border: 1px solid var(--button-stroke); overflow: hidden; }
    .faq-item[open] { border-color: rgba(59,130,246,0.35); }
    .faq-q { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 18px; font-size: 14px; font-weight: 600; color: var(--secondary); cursor: pointer; list-style: none; }
    .faq-q::-webkit-details-marker { display: none; }
    .faq-chevron { font-size: 18px; font-weight: 300; color: var(--gray); flex-shrink: 0; }
    .faq-item[open] .faq-chevron { transform: rotate(45deg); color: var(--blue); }
    .faq-a { padding: 0 18px 14px; font-size: 13.5px; color: var(--gray); line-height: 1.7; border-top: 1px solid var(--button-stroke); padding-top: 12px; }
    .lp-link-grid { display: flex; flex-wrap: wrap; gap: 10px; }
    .lp-link { padding: 8px 16px; border-radius: var(--border-radius); background: var(--button); border: 1px solid var(--button-stroke); font-size: 13px; font-weight: 500; color: var(--blue); text-decoration: none; transition: border-color 0.2s; }
    .lp-link:hover { border-color: var(--blue); }
    @media (max-width: 535px) { .lp-hero { min-height: 70vh; padding: 40px 16px 32px; } .lp-section { padding: 48px 16px; } }
</style>
