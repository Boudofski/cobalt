<script>
    import { t } from "$lib/i18n/translations";

    import Omnibox from "$components/save/Omnibox.svelte";
    import SupportedServices from "$components/save/SupportedServices.svelte";

    // Hero strip — 8 key platforms as colored abbreviation chips
    const platformStrip = [
        { name: "Instagram",   abbr: "IG", color: "#E1306C" },
        { name: "TikTok",      abbr: "TT", color: "#fe2c55" },
        { name: "Facebook",    abbr: "FB", color: "#1877F2" },
        { name: "X / Twitter", abbr: "X",  color: "#1d9bf0" },
        { name: "Pinterest",   abbr: "PI", color: "#E60023" },
        { name: "Reddit",      abbr: "RD", color: "#FF4500" },
        { name: "Snapchat",    abbr: "SC", color: "#F7B731" },
        { name: "Vimeo",       abbr: "VM", color: "#1AB7EA" },
    ];

    // Full platform showcase (16 tiles)
    const platformTiles = [
        { name: "Instagram",   abbr: "IG",  color: "#E1306C" },
        { name: "TikTok",      abbr: "TT",  color: "#fe2c55" },
        { name: "Facebook",    abbr: "FB",  color: "#1877F2" },
        { name: "X / Twitter", abbr: "X",   color: "#1d9bf0" },
        { name: "Pinterest",   abbr: "PI",  color: "#E60023" },
        { name: "Reddit",      abbr: "RD",  color: "#FF4500" },
        { name: "Snapchat",    abbr: "SC",  color: "#F7B731" },
        { name: "Vimeo",       abbr: "VM",  color: "#1AB7EA" },
        { name: "Twitch",      abbr: "TV",  color: "#9147FF" },
        { name: "Bluesky",     abbr: "BS",  color: "#208BFE" },
        { name: "SoundCloud",  abbr: "SN",  color: "#FF5500" },
        { name: "Dailymotion", abbr: "DM",  color: "#0066DC" },
        { name: "Streamable",  abbr: "ST",  color: "#3B82F6" },
        { name: "Loom",        abbr: "LM",  color: "#7C3AED" },
        { name: "Tumblr",      abbr: "TU",  color: "#6B7B8D" },
        { name: "Bilibili",    abbr: "BL",  color: "#00A1D6" },
    ];
    // 16 tiles fills exactly 2 rows of 8 — no orphan tile

    const stats = [
        { value: "40+",  label: "Platforms",        desc: "Instagram, TikTok, Facebook, Twitter, Pinterest, Reddit, Snapchat, and dozens more." },
        { value: "0",    label: "Signups required", desc: "Just paste a link and download. No account, no email, no tracking — ever." },
        { value: "<5s",  label: "Avg. download",    desc: "Most requests complete in under five seconds at the best available quality." },
        { value: "Free", label: "Always",           desc: "No subscription, no hidden fees. SnapSave will always be free to use." },
    ];

    const guides = [
        {
            slug: "how-to-download-pinterest-videos-on-iphone",
            title: "Download Pinterest Videos on iPhone and Android",
            excerpt: "No native save button? Here's the fastest way to save any public Pinterest video to your phone.",
            tag: "Pinterest",
            tagColor: "#E60023",
            readTime: "4 min",
        },
        {
            slug: "why-your-social-media-video-download-is-not-working",
            title: "Why Your Video Download Is Not Working",
            excerpt: "Private content, expired links, platform blocks — the full troubleshooting guide to fix it fast.",
            tag: "Troubleshooting",
            tagColor: "#F59E0B",
            readTime: "6 min",
        },
        {
            slug: "how-to-download-tiktok-videos-without-installing-an-app",
            title: "Download TikTok Videos Without Installing an App",
            excerpt: "You don't need to install anything. Paste the link in your browser and download in seconds.",
            tag: "TikTok",
            tagColor: "#fe2c55",
            readTime: "4 min",
        },
    ];

    const faqs = [
        {
            q: "Is SnapSave free to use?",
            a: "Yes, SnapSave is completely free. No subscription, no hidden fees, no credit card required.",
        },
        {
            q: "Do I need to create an account?",
            a: "No account needed. Just paste your link and download. We believe privacy means not collecting data in the first place.",
        },
        {
            q: "What video quality can I download?",
            a: "SnapSave fetches the best available quality for your link — up to 4K/8K where the platform supports it. You can also choose to download audio-only.",
        },
        {
            q: "Why isn't my link downloading?",
            a: "Some content is restricted (private accounts, region-locked, age-gated, or live streams). Make sure the content is publicly accessible and try again.",
        },
        {
            q: "Is it legal to download videos?",
            a: "Downloading for personal use is generally fine in most regions. Always respect creators’ rights and platform terms. Do not re-distribute content without permission.",
        },
        {
            q: "Which platforms are supported?",
            a: "Instagram, TikTok, Facebook, Twitter/X, Pinterest, Reddit, Snapchat, Vimeo, Twitch, SoundCloud, Dailymotion, and many more. Click “supported services” in the downloader to see the full list.",
        },
    ];
