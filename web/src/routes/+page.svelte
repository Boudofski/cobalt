<script>
    import { t } from "$lib/i18n/translations";

    import Omnibox from "$components/save/Omnibox.svelte";
    import SupportedServices from "$components/save/SupportedServices.svelte";

    import IconBolt from "@tabler/icons-svelte/IconBolt.svelte";
    import IconWorld from "@tabler/icons-svelte/IconWorld.svelte";
    import IconUserOff from "@tabler/icons-svelte/IconUserOff.svelte";
    import IconShieldLock from "@tabler/icons-svelte/IconShieldLock.svelte";

    const features = [
        {
            icon: IconBolt,
            title: "Lightning Fast",
            desc: "Get your media in seconds. No delays, no queues — just instant downloads at full quality.",
        },
        {
            icon: IconWorld,
            title: "Multiple Platforms",
            desc: "Instagram, TikTok, Facebook, Twitter, Pinterest, Reddit, and dozens more all supported out of the box.",
        },
        {
            icon: IconUserOff,
            title: "No Signup Required",
            desc: "Paste, click, done. No account, no email, no tracking — your privacy comes first.",
        },
        {
            icon: IconShieldLock,
            title: "Secure & Private",
            desc: "We never store your links or data. Every request is processed and discarded immediately.",
        },
    ];

    const platforms = [
        "Instagram", "TikTok", "Facebook", "Twitter / X",
        "Pinterest", "Reddit", "Snapchat", "Vimeo",
        "Twitch", "Tumblr", "SoundCloud", "Dailymotion",
        "Bluesky", "Loom", "Streamable", "VK",
    ];

    const guides = [
        {
            slug: "how-to-download-pinterest-videos-on-iphone",
            title: "Download Pinterest Videos on iPhone and Android",
            excerpt: "No native save button? Here's the fastest way to save any public Pinterest video to your phone.",
            tag: "Pinterest",
        },
        {
            slug: "why-your-social-media-video-download-is-not-working",
            title: "Why Your Video Download Is Not Working",
            excerpt: "Private content, expired links, platform blocks — the full troubleshooting guide to fix it fast.",
            tag: "Troubleshooting",
        },
        {
            slug: "how-to-download-tiktok-videos-without-installing-an-app",
            title: "Download TikTok Videos Without Installing an App",
            excerpt: "You don't need to install anything. Paste the link in your browser and download in seconds.",
            tag: "TikTok",
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
            a: "Downloading for personal use is generally fine in most regions. Always respect creators' rights and platform terms. Do not re-distribute content without permission.",
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

    <!-- ═══════════════════════ HERO ═══════════════════════ -->
    <section id="hero-section">
        <div id="hero-content">
            <div id="hero-badge">Free · Fast · Private</div>
            <h1 id="hero-headline">
                Download Videos from<br>
                <span class="gradient-text">Social Media</span> in Seconds
            </h1>
            <p id="hero-sub">
                Fast, free, and private downloader for Instagram, TikTok, Facebook, Twitter, Pinterest, and more.
            </p>

            <div id="hero-omnibox">
                <Omnibox />
            </div>

            <div id="hero-trust">
                <span class="trust-chip">No sign-up required</span>
                <span class="trust-chip">Private by default</span>
                <span class="trust-chip">Works on iPhone Safari</span>
            </div>

            <div id="hero-services">
                <SupportedServices />
            </div>
        </div>

        <div id="hero-terms">
            {$t("save.terms.note.agreement")}
            <a href="/about/terms">{$t("save.terms.note.link")}</a>
        </div>
    </section>

    <!-- ═══════════════════════ FEATURES ═══════════════════════ -->
    <section class="landing-section" id="features-section">
        <div class="section-inner">
            <div class="section-label">Why SnapSave</div>
            <h2 class="section-title">Everything you need,<br>nothing you don't</h2>
            <div id="features-grid">
                {#each features as feature}
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svelte:component this={feature.icon} />
                        </div>
                        <h3 class="feature-title">{feature.title}</h3>
                        <p class="feature-desc">{feature.desc}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- ═══════════════════════ HOW IT WORKS ═══════════════════════ -->
    <section class="landing-section" id="how-section">
        <div class="section-inner">
            <div class="section-label">Simple by design</div>
            <h2 class="section-title">Download in three steps</h2>
            <div id="steps-grid">
                <div class="step-card">
                    <div class="step-number">01</div>
                    <h3 class="step-title">Copy the link</h3>
                    <p class="step-desc">Find a video on any supported platform and copy its URL from the address bar or share menu.</p>
                </div>
                <div class="step-divider" aria-hidden="true">→</div>
                <div class="step-card">
                    <div class="step-number">02</div>
                    <h3 class="step-title">Paste into SnapSave</h3>
                    <p class="step-desc">Click the input at the top of the page and paste your link. SnapSave detects the platform automatically.</p>
                </div>
                <div class="step-divider" aria-hidden="true">→</div>
                <div class="step-card">
                    <div class="step-number">03</div>
                    <h3 class="step-title">Download instantly</h3>
                    <p class="step-desc">Hit the download button and your file will be saved to your device in the best available quality.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════ PLATFORMS ═══════════════════════ -->
    <section class="landing-section" id="platforms-section">
        <div class="section-inner">
            <div class="section-label">Wide compatibility</div>
            <h2 class="section-title">Works with all your<br>favourite platforms</h2>
            <div id="platforms-grid">
                {#each platforms as platform}
                    <div class="platform-badge">{platform}</div>
                {/each}
                <div class="platform-badge platform-more">+ many more</div>
            </div>
            <p class="platforms-note">
                Support for a service does not imply affiliation or endorsement.
                Use the "supported services" button in the downloader for the full live list.
            </p>
        </div>
    </section>

    <!-- ═══════════════════════ FAQ ═══════════════════════ -->
    <section class="landing-section" id="faq-section">
        <div class="section-inner">
            <div class="section-label">Got questions?</div>
            <h2 class="section-title">Frequently asked questions</h2>
            <div id="faq-list">
                {#each faqs as faq}
                    <details class="faq-item">
                        <summary class="faq-question">
                            <span>{faq.q}</span>
                            <span class="faq-chevron" aria-hidden="true">+</span>
                        </summary>
                        <div class="faq-answer">{faq.a}</div>
                    </details>
                {/each}
            </div>
        </div>
    </section>

    <!-- ═══════════════════════ LATEST GUIDES ═══════════════════════ -->
    <section class="landing-section" id="guides-section">
        <div class="section-inner">
            <div class="section-label">From the blog</div>
            <h2 class="section-title">Latest guides</h2>
            <div id="guides-grid">
                {#each guides as guide}
                    <a
                        href="/blog/{guide.slug}"
                        class="guide-card"
                        data-umami-event="homepage-guide-click"
                        data-umami-event-slug={guide.slug}
                    >
                        <span class="guide-tag">{guide.tag}</span>
                        <h3 class="guide-title">{guide.title}</h3>
                        <p class="guide-excerpt">{guide.excerpt}</p>
                        <span class="guide-read">Read guide →</span>
                    </a>
                {/each}
            </div>
            <a href="/blog" class="guides-all-link" data-umami-event="homepage-blog-all-click">
                View all guides →
            </a>
        </div>
    </section>

    <!-- ═══════════════════════ FOOTER ═══════════════════════ -->
    <footer id="snapsave-footer">
        <div id="footer-inner">
            <div id="footer-brand">
                <span id="footer-logo">SnapSave</span>
                <span id="footer-tagline">Download what you love.</span>
            </div>
            <nav id="footer-nav" aria-label="Footer navigation">
                <a href="/">Home</a>
                <a href="/blog">Blog</a>
                <a href="/rss.xml" type="application/rss+xml">RSS</a>
                <a href="/status">Status</a>
                <a href="/about/privacy">Privacy</a>
                <a href="/about/terms">Terms</a>
                <a href="/about/dmca">DMCA</a>
                <a href="/about/contact">Contact</a>
                <a href="/about">About</a>
            </nav>
            <nav id="footer-lp-nav" aria-label="Downloader pages">
                <a href="/instagram-video-downloader">Instagram Video</a>
                <a href="/instagram-reels-downloader">Instagram Reels</a>
                <a href="/tiktok-video-downloader">TikTok Video</a>
                <a href="/facebook-video-downloader">Facebook Video</a>
                <a href="/twitter-video-downloader">Twitter Video</a>
                <a href="/pinterest-video-downloader">Pinterest Video</a>
                <a href="/reddit-video-downloader">Reddit Video</a>
                <a href="/snapchat-video-downloader">Snapchat Video</a>
            </nav>
            <p id="footer-disclaimer">
                SnapSave is not affiliated with Instagram, TikTok, Facebook, Meta, X Corp, Pinterest, Reddit, Snapchat, or any other platform. Users are responsible for respecting copyright and platform terms. Only download public content you own or have permission to save.
            </p>
            <p id="footer-copy">© {new Date().getFullYear()} SnapSave. All rights reserved.</p>
        </div>
    </footer>

</div>

<style>
    /* ─── Page wrapper ─── */
    #snapsave-page {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100%;
    }

    /* ─── HERO ─── */
    #hero-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 60px var(--padding) 32px;
        position: relative;
        overflow: hidden;
    }

    /* dual-layer glow: soft blue centre + faint purple edge */
    #hero-section::before {
        content: "";
        position: absolute;
        width: 860px;
        height: 640px;
        background: radial-gradient(
            ellipse at 50% 48%,
            rgba(59, 130, 246, 0.13) 0%,
            rgba(99, 102, 241, 0.07) 42%,
            transparent 68%
        );
        pointer-events: none;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -54%);
        z-index: 0;
    }

    #hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
        width: 100%;
        max-width: 720px;
        text-align: center;
        flex: 1;
        justify-content: center;
        position: relative;
        z-index: 1;
    }

    #hero-badge {
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
        color: var(--blue);
        text-transform: uppercase;
    }

    #hero-badge::before {
        content: "";
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--blue);
        opacity: 0.8;
        flex-shrink: 0;
    }

    #hero-headline {
        font-size: clamp(32px, 5.5vw, 58px);
        font-weight: 800;
        line-height: 1.1;
        letter-spacing: -2.5px;
        color: var(--secondary);
        margin: 0;
        font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    }

    .gradient-text {
        background: linear-gradient(130deg, #3B82F6 20%, #818CF8 80%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    #hero-sub {
        font-size: 16.5px;
        color: var(--gray);
        line-height: 1.7;
        max-width: 480px;
        margin: 0;
        font-weight: 400;
    }

    #hero-trust {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        margin-top: -4px;
    }

    .trust-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 11.5px;
        font-weight: 500;
        color: var(--gray);
        padding: 5px 12px;
        border-radius: 999px;
        border: 1px solid var(--button-stroke);
        background: var(--button);
        box-shadow: 0 1px 2px rgba(0,0,0,0.04);
        transition: border-color 0.15s;
    }

    .trust-chip::before {
        content: "✓";
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.12);
        color: var(--blue);
        font-size: 9px;
        font-weight: 800;
        flex-shrink: 0;
    }

    #hero-omnibox {
        width: 100%;
        max-width: 640px;
        filter: drop-shadow(0 2px 20px rgba(59, 130, 246, 0.10));
    }

    #hero-services {
        display: flex;
        justify-content: center;
    }

    #hero-terms {
        margin-top: 16px;
        font-size: 11.5px;
        color: var(--gray);
        text-align: center;
        padding-bottom: 8px;
        opacity: 0.75;
    }

    #hero-terms a {
        color: var(--blue);
        text-decoration: underline;
        text-underline-offset: 2px;
        opacity: 1;
    }

    /* ─── Shared section styles ─── */
    .landing-section {
        padding: 88px var(--padding);
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

    .section-label {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1.4px;
        text-transform: uppercase;
        color: var(--blue);
        opacity: 0.85;
    }

    .section-title {
        font-size: clamp(24px, 3.5vw, 38px);
        font-weight: 700;
        letter-spacing: -1.2px;
        color: var(--secondary);
        line-height: 1.18;
        margin: 0;
        font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    }

    /* ─── FEATURES ─── */
    #features-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
        width: 100%;
        margin-top: 28px;
    }

    .feature-card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
        padding: 28px;
        border-radius: 18px;
        background: var(--button);
        border: 1px solid var(--button-stroke);
        text-align: left;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    @media (hover: hover) {
        .feature-card:hover {
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.06);
        }
    }

    .feature-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: linear-gradient(135deg, rgba(59,130,246,0.18), rgba(99,102,241,0.14));
        border: 1px solid rgba(59, 130, 246, 0.15);
        color: var(--blue);
        flex-shrink: 0;
    }

    .feature-icon :global(svg) {
        width: 19px;
        height: 19px;
        stroke-width: 2px;
    }

    .feature-title {
        font-size: 14.5px;
        font-weight: 700;
        color: var(--secondary);
        margin: 0;
        letter-spacing: -0.1px;
    }

    .feature-desc {
        font-size: 13.5px;
        color: var(--gray);
        line-height: 1.68;
        margin: 0;
        font-weight: 400;
    }

    /* ─── HOW IT WORKS ─── */
    #steps-grid {
        display: flex;
        align-items: stretch;
        gap: 12px;
        width: 100%;
        margin-top: 28px;
    }

    .step-card {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 32px 22px;
        border-radius: 18px;
        background: var(--button);
        border: 1px solid var(--button-stroke);
        text-align: center;
    }

    .step-number {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 1.2px;
        color: var(--blue);
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.18);
        padding: 4px 12px;
        border-radius: 999px;
    }

    .step-title {
        font-size: 15px;
        font-weight: 700;
        color: var(--secondary);
        margin: 0;
        letter-spacing: -0.2px;
    }

    .step-desc {
        font-size: 13.5px;
        color: var(--gray);
        line-height: 1.65;
        margin: 0;
        font-weight: 400;
    }

    .step-divider {
        font-size: 20px;
        color: var(--button-elevated);
        flex-shrink: 0;
        font-weight: 300;
        align-self: center;
        padding-bottom: 8px;
    }

    /* ─── PLATFORMS ─── */
    #platforms-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        margin-top: 24px;
    }

    .platform-badge {
        display: inline-flex;
        align-items: center;
        padding: 7px 16px;
        border-radius: 999px;
        background: var(--button);
        border: 1px solid var(--button-stroke);
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary);
        transition: background 0.15s, border-color 0.15s;
    }

    @media (hover: hover) {
        .platform-badge:hover {
            border-color: rgba(59, 130, 246, 0.3);
            background: var(--button-hover);
        }
    }

    .platform-more {
        color: var(--blue);
        border-color: rgba(59, 130, 246, 0.25);
        background: rgba(59, 130, 246, 0.07);
    }

    .platforms-note {
        font-size: 12px;
        color: var(--gray);
        margin-top: 16px;
        max-width: 520px;
        line-height: 1.65;
        font-weight: 400;
        opacity: 0.75;
    }

    /* ─── FAQ ─── */
    #faq-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        margin-top: 24px;
        text-align: left;
    }

    .faq-item {
        border-radius: 14px;
        background: var(--button);
        border: 1px solid var(--button-stroke);
        overflow: hidden;
        transition: border-color 0.2s;
    }

    .faq-item[open] {
        border-color: rgba(59, 130, 246, 0.35);
    }

    .faq-question {
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

    .faq-question::-webkit-details-marker {
        display: none;
    }

    @media (hover: hover) {
        .faq-question:hover {
            color: var(--blue);
        }
    }

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

    .faq-answer {
        padding: 14px 22px 18px;
        font-size: 13.5px;
        color: var(--gray);
        line-height: 1.75;
        font-weight: 400;
        border-top: 1px solid var(--button-stroke);
    }

    /* ─── FOOTER ─── */
    #snapsave-footer {
        border-top: 1px solid var(--content-border);
        padding: 56px var(--padding);
        display: flex;
        justify-content: center;
    }

    #footer-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 22px;
        max-width: 640px;
        width: 100%;
        text-align: center;
    }

    #footer-brand {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
    }

    #footer-logo {
        font-size: 18px;
        font-weight: 800;
        letter-spacing: -0.5px;
        background: linear-gradient(130deg, #3B82F6 20%, #818CF8 80%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    #footer-tagline {
        font-size: 12.5px;
        color: var(--gray);
        font-weight: 400;
        opacity: 0.8;
    }

    #footer-nav, #footer-lp-nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px 22px;
    }

    #footer-nav a, #footer-lp-nav a {
        font-size: 13px;
        color: var(--gray);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.15s;
    }

    @media (hover: hover) {
        #footer-nav a:hover, #footer-lp-nav a:hover {
            color: var(--secondary);
        }
    }

    #footer-lp-nav {
        font-size: 12px;
        opacity: 0.65;
    }

    #footer-disclaimer {
        font-size: 12px;
        color: var(--gray);
        line-height: 1.65;
        opacity: 0.65;
        margin: 0;
        font-weight: 400;
    }

    #footer-copy {
        font-size: 11.5px;
        color: var(--gray);
        opacity: 0.45;
        margin: 0;
        font-weight: 400;
    }

    /* ─── Responsive ─── */
    @media screen and (max-width: 535px) {
        #hero-section {
            min-height: calc(
                100svh - var(--sidebar-height-mobile) - var(--sidebar-inner-padding) * 2
            );
            padding: 48px 16px 28px;
        }

        #hero-section::before {
            width: 340px;
            height: 340px;
        }

        #hero-content {
            gap: 18px;
        }

        #hero-headline {
            font-size: 30px;
            letter-spacing: -1.5px;
        }

        #hero-sub {
            font-size: 15px;
        }

        #hero-omnibox {
            filter: none;
        }

        .landing-section {
            padding: 56px 16px;
        }

        #features-grid {
            grid-template-columns: 1fr;
        }

        #steps-grid {
            flex-direction: column;
            gap: 8px;
        }

        .step-divider {
            transform: rotate(90deg);
        }

        #footer-nav, #footer-lp-nav {
            gap: 8px 16px;
        }
    }

    @media screen and (max-width: 768px) {
        .step-divider {
            display: none;
        }

        #steps-grid {
            flex-direction: column;
            gap: 8px;
        }
    }

    /* ─── LATEST GUIDES ─── */
    #guides-section {
        background: var(--button);
    }

    #guides-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 14px;
        width: 100%;
        margin-top: 24px;
    }

    .guide-card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 22px;
        border-radius: 16px;
        background: var(--primary);
        border: 1px solid var(--button-stroke);
        text-decoration: none;
        transition: border-color 0.18s, box-shadow 0.18s;
    }

    @media (hover: hover) {
        .guide-card:hover {
            border-color: rgba(59, 130, 246, 0.4);
            box-shadow: 0 4px 16px rgba(59, 130, 246, 0.07);
        }
    }

    .guide-tag {
        font-size: 11px;
        font-weight: 700;
        color: var(--blue);
        text-transform: uppercase;
        letter-spacing: 0.6px;
    }

    .guide-title {
        font-size: 14px;
        font-weight: 700;
        color: var(--secondary);
        margin: 0;
        line-height: 1.45;
        letter-spacing: -0.2px;
    }

    .guide-excerpt {
        font-size: 13px;
        color: var(--gray);
        line-height: 1.68;
        margin: 0;
        flex: 1;
    }

    .guide-read {
        font-size: 12.5px;
        font-weight: 600;
        color: var(--blue);
        margin-top: 4px;
    }

    .guides-all-link {
        margin-top: 20px;
        font-size: 13.5px;
        font-weight: 600;
        color: var(--blue);
        text-decoration: none;
        padding: 9px 22px;
        border-radius: var(--border-radius);
        border: 1px solid rgba(59, 130, 246, 0.28);
        transition: border-color 0.18s, background 0.18s;
    }

    @media (hover: hover) {
        .guides-all-link:hover {
            border-color: var(--blue);
            background: rgba(59, 130, 246, 0.05);
        }
    }

    @media screen and (max-width: 660px) {
        #guides-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
