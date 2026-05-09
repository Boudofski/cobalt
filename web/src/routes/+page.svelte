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
                <a href="/status">Status</a>
                <a href="/about/privacy">Privacy Policy</a>
                <a href="/about/terms">Terms of Use</a>
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

    /* Radial glow behind input */
    #hero-section::before {
        content: "";
        position: absolute;
        width: 700px;
        height: 700px;
        background: radial-gradient(
            ellipse at center,
            rgba(59, 130, 246, 0.10) 0%,
            rgba(99, 102, 241, 0.05) 45%,
            transparent 70%
        );
        pointer-events: none;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -55%);
        z-index: 0;
    }

    #hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 22px;
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
        padding: 5px 16px;
        border-radius: 999px;
        background: var(--button);
        border: 1px solid var(--button-elevated);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1px;
        color: var(--blue);
        text-transform: uppercase;
    }

    #hero-headline {
        font-size: clamp(30px, 5vw, 54px);
        font-weight: 800;
        line-height: 1.12;
        letter-spacing: -2px;
        color: var(--secondary);
        margin: 0;
    }

    .gradient-text {
        background: linear-gradient(135deg, #3B82F6, #6366F1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    #hero-sub {
        font-size: 16.5px;
        color: var(--gray);
        line-height: 1.65;
        max-width: 500px;
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
        gap: 5px;
        font-size: 11.5px;
        font-weight: 500;
        color: var(--gray);
        opacity: 0.8;
        padding: 4px 10px;
        border-radius: 999px;
        border: 1px solid var(--button-stroke);
        background: var(--button);
    }

    .trust-chip::before {
        content: "✓";
        color: var(--blue);
        font-size: 10px;
        font-weight: 700;
    }

    #hero-omnibox {
        width: 100%;
        max-width: 640px;
        /* Subtle glow ring around the input */
        filter: drop-shadow(0 0 24px rgba(59, 130, 246, 0.12));
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
        opacity: 0.8;
    }

    #hero-terms a {
        color: var(--blue);
        text-decoration: underline;
        text-underline-offset: 2px;
        opacity: 1;
    }

    /* ─── Shared section styles ─── */
    .landing-section {
        padding: 80px var(--padding);
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
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: var(--blue);
    }

    .section-title {
        font-size: clamp(22px, 3.5vw, 36px);
        font-weight: 700;
        letter-spacing: -1px;
        color: var(--secondary);
        line-height: 1.2;
        margin: 0;
    }

    /* ─── FEATURES ─── */
    #features-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        width: 100%;
        margin-top: 24px;
    }

    .feature-card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        padding: 24px;
        border-radius: 16px;
        background: var(--button);
        border: 1px solid var(--button-stroke);
        text-align: left;
        transition: border-color 0.2s;
    }

    @media (hover: hover) {
        .feature-card:hover {
            border-color: rgba(59, 130, 246, 0.25);
        }
    }

    .feature-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.12));
        color: var(--blue);
        flex-shrink: 0;
    }

    .feature-icon :global(svg) {
        width: 18px;
        height: 18px;
        stroke-width: 2px;
    }

    .feature-title {
        font-size: 14.5px;
        font-weight: 600;
        color: var(--secondary);
        margin: 0;
    }

    .feature-desc {
        font-size: 13px;
        color: var(--gray);
        line-height: 1.65;
        margin: 0;
        font-weight: 400;
    }

    /* ─── HOW IT WORKS ─── */
    #steps-grid {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        margin-top: 24px;
    }

    .step-card {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 28px 20px;
        border-radius: calc(var(--border-radius) * 1.5);
        background: var(--button);
        border: 1px solid var(--button-stroke);
        text-align: center;
    }

    .step-number {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1px;
        color: var(--blue);
        background: rgba(59, 130, 246, 0.1);
        padding: 4px 10px;
        border-radius: 999px;
    }

    .step-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--secondary);
        margin: 0;
    }

    .step-desc {
        font-size: 13px;
        color: var(--gray);
        line-height: 1.6;
        margin: 0;
        font-weight: 400;
    }

    .step-divider {
        font-size: 22px;
        color: var(--button-elevated);
        flex-shrink: 0;
        font-weight: 300;
    }

    /* ─── PLATFORMS ─── */
    #platforms-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        margin-top: 20px;
    }

    .platform-badge {
        display: inline-flex;
        align-items: center;
        padding: 6px 14px;
        border-radius: 999px;
        background: var(--button);
        border: 1px solid var(--button-stroke);
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary);
        transition: background 0.2s, border-color 0.2s;
    }

    .platform-more {
        color: var(--blue);
        border-color: rgba(59, 130, 246, 0.3);
        background: rgba(59, 130, 246, 0.08);
    }

    .platforms-note {
        font-size: 12px;
        color: var(--gray);
        margin-top: 16px;
        max-width: 520px;
        line-height: 1.6;
        font-weight: 400;
    }

    /* ─── FAQ ─── */
    #faq-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        margin-top: 20px;
        text-align: left;
    }

    .faq-item {
        border-radius: var(--border-radius);
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
        padding: 16px 20px;
        font-size: 14.5px;
        font-weight: 600;
        color: var(--secondary);
        cursor: pointer;
        list-style: none;
        transition: color 0.2s;
    }

    .faq-question::-webkit-details-marker {
        display: none;
    }

    .faq-question:hover {
        color: var(--blue);
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
        padding: 0 20px 16px;
        font-size: 13.5px;
        color: var(--gray);
        line-height: 1.7;
        font-weight: 400;
        border-top: 1px solid var(--button-stroke);
        padding-top: 14px;
    }

    /* ─── FOOTER ─── */
    #snapsave-footer {
        border-top: 1px solid var(--content-border);
        padding: 48px var(--padding);
        display: flex;
        justify-content: center;
    }

    #footer-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        max-width: 640px;
        width: 100%;
        text-align: center;
    }

    #footer-brand {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    #footer-logo {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: -0.5px;
        background: linear-gradient(135deg, #3B82F6, #6366F1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    #footer-tagline {
        font-size: 12.5px;
        color: var(--gray);
        font-weight: 400;
    }

    #footer-nav, #footer-lp-nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px 20px;
    }

    #footer-nav a, #footer-lp-nav a {
        font-size: 13px;
        color: var(--gray);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.15s;
    }

    #footer-nav a:hover, #footer-lp-nav a:hover {
        color: var(--secondary);
    }

    #footer-lp-nav {
        font-size: 12px;
        opacity: 0.7;
    }

    #footer-disclaimer {
        font-size: 12px;
        color: var(--gray);
        line-height: 1.6;
        opacity: 0.7;
        margin: 0;
        font-weight: 400;
    }

    #footer-copy {
        font-size: 11.5px;
        color: var(--gray);
        opacity: 0.5;
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

        /* Glow too wide on mobile — scale down */
        #hero-section::before {
            width: 340px;
            height: 340px;
        }

        #hero-content {
            gap: 16px;
        }

        #hero-headline {
            font-size: 28px;
            letter-spacing: -1.2px;
        }

        #hero-sub {
            font-size: 14.5px;
        }

        #hero-omnibox {
            filter: none; /* drop-shadow is expensive on mobile */
        }

        .landing-section {
            padding: 52px 16px;
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
        #steps-grid {
            gap: 8px;
        }

        .step-divider {
            display: none;
        }

        #steps-grid {
            flex-direction: column;
        }
    }
</style>