</script>

<svelte:head>
    <title>SnapSave — Download Videos from Instagram, TikTok, Facebook & More</title>
    <meta property="og:title" content="SnapSave — Download Videos from Instagram, TikTok, Facebook & More" />
    <meta name="twitter:title" content="SnapSave — Social Media Video Downloader" />
    <meta name="description" content="Save videos from Instagram, TikTok, Facebook, Twitter, Pinterest, Reddit, Snapchat and more. Free, fast, no sign-up required." />
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is SnapSave free to use?","acceptedAnswer":{"@type":"Answer","text":"Yes, SnapSave is completely free. No subscription, no hidden fees, no credit card required."}},{"@type":"Question","name":"Do I need to create an account?","acceptedAnswer":{"@type":"Answer","text":"No account needed. Just paste your link and download. We believe privacy means not collecting data in the first place."}},{"@type":"Question","name":"What video quality can I download?","acceptedAnswer":{"@type":"Answer","text":"SnapSave fetches the best available quality for your link. You can also choose to download audio-only."}},{"@type":"Question","name":"Why isn't my link downloading?","acceptedAnswer":{"@type":"Answer","text":"Some content is restricted (private accounts, region-locked, age-gated, or live streams). Make sure the content is publicly accessible and try again."}},{"@type":"Question","name":"Is it legal to download videos?","acceptedAnswer":{"@type":"Answer","text":"Downloading for personal use is generally fine in most regions. Always respect creators' rights and platform terms. Do not re-distribute content without permission."}},{"@type":"Question","name":"Which platforms are supported?","acceptedAnswer":{"@type":"Answer","text":"Instagram, TikTok, Facebook, Twitter/X, Pinterest, Reddit, Snapchat, Vimeo, Twitch, SoundCloud, Dailymotion, and many more."}}]}</script>
</svelte:head>

<div id="snapsave-page">

    <!-- ═══════════════════════════════════════════════════════ HERO -->
    <section id="hero-section" aria-label="SnapSave video downloader">

        <!-- Decorative background layer -->
        <div class="hero-bg" aria-hidden="true">
            <div class="hero-dots"></div>
            <div class="hero-glow hero-glow-blue"></div>
            <div class="hero-glow hero-glow-purple"></div>
        </div>

        <div id="hero-inner">

            <!-- Eyebrow -->
            <div class="hero-eyebrow">
                <span class="eyebrow-pulse"></span>
                Free &middot; No signup &middot; Works on mobile
            </div>

            <!-- Headline -->
            <h1 id="hero-headline">
                Download anything<br>from <span class="headline-accent">social media</span>
            </h1>
            <p id="hero-sub">
                Paste a public link from any platform. Get the file in seconds.
            </p>

            <!-- Platform strip -->
            <div class="platform-strip" aria-label="Supported platforms preview">
                {#each platformStrip as p}
                    <span
                        class="pchip"
                        style="--c: {p.color}"
                        title={p.name}
                    >{p.abbr}</span>
                {/each}
                <span class="pchip pchip-more" title="40+ platforms supported">+40</span>
            </div>

            <!-- Downloader app panel -->
            <div id="hero-panel">
                <div class="panel-chrome" aria-hidden="true">
                    <div class="chrome-dots">
                        <span class="cd-r"></span>
                        <span class="cd-y"></span>
                        <span class="cd-g"></span>
                    </div>
                    <span class="chrome-label">SnapSave — Video Downloader</span>
                </div>
                <div class="panel-body">
                    <Omnibox />
                    <div class="panel-services">
                        <SupportedServices />
                    </div>
                </div>
            </div>

            <!-- Trust row -->
            <div id="hero-trust">
                <span class="trust-item"><span class="trust-check">✓</span> No signup required</span>
                <span class="trust-dot" aria-hidden="true"></span>
                <span class="trust-item"><span class="trust-check">✓</span> Private by default</span>
                <span class="trust-dot" aria-hidden="true"></span>
                <span class="trust-item"><span class="trust-check">✓</span> Works on iPhone Safari</span>
            </div>

        </div>

        <div id="hero-terms">
            {$t("save.terms.note.agreement")}
            <a href="/about/terms">{$t("save.terms.note.link")}</a>
        </div>
    </section>

    <!-- ═════════════════════════════════════════════ PLATFORM SHOWCASE -->
    <section class="page-section" id="platforms-section">
        <div class="section-inner">
            <div class="section-eyebrow">Wide compatibility</div>
            <h2 class="section-heading">Works with your<br>favourite platforms</h2>
            <div id="platform-grid">
                {#each platformTiles as p}
                    <div class="ptile" style="--tc: {p.color}">
                        <span class="ptile-abbr">{p.abbr}</span>
                        <span class="ptile-name">{p.name}</span>
                    </div>
                {/each}
            </div>
            <p class="platforms-note">
                Support does not imply affiliation or endorsement.
                Use "supported services" in the downloader for the complete live list.
            </p>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════ STATS / WHY -->
    <section class="page-section" id="stats-section">
        <div class="section-inner">
            <div class="section-eyebrow">Why SnapSave</div>
            <h2 class="section-heading">Everything you need,<br>nothing you don't</h2>
            <div id="stats-grid">
                {#each stats as s}
                    <div class="stat-card">
                        <span class="stat-value">{s.value}</span>
                        <span class="stat-label">{s.label}</span>
                        <p class="stat-desc">{s.desc}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════ HOW IT WORKS -->
    <section class="page-section" id="how-section">
        <div class="section-inner">
            <div class="section-eyebrow">Simple by design</div>
            <h2 class="section-heading">Download in three steps</h2>
            <div id="steps-flow">
                <div class="step-item">
                    <span class="step-num" aria-hidden="true">01</span>
                    <div class="step-body">
                        <h3 class="step-title">Copy the link</h3>
                        <p class="step-desc">Find a video on any supported platform. Tap Share → Copy Link, or copy the URL from your browser's address bar.</p>
                    </div>
                </div>
                <div class="step-connector" aria-hidden="true">→</div>
                <div class="step-item">
                    <span class="step-num" aria-hidden="true">02</span>
                    <div class="step-body">
                        <h3 class="step-title">Paste into SnapSave</h3>
                        <p class="step-desc">Open SnapSave and paste your link. The platform is detected automatically — no manual selection needed.</p>
                    </div>
                </div>
                <div class="step-connector" aria-hidden="true">→</div>
                <div class="step-item">
                    <span class="step-num" aria-hidden="true">03</span>
                    <div class="step-body">
                        <h3 class="step-title">Download instantly</h3>
                        <p class="step-desc">Hit the button. Your file saves to your device in seconds at the best available quality.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ════════════════════════════════════════════════════════ FAQ -->
    <section class="page-section" id="faq-section">
        <div class="section-inner">
            <div class="section-eyebrow">Got questions?</div>
            <h2 class="section-heading">Frequently asked</h2>
            <div id="faq-list">
                {#each faqs as faq}
                    <details class="faq-item">
                        <summary class="faq-q">
                            <span>{faq.q}</span>
                            <span class="faq-chevron" aria-hidden="true">+</span>
                        </summary>
                        <div class="faq-a">{faq.a}</div>
                    </details>
                {/each}
            </div>
        </div>
    </section>

    <!-- ══════════════════════════════════════════════ LATEST GUIDES -->
    <section class="page-section" id="guides-section">
        <div class="section-inner">
            <div class="guides-header">
                <div>
                    <div class="section-eyebrow">From the blog</div>
                    <h2 class="section-heading">Latest guides</h2>
                </div>
                <a
                    href="/blog"
                    class="view-all-btn"
                    data-umami-event="homepage-blog-all-click"
                >View all guides →</a>
            </div>
            <div id="guides-grid">
                {#each guides as guide}
                    <a
                        href="/blog/{guide.slug}"
                        class="guide-card"
                        data-umami-event="homepage-guide-click"
                        data-umami-event-slug={guide.slug}
                    >
                        <div class="guide-bar" style="background: {guide.tagColor}" aria-hidden="true"></div>
                        <div class="guide-content">
                            <div class="guide-meta-row">
                                <span class="guide-tag" style="color: {guide.tagColor}">{guide.tag}</span>
                                <span class="guide-time">{guide.readTime} read</span>
                            </div>
                            <h3 class="guide-title">{guide.title}</h3>
                            <p class="guide-excerpt">{guide.excerpt}</p>
                            <span class="guide-cta">Read guide →</span>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════ FOOTER -->
    <footer id="snapsave-footer">
        <div id="footer-grid">

            <div class="footer-brand">
                <span class="footer-logo">SnapSave</span>
                <p class="footer-tagline">Download what you love.<br>Free, fast, and private.</p>
                <p class="footer-disclaimer">
                    Not affiliated with Instagram, TikTok, Meta, X Corp, Pinterest, Reddit,
                    Snapchat, or any other platform. Only download public content you own or
                    have permission to save.
                </p>
                <p class="footer-copy">© {new Date().getFullYear()} SnapSave. All rights reserved.</p>
            </div>

            <div class="footer-col">
                <h4 class="footer-col-heading">Downloaders</h4>
                <nav class="footer-links" aria-label="Downloader pages">
                    <a href="/instagram-video-downloader">Instagram Video</a>
                    <a href="/instagram-reels-downloader">Instagram Reels</a>
                    <a href="/tiktok-video-downloader">TikTok Video</a>
                    <a href="/facebook-video-downloader">Facebook Video</a>
                    <a href="/twitter-video-downloader">Twitter Video</a>
                    <a href="/pinterest-video-downloader">Pinterest Video</a>
                    <a href="/reddit-video-downloader">Reddit Video</a>
                    <a href="/snapchat-video-downloader">Snapchat Video</a>
                </nav>
            </div>

            <div class="footer-col">
                <h4 class="footer-col-heading">Product</h4>
                <nav class="footer-links" aria-label="Product pages">
                    <a href="/">Home</a>
                    <a href="/blog">Blog</a>
                    <a href="/rss.xml" type="application/rss+xml">RSS</a>
                    <a href="/status">Status</a>
                    <a href="/about">About</a>
                </nav>
            </div>

            <div class="footer-col">
                <h4 class="footer-col-heading">Legal</h4>
                <nav class="footer-links" aria-label="Legal pages">
                    <a href="/about/privacy">Privacy Policy</a>
                    <a href="/about/terms">Terms of Use</a>
                    <a href="/about/dmca">DMCA</a>
                    <a href="/about/contact">Contact</a>
                </nav>
            </div>

        </div>
    </footer>

</div>

<style>
/* ═══════════════════════════════════════════ PAGE WRAPPER */
#snapsave-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
}

/* ═══════════════════════════════════════════════════ HERO */

/*
 * Force dark palette inside the hero regardless of the user's theme.
 * Every CSS variable referenced by Omnibox, SupportedServices, and
 * decorative elements is overridden here so both light and dark mode
 * users see the same premium dark panel.
 */
#hero-section {
    --secondary:                  #F9FAFB;
    --gray:                       #9CA3AF;
    --blue:                       #3B82F6;
    --button:                     rgba(255,255,255,0.06);
    --button-hover:               rgba(255,255,255,0.10);
    --button-press:               rgba(255,255,255,0.14);
    --button-text:                #F9FAFB;
    --button-stroke:              rgba(255,255,255,0.10);
    --button-box-shadow:          0 0 0 1px rgba(255,255,255,0.10) inset;
    --button-elevated:            rgba(255,255,255,0.08);
    --button-elevated-hover:      rgba(255,255,255,0.13);
    --button-elevated-press:      rgba(255,255,255,0.18);
    --button-elevated-shimmer:    rgba(255,255,255,0.11);
    --button-hover-transparent:   rgba(255,255,255,0.07);
    --button-press-transparent:   rgba(255,255,255,0.11);
    --button-active-hover:        #F9FAFB;
    --input-border:               rgba(255,255,255,0.22);
    --sidebar-highlight:          #3B82F6;
    --toggle-bg:                  rgba(255,255,255,0.2);
    --toggle-bg-enabled:          #3B82F6;
    --popover-glow:               rgba(59,130,246,0.2);
    --popup-bg:                   #111827;
    --popup-stroke:               rgba(255,255,255,0.08);

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 64px var(--padding) 32px;
    background: #080C14;
    color: #F9FAFB;
    overflow: hidden;
}

/* Decorative dot grid */
.hero-bg { position: absolute; inset: 0; pointer-events: none; }

.hero-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.065) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, rgba(0,0,0,0.6) 0%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, rgba(0,0,0,0.6) 0%, transparent 100%);
}

.hero-glow {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(80px);
}

.hero-glow-blue {
    width: 700px;
    height: 500px;
    background: radial-gradient(ellipse, rgba(59,130,246,0.22) 0%, transparent 65%);
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
}

.hero-glow-purple {
    width: 400px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(129,140,248,0.12) 0%, transparent 65%);
    bottom: -60px;
    right: 5%;
}

/* Hero inner content */
#hero-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: 720px;
    text-align: center;
}

/* Eyebrow */
.hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    font-size: 11.5px;
    font-weight: 500;
    color: rgba(255,255,255,0.55);
    letter-spacing: 0.3px;
}

.eyebrow-pulse {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3B82F6;
    box-shadow: 0 0 0 0 rgba(59,130,246,0.6);
    animation: epulse 2.4s ease-in-out infinite;
    flex-shrink: 0;
}

@keyframes epulse {
    0%   { box-shadow: 0 0 0 0 rgba(59,130,246,0.6); }
    60%  { box-shadow: 0 0 0 6px rgba(59,130,246,0); }
    100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
}

/* Headline */
#hero-headline {
    font-size: clamp(34px, 5.5vw, 62px);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -2.5px;
    color: #F9FAFB;
    margin: 0;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}

.headline-accent {
    background: linear-gradient(130deg, #3B82F6 25%, #818CF8 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

#hero-sub {
    font-size: 17px;
    color: rgba(255,255,255,0.62);
    line-height: 1.65;
    margin: 0;
    font-weight: 400;
    max-width: 460px;
}

/* Platform strip */
.platform-strip {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 7px;
    margin-top: -4px;
}

.pchip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: var(--button);        /* fallback */
    background: color-mix(in srgb, var(--c) 14%, rgba(255,255,255,0.05));
    border: 1px solid color-mix(in srgb, var(--c) 28%, rgba(255,255,255,0.08));
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.2px;
    color: var(--c);
    transition: transform 0.12s, box-shadow 0.12s;
    cursor: default;
}

@media (hover: hover) {
    .pchip:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px color-mix(in srgb, var(--c) 35%, transparent);
    }
}

.pchip-more {
    --c: #9CA3AF;
    font-size: 10px;
    letter-spacing: 0;
    color: rgba(255,255,255,0.35);
    border-color: rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
}

/* App panel (downloader wrapper) */
#hero-panel {
    width: 100%;
    max-width: 660px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    box-shadow:
        0 0 0 1px rgba(255,255,255,0.04) inset,
        0 32px 80px rgba(0,0,0,0.5),
        0 0 120px rgba(59,130,246,0.07);
    /* No overflow:hidden — lets SupportedServices popover escape the panel */
}

.panel-chrome {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.02);
    /* Round top corners explicitly so they match panel without overflow:hidden */
    border-radius: 20px 20px 0 0;
}

.chrome-dots {
    display: flex;
    gap: 6px;
    align-items: center;
    flex-shrink: 0;
}

.cd-r, .cd-y, .cd-g {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    opacity: 0.85;
}
.cd-r { background: #FF5F57; }
.cd-y { background: #FEBC2E; }
.cd-g { background: #28C840; }

.chrome-label {
    font-size: 11.5px;
    font-weight: 500;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.3px;
    flex: 1;
    text-align: center;
}

.panel-body {
    padding: 16px 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 0;
}

.panel-services {
    display: flex;
    justify-content: flex-start;
    margin-top: 6px;
}

/* Trust row */
#hero-trust {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px 16px;
    margin-top: -4px;
}

.trust-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    font-weight: 500;
}

.trust-check {
    color: #3B82F6;
    font-size: 11px;
    font-weight: 800;
}

.trust-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    flex-shrink: 0;
}

/* Terms */
#hero-terms {
    position: relative;
    z-index: 1;
    margin-top: 20px;
    font-size: 11.5px;
    color: rgba(255,255,255,0.25);
    text-align: center;
    padding-bottom: 8px;
}

#hero-terms a {
    color: rgba(59,130,246,0.8);
    text-decoration: underline;
    text-underline-offset: 2px;
}

/* ═══════════════════════════════════════ SHARED SECTION STYLES */
.page-section {
    padding: 96px var(--padding);
    display: flex;
    justify-content: center;
    border-top: 1px solid var(--content-border);
}

.section-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    max-width: 900px;
    text-align: center;
}

.section-eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--blue);
    opacity: 0.8;
}

.section-heading {
    font-size: clamp(26px, 3.5vw, 40px);
    font-weight: 800;
    letter-spacing: -1.3px;
    color: var(--secondary);
    line-height: 1.15;
    margin: 0;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}

/* ═══════════════════════════════════ PLATFORM SHOWCASE SECTION */
#platform-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 12px;
    width: 100%;
    margin-top: 32px;
}

.ptile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 18px 10px 16px;
    border-radius: 14px;
    aspect-ratio: 1;
    background: var(--button);              /* fallback */
    background: color-mix(in srgb, var(--tc) 8%, var(--button));
    border: 1px solid var(--button-stroke); /* fallback */
    border: 1px solid color-mix(in srgb, var(--tc) 20%, var(--button-stroke));
    transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
    cursor: default;
}

@media (hover: hover) {
    .ptile:hover {
        border-color: color-mix(in srgb, var(--tc) 50%, transparent);
        box-shadow: 0 4px 16px color-mix(in srgb, var(--tc) 15%, transparent);
        transform: translateY(-2px);
    }
}

.ptile-abbr {
    font-size: 15px;
    font-weight: 900;
    color: var(--tc);
    letter-spacing: -0.5px;
    line-height: 1;
}

.ptile-name {
    font-size: 9px;
    font-weight: 600;
    color: var(--gray);
    letter-spacing: 0.2px;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.ptile-overflow {
    --tc: var(--blue);
    background: color-mix(in srgb, var(--blue) 6%, var(--button));
    border: 1px solid color-mix(in srgb, var(--blue) 15%, var(--button-stroke));
}

.ptile-overflow .ptile-abbr {
    font-size: 20px;
    opacity: 0.6;
}

.platforms-note {
    font-size: 12px;
    color: var(--gray);
    opacity: 0.7;
    line-height: 1.65;
    max-width: 520px;
    margin-top: 8px;
}

/* ═════════════════════════════════════════════ STATS SECTION */
#stats-section {
    background: var(--button);
}

#stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    width: 100%;
    margin-top: 36px;
}

.stat-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    padding: 28px 24px 26px;
    border-radius: 18px;
    background: var(--primary);
    border: 1px solid var(--button-stroke);
    text-align: left;
    transition: border-color 0.18s, box-shadow 0.18s;
}

@media (hover: hover) {
    .stat-card:hover {
        border-color: rgba(59,130,246,0.3);
        box-shadow: 0 8px 24px rgba(59,130,246,0.06);
    }
}

.stat-value {
    font-size: 40px;
    font-weight: 800;
    letter-spacing: -2px;
    color: var(--blue);
    line-height: 1;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11", "tnum";
}

.stat-label {
    font-size: 13px;
    font-weight: 700;
    color: var(--secondary);
    letter-spacing: -0.2px;
    line-height: 1;
}

.stat-desc {
    font-size: 13px;
    color: var(--gray);
    line-height: 1.65;
    margin: 6px 0 0;
    font-weight: 400;
}

/* ════════════════════════════════════════ HOW IT WORKS SECTION */
#steps-flow {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-top: 48px;
    gap: 0;
}

.step-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    text-align: left;
    padding: 0 28px 0 0;
}

.step-num {
    font-size: 52px;
    font-weight: 900;
    letter-spacing: -3px;
    line-height: 1;
    background: linear-gradient(130deg, var(--blue) 0%, color-mix(in srgb, var(--blue) 40%, transparent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11", "tnum";
    margin-bottom: -4px;
}

.step-connector {
    font-size: 22px;
    color: var(--button-elevated);
    flex-shrink: 0;
    align-self: center;
    margin: 0 8px;
    padding-bottom: 16px;
    opacity: 0.7;
}

.step-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--secondary);
    margin: 0;
    letter-spacing: -0.3px;
}

.step-desc {
    font-size: 13.5px;
    color: var(--gray);
    line-height: 1.68;
    margin: 0;
    font-weight: 400;
}

/* ═══════════════════════════════════════════════ FAQ SECTION */
#faq-section {
    background: var(--button);
}

#faq-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 720px;
    margin-top: 28px;
    text-align: left;
}

.faq-item {
    border-radius: 14px;
    background: var(--primary);
    border: 1px solid var(--button-stroke);
    overflow: hidden;
    transition: border-color 0.2s;
}

.faq-item[open] {
    border-color: rgba(59,130,246,0.4);
}

.faq-q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 17px 22px;
    font-size: 14.5px;
    font-weight: 600;
    color: var(--secondary);
    cursor: pointer;
    list-style: none;
    transition: color 0.15s;
}

.faq-q::-webkit-details-marker { display: none; }

@media (hover: hover) { .faq-q:hover { color: var(--blue); } }

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
    color: var(--blue);
}

.faq-a {
    padding: 14px 22px 18px;
    font-size: 13.5px;
    color: var(--gray);
    line-height: 1.75;
    font-weight: 400;
    border-top: 1px solid var(--button-stroke);
}

/* ══════════════════════════════════════════ GUIDES SECTION */
#guides-section {
    padding-bottom: 80px;
}

.guides-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
}

.guides-header > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
}

.view-all-btn {
    display: inline-flex;
    padding: 9px 20px;
    border-radius: var(--border-radius);
    border: 1px solid rgba(59,130,246,0.28);
    font-size: 13.5px;
    font-weight: 600;
    color: var(--blue);
    text-decoration: none;
    white-space: nowrap;
    transition: border-color 0.15s, background 0.15s;
    flex-shrink: 0;
}

@media (hover: hover) {
    .view-all-btn:hover {
        border-color: var(--blue);
        background: rgba(59,130,246,0.05);
    }
}

#guides-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    width: 100%;
    margin-top: 8px;
}

.guide-card {
    display: flex;
    flex-direction: column;
    border-radius: 18px;
    background: var(--button);
    border: 1px solid var(--button-stroke);
    text-decoration: none;
    overflow: hidden;
    transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
}

@media (hover: hover) {
    .guide-card:hover {
        border-color: rgba(59,130,246,0.35);
        box-shadow: 0 10px 32px rgba(59,130,246,0.08);
        transform: translateY(-3px);
    }
}

.guide-bar {
    height: 3px;
    width: 100%;
    flex-shrink: 0;
    opacity: 0.9;
}

.guide-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 22px 22px;
    flex: 1;
    text-align: left;
}

.guide-meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.guide-tag {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.guide-time {
    font-size: 11.5px;
    color: var(--gray);
}

.guide-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--secondary);
    margin: 0;
    line-height: 1.42;
    letter-spacing: -0.2px;
}

.guide-excerpt {
    font-size: 13px;
    color: var(--gray);
    line-height: 1.68;
    margin: 0;
    flex: 1;
}

.guide-cta {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--blue);
    margin-top: 4px;
}

/* ═════════════════════════════════════════════════ FOOTER */
#snapsave-footer {
    border-top: 1px solid var(--content-border);
    padding: 64px var(--padding) 52px;
}

#footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 32px 48px;
    max-width: 960px;
    margin: 0 auto;
}

.footer-brand {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.footer-logo {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(130deg, #3B82F6 20%, #818CF8 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    display: inline-block;
}

.footer-tagline {
    font-size: 14px;
    color: var(--gray);
    line-height: 1.7;
    margin: 0;
}

.footer-disclaimer {
    font-size: 11.5px;
    color: var(--gray);
    line-height: 1.65;
    margin: 0;
    opacity: 0.6;
    max-width: 300px;
}

.footer-copy {
    font-size: 11.5px;
    color: var(--gray);
    opacity: 0.4;
    margin: 0;
}

.footer-col {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.footer-col-heading {
    font-size: 11px;
    font-weight: 700;
    color: var(--secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.5;
    margin: 0;
}

.footer-links {
    display: flex;
    flex-direction: column;
    gap: 11px;
}

.footer-links a {
    font-size: 13.5px;
    color: var(--gray);
    text-decoration: none;
    transition: color 0.15s;
}

@media (hover: hover) {
    .footer-links a:hover { color: var(--secondary); }
}

/* ══════════════════════════════════════════════ RESPONSIVE */

/* 900px — footer collapses to 2 columns; stats stays at 4 */
@media screen and (max-width: 900px) {
    #footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 32px;
    }
}

/* 768px — platform 6-col (not 4, avoids 154px oversized tiles); steps vertical */
@media screen and (max-width: 768px) {
    #platform-grid {
        grid-template-columns: repeat(6, 1fr);
    }

    #steps-flow {
        flex-direction: column;
        gap: 32px;
    }

    .step-connector { display: none; }
    .step-item { padding: 0; }
}

/* 660px — guides single column, header stacks */
@media screen and (max-width: 660px) {
    #guides-grid {
        grid-template-columns: 1fr;
    }

    .guides-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
}

/* 535px — full mobile layout */
@media screen and (max-width: 535px) {
    #hero-section {
        min-height: calc(
            100svh - var(--sidebar-height-mobile) - var(--sidebar-inner-padding) * 2
        );
        padding: 44px 16px 24px;
    }

    #hero-inner { gap: 16px; }

    #hero-headline {
        font-size: 30px;
        letter-spacing: -1.5px;
    }

    #hero-sub { font-size: 15px; }

    /* +40 chip redundant on mobile — SupportedServices button serves the same purpose */
    .pchip-more { display: none; }
    .platform-strip { gap: 6px; }
    .pchip { width: 34px; height: 34px; font-size: 9.5px; }

    #hero-panel { border-radius: 16px; }
    .panel-chrome {
        padding: 10px 14px;
        border-radius: 16px 16px 0 0;
    }
    .chrome-label { font-size: 10.5px; }
    .cd-r, .cd-y, .cd-g { width: 9px; height: 9px; }
    .panel-body { padding: 12px 12px 10px; }

    #hero-trust { gap: 8px 12px; }
    .trust-dot { display: none; }

    .page-section { padding: 60px 16px; }

    #platform-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
    }
    .ptile { padding: 14px 6px 12px; border-radius: 10px; }
    .ptile-abbr { font-size: 12px; }
    .ptile-name { font-size: 8px; }

    /* Stats 2-col at mobile only */
    #stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }
    .stat-value { font-size: 32px; letter-spacing: -1.5px; }

    #footer-grid {
        grid-template-columns: 1fr;
        gap: 28px;
    }
    .footer-disclaimer { max-width: none; }
}
</style>
