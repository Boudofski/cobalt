<script>
    import { t } from "$lib/i18n/translations";

    import Omnibox from "$components/save/Omnibox.svelte";
    import SupportedServices from "$components/save/SupportedServices.svelte";
    import PlatformIcons from "$components/icons/PlatformIcons.svelte";

    // Hero platform strip — 8 real icons shown inline
    const heroIcons = [
        { key: 'instagram', name: 'Instagram',   bg: 'linear-gradient(135deg,#833AB4,#E1306C,#F77737)' },
        { key: 'tiktok',    name: 'TikTok',      bg: '#010101' },
        { key: 'facebook',  name: 'Facebook',    bg: '#1877F2' },
        { key: 'twitter',   name: 'X / Twitter', bg: '#0f1419' },
        { key: 'pinterest', name: 'Pinterest',   bg: '#E60023' },
        { key: 'reddit',    name: 'Reddit',      bg: '#FF4500' },
        { key: 'snapchat',  name: 'Snapchat',    bg: '#FFBC00' },
        { key: 'vimeo',     name: 'Vimeo',       bg: '#1AB7EA' },
    ];

    // Floating decorative cards around the hero (aria-hidden)
    const floatCards = [
        { key: 'instagram', name: 'Instagram',   bg: 'linear-gradient(135deg,#833AB4,#E1306C,#F77737)', pos: 'top:14%;left:3%', rot: '-4deg' },
        { key: 'tiktok',    name: 'TikTok',      bg: '#010101',   pos: 'top:22%;right:4%',   rot: '3deg'  },
        { key: 'pinterest', name: 'Pinterest',   bg: '#E60023',   pos: 'bottom:36%;left:6%', rot: '5deg'  },
        { key: 'reddit',    name: 'Reddit',      bg: '#FF4500',   pos: 'bottom:24%;right:7%',rot: '-3deg' },
        { key: 'facebook',  name: 'Facebook',    bg: '#1877F2',   pos: 'top:10%;right:14%',  rot: '-6deg' },
        { key: 'twitter',   name: 'X / Twitter', bg: '#0f1419',   pos: 'bottom:46%;right:3%',rot: '4deg'  },
    ];

    // Popular Downloads section — 6 platform cards with real icons
    const popularDownloads = [
        { key: 'instagram', name: 'Instagram Reels',   desc: 'Reels · Stories · Videos', href: '/instagram-reels-downloader',  bg: 'linear-gradient(135deg,#833AB4,#E1306C,#F77737)', accent: '#E1306C' },
        { key: 'tiktok',    name: 'TikTok Videos',     desc: 'Videos · Audio only',      href: '/tiktok-video-downloader',    bg: 'linear-gradient(135deg,#25F4EE,#FE2C55)',         accent: '#FE2C55' },
        { key: 'pinterest', name: 'Pinterest Videos',  desc: 'Videos · Idea Pins',       href: '/pinterest-video-downloader', bg: 'linear-gradient(135deg,#E60023,#ad081b)',         accent: '#E60023' },
        { key: 'facebook',  name: 'Facebook Reels',    desc: 'Reels · Videos',           href: '/facebook-video-downloader',  bg: 'linear-gradient(135deg,#1877F2,#0a52be)',         accent: '#1877F2' },
        { key: 'twitter',   name: 'Twitter/X Videos',  desc: 'Videos · GIFs in HD',      href: '/twitter-video-downloader',   bg: 'linear-gradient(135deg,#1d9bf0,#0f1419)',         accent: '#1d9bf0' },
        { key: 'reddit',    name: 'Reddit Videos',     desc: 'Videos + audio merged',    href: '/reddit-video-downloader',    bg: 'linear-gradient(135deg,#FF4500,#cc3700)',         accent: '#FF4500' },
    ];

    const faqs = [
        { q: "Is SnapSave free to use?",
          a: "Yes, completely free. No subscription, no hidden fees, no credit card required." },
        { q: "Do I need to create an account?",
          a: "No account needed. Just paste your link and download. We believe privacy means not collecting data in the first place." },
        { q: "What video quality can I download?",
          a: "SnapSave fetches the best available quality for your link — up to 4K/8K where the platform supports it. You can also choose to download audio-only." },
        { q: "Why isn't my link downloading?",
          a: "Some content is restricted (private accounts, region-locked, age-gated, or live streams). Make sure the content is publicly accessible and try again." },
        { q: "Is it legal to download videos?",
          a: "Downloading for personal use is generally fine in most regions. Always respect creators' rights and platform terms. Do not re-distribute content without permission." },
        { q: "Which platforms are supported?",
          a: "Instagram, TikTok, Facebook, Twitter/X, Pinterest, Reddit, Snapchat, Vimeo, Twitch, SoundCloud, Dailymotion, and many more. Click 'supported services' in the downloader to see the full list." },
    ];

    const guides = [
        { slug: "how-to-download-pinterest-videos-on-iphone",
          title: "Download Pinterest Videos on iPhone and Android",
          excerpt: "No native save button? Here's the fastest way to save any public Pinterest video to your phone.",
          tag: "Pinterest", tagColor: "#E60023", readTime: "4 min" },
        { slug: "why-your-social-media-video-download-is-not-working",
          title: "Why Your Video Download Is Not Working",
          excerpt: "Private content, expired links, platform blocks — the full troubleshooting guide to fix it fast.",
          tag: "Troubleshooting", tagColor: "#F59E0B", readTime: "6 min" },
        { slug: "how-to-download-tiktok-videos-without-installing-an-app",
          title: "Download TikTok Videos Without Installing an App",
          excerpt: "You don't need to install anything. Paste the link in your browser and download in seconds.",
          tag: "TikTok", tagColor: "#fe2c55", readTime: "4 min" },
    ];
</script>

<svelte:head>
    <title>SnapSave — Download Videos from Instagram, TikTok, Facebook & More</title>
    <meta property="og:title" content="SnapSave — Download Videos from Instagram, TikTok, Facebook & More" />
    <meta name="twitter:title" content="SnapSave — Social Media Video Downloader" />
    <meta name="description" content="Save videos from Instagram, TikTok, Facebook, Twitter, Pinterest, Reddit, Snapchat and more. Free, fast, no sign-up required." />
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is SnapSave free to use?","acceptedAnswer":{"@type":"Answer","text":"Yes, SnapSave is completely free. No subscription, no hidden fees, no credit card required."}},{"@type":"Question","name":"Do I need to create an account?","acceptedAnswer":{"@type":"Answer","text":"No account needed. Just paste your link and download. We believe privacy means not collecting data in the first place."}},{"@type":"Question","name":"What video quality can I download?","acceptedAnswer":{"@type":"Answer","text":"SnapSave fetches the best available quality for your link. You can also choose to download audio-only."}},{"@type":"Question","name":"Why isn't my link downloading?","acceptedAnswer":{"@type":"Answer","text":"Some content is restricted (private accounts, region-locked, age-gated, or live streams). Make sure the content is publicly accessible and try again."}},{"@type":"Question","name":"Is it legal to download videos?","acceptedAnswer":{"@type":"Answer","text":"Downloading for personal use is generally fine in most regions. Always respect creators' rights and platform terms. Do not re-distribute content without permission."}},{"@type":"Question","name":"Which platforms are supported?","acceptedAnswer":{"@type":"Answer","text":"Instagram, TikTok, Facebook, Twitter/X, Pinterest, Reddit, Snapchat, Vimeo, Twitch, SoundCloud, Dailymotion, and many more."}}]}</script>
</svelte:head>

<div id="sp">

<!-- ══════════════════════════════════════════════════════════ HERO -->
<section id="hero">

    <!-- Layered dark background -->
    <div class="hbg" aria-hidden="true">
        <div class="hbg-noise"></div>
        <div class="hbg-glow hbg-g1"></div>
        <div class="hbg-glow hbg-g2"></div>
        <div class="hbg-grid"></div>
    </div>

    <!-- Floating platform cards (decorative depth) -->
    <div class="hfloats" aria-hidden="true">
        {#each floatCards as fc, i}
        <div class="hfc hfc-{i}" style="position:absolute;{fc.pos};transform:rotate({fc.rot})">
            <span class="hfc-icon" style="background:{fc.bg}">
                <PlatformIcons platform={fc.key} size={16} />
            </span>
            <span class="hfc-name">{fc.name}</span>
        </div>
        {/each}
    </div>

    <!-- Content -->
    <div class="hero-body">

        <!-- Brand -->
        <div class="brand-row">
            <div class="brand-icon" aria-hidden="true">
                <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" rx="8" fill="url(#bi-g)"/>
                    <path d="M14 5L11 13H7L14 22L21 13H17L14 5Z" fill="white"/>
                    <defs>
                        <linearGradient id="bi-g" x1="0" y1="0" x2="28" y2="28">
                            <stop stop-color="#3B82F6"/>
                            <stop offset="1" stop-color="#6366F1"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <span class="brand-name">SnapSave</span>
        </div>

        <!-- Headline -->
        <h1 class="hero-h1">
            Download any video<br>
            <span class="h1-glow">from any platform</span>
        </h1>

        <p class="hero-sub">
            Paste a public link below. SnapSave detects the platform,
            fetches the file, and delivers it to your device — in seconds.
        </p>

        <!-- Platform icon strip -->
        <div class="hero-platforms" aria-label="Supported platforms preview">
            {#each heroIcons as p}
            <div class="hp-item" title={p.name}>
                <span class="hp-icon" style="background:{p.bg}">
                    <PlatformIcons platform={p.key} size={18} />
                </span>
                <span class="hp-label">{p.name}</span>
            </div>
            {/each}
            <span class="hp-more">+32 more</span>
        </div>

        <!-- ─── THE DOWNLOADER ─────────────────────────────────── -->
        <div id="downloader-wrap">
            <div class="premium-command-panel">
                <Omnibox />
                <div class="dl-services">
                    <SupportedServices />
                </div>
            </div>
        </div>
        <!-- ──────────────────────────────────────────────────────── -->

        <div class="hero-trust" aria-label="Trust indicators">
            <span class="ht-pill">
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="#22C55E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                No signup
            </span>
            <span class="ht-pill">
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="#22C55E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Private by default
            </span>
            <span class="ht-pill">
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="#22C55E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Works on iPhone Safari
            </span>
        </div>

    </div>

    <div class="hero-terms">
        {$t("save.terms.note.agreement")}
        <a href="/about/terms">{$t("save.terms.note.link")}</a>
    </div>
</section>


<!-- ══════════════════════════════════════════════ POPULAR DOWNLOADS -->
<section class="page-sec" id="popular-sec">
    <div class="sec-in">
        <div class="sec-label">Most downloaded</div>
        <h2 class="sec-h2">Popular downloads</h2>
        <p class="sec-sub">Go directly to a platform's dedicated downloader page.</p>

        <div class="pop-grid">
            {#each popularDownloads as dl}
            <a href={dl.href} class="pop-card" style="--pa:{dl.accent}"
               data-umami-event="homepage-popular-click" data-umami-event-platform={dl.name}>
                <div class="pop-icon-col">
                    <div class="pop-icon" style="background:{dl.bg}">
                        <PlatformIcons platform={dl.key} size={28} />
                    </div>
                </div>
                <div class="pop-text">
                    <span class="pop-name">{dl.name}</span>
                    <span class="pop-desc">{dl.desc}</span>
                </div>
                <svg class="pop-arrow" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.6"
                          stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </a>
            {/each}
        </div>
    </div>
</section>


<!-- ══════════════════════════════════════════════════ HOW IT WORKS -->
<section class="page-sec page-sec-alt" id="how-sec">
    <div class="sec-in">
        <div class="sec-label">Simple by design</div>
        <h2 class="sec-h2">Three steps to done</h2>
        <div class="steps">
            <div class="step-item">
                <div class="step-n">01</div>
                <div class="step-body">
                    <h3>Copy the link</h3>
                    <p>Find any video on any supported platform. Tap Share → Copy Link, or grab the URL from your browser.</p>
                </div>
            </div>
            <div class="step-conn" aria-hidden="true">
                <svg viewBox="0 0 32 24" fill="none">
                    <path d="M2 12h28M21 4l9 8-9 8" stroke="currentColor" stroke-width="1.6"
                          stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="step-item">
                <div class="step-n">02</div>
                <div class="step-body">
                    <h3>Paste into SnapSave</h3>
                    <p>Open SnapSave above and paste your link. The platform is detected automatically — no manual selection needed.</p>
                </div>
            </div>
            <div class="step-conn" aria-hidden="true">
                <svg viewBox="0 0 32 24" fill="none">
                    <path d="M2 12h28M21 4l9 8-9 8" stroke="currentColor" stroke-width="1.6"
                          stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="step-item">
                <div class="step-n">03</div>
                <div class="step-body">
                    <h3>Download instantly</h3>
                    <p>Hit the download button. Your file saves to your device at the best available quality in seconds.</p>
                </div>
            </div>
        </div>
    </div>
</section>


<!-- ══════════════════════════════════════════════════════════ FAQ -->
<section class="page-sec" id="faq-sec">
    <div class="sec-in sec-in-narrow">
        <div class="sec-label">Questions</div>
        <h2 class="sec-h2">Frequently asked</h2>
        <div class="faq-list">
            {#each faqs as faq}
            <details class="faq-item">
                <summary class="faq-q">
                    <span>{faq.q}</span>
                    <span class="faq-chev" aria-hidden="true">+</span>
                </summary>
                <p class="faq-a">{faq.a}</p>
            </details>
            {/each}
        </div>
    </div>
</section>


<!-- ══════════════════════════════════════════════ LATEST GUIDES -->
<section class="page-sec page-sec-alt" id="guides-sec">
    <div class="sec-in">
        <div class="guides-hdr">
            <div>
                <div class="sec-label">From the blog</div>
                <h2 class="sec-h2">Latest guides</h2>
            </div>
            <a href="/blog" class="view-all-btn" data-umami-event="homepage-blog-all-click">
                View all guides →
            </a>
        </div>

        <div class="guides-grid">
            {#each guides as g}
            <a href="/blog/{g.slug}" class="gcard"
               data-umami-event="homepage-guide-click" data-umami-event-slug={g.slug}>
                <div class="gcard-bar" style="background:{g.tagColor}"></div>
                <div class="gcard-body">
                    <div class="gcard-meta">
                        <span class="gcard-tag" style="color:{g.tagColor}">{g.tag}</span>
                        <span class="gcard-time">{g.readTime} read</span>
                    </div>
                    <h3 class="gcard-title">{g.title}</h3>
                    <p class="gcard-exc">{g.excerpt}</p>
                    <span class="gcard-cta">Read guide →</span>
                </div>
            </a>
            {/each}
        </div>
    </div>
</section>


<!-- ══════════════════════════════════════════════════════ FOOTER -->
<footer id="sp-footer">
    <div class="footer-grid">
        <div class="footer-brand">
            <div class="fb-logo">
                <div class="fb-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                        <rect width="20" height="20" rx="6" fill="url(#fb-g)"/>
                        <path d="M10 3.5L8 9.5H4.5L10 18L15.5 9.5H12L10 3.5Z" fill="white"/>
                        <defs><linearGradient id="fb-g" x1="0" y1="0" x2="20" y2="20">
                            <stop stop-color="#3B82F6"/>
                            <stop offset="1" stop-color="#6366F1"/>
                        </linearGradient></defs>
                    </svg>
                </div>
                <span class="fb-wordmark">SnapSave</span>
            </div>
            <p class="fb-tagline">Download what you love.<br>Free, fast, and private.</p>
            <p class="fb-disclaimer">Not affiliated with Instagram, TikTok, Meta, X Corp, Pinterest, Reddit, or Snapchat. Only download public content you own or have permission to save.</p>
            <p class="fb-copy">© {new Date().getFullYear()} SnapSave. All rights reserved.</p>
        </div>

        <div class="footer-col">
            <h4 class="fc-heading">Downloaders</h4>
            <nav class="fc-links" aria-label="Downloader pages">
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
            <h4 class="fc-heading">Product</h4>
            <nav class="fc-links" aria-label="Product pages">
                <a href="/">Home</a>
                <a href="/blog">Blog</a>
                <a href="/rss.xml" type="application/rss+xml">RSS</a>
                <a href="/status">Status</a>
                <a href="/about">About</a>
            </nav>
        </div>

        <div class="footer-col">
            <h4 class="fc-heading">Legal</h4>
            <nav class="fc-links" aria-label="Legal pages">
                <a href="/about/privacy">Privacy Policy</a>
                <a href="/about/terms">Terms of Use</a>
                <a href="/about/dmca">DMCA</a>
                <a href="/about/contact">Contact</a>
            </nav>
        </div>
    </div>
</footer>

</div><!-- #sp -->

<style>
/* ════════════════════════════════════════════ ROOT */
#sp {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    --hero-dark: #030307;
    --surface: rgba(255,255,255,0.02);
    --surface-hover: rgba(255,255,255,0.05);
    --border: rgba(255,255,255,0.06);
    --border-bright: rgba(255,255,255,0.12);
    --text: #F8FAFC;
    --muted: #94A3B8;
    --blue: #38BDF8;
    --green: #34D399;
}

/* ════════════════════════════════════════════ HERO */
#hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 80px var(--padding) 36px;
    background: var(--hero-dark);
    color: var(--text);
    overflow: hidden;

    /* Force dark CSS vars so Omnibox + SupportedServices look correct */
    --primary:                 var(--hero-dark);
    --secondary:               #F8FAFC;
    --gray:                    #94A3B8;
    --button:                  rgba(255,255,255,0.03);
    --button-hover:            rgba(255,255,255,0.07);
    --button-press:            rgba(255,255,255,0.11);
    --button-text:             #F8FAFC;
    --button-stroke:           rgba(255,255,255,0.06);
    --button-box-shadow:       0 0 0 1px rgba(255,255,255,0.06) inset;
    --button-elevated:         rgba(255,255,255,0.05);
    --button-elevated-hover:   rgba(255,255,255,0.09);
    --button-elevated-press:   rgba(255,255,255,0.14);
    --button-elevated-shimmer: rgba(255,255,255,0.08);
    --button-hover-transparent:rgba(255,255,255,0.04);
    --button-press-transparent:rgba(255,255,255,0.08);
    --button-active-hover:     #F8FAFC;
    --input-border:            rgba(255,255,255,0.12);
    --sidebar-highlight:       #38BDF8;
    --popup-bg:                #09090E;
    --popup-stroke:            rgba(255,255,255,0.06);
    --content-border:          rgba(255,255,255,0.04);
    --border-radius:           16px;
}

:global([data-theme="light"]) #hero {
    background: #F8FAFC;
    color: #0F172A;
    --primary:                 #F8FAFC;
    --secondary:               #0F172A;
    --gray:                    #64748B;
    --button:                  rgba(15, 23, 42, 0.04);
    --button-hover:            rgba(15, 23, 42, 0.07);
    --button-press:            rgba(15, 23, 42, 0.12);
    --button-text:             #0F172A;
    --button-stroke:           rgba(15, 23, 42, 0.06);
    --button-box-shadow:       0 0 0 1px rgba(15, 23, 42, 0.06) inset;
    --button-elevated:         rgba(15, 23, 42, 0.06);
    --button-elevated-hover:   rgba(15, 23, 42, 0.09);
    --button-elevated-press:   rgba(15, 23, 42, 0.14);
    --button-elevated-shimmer: rgba(15, 23, 42, 0.05);
    --button-hover-transparent:rgba(15, 23, 42, 0.04);
    --button-press-transparent:rgba(15, 23, 42, 0.08);
    --button-active-hover:     #0F172A;
    --input-border:            rgba(15, 23, 42, 0.15);
    --sidebar-highlight:       #0284C7;
    --popup-bg:                #FFFFFF;
    --popup-stroke:            rgba(15, 23, 42, 0.08);
    --content-border:          rgba(15, 23, 42, 0.04);
}

/* Background layers */
.hbg {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

/* Subtle CSS noise texture using repeating gradients */
.hbg-noise {
    position: absolute;
    inset: 0;
    background-image:
        url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.35;
}

/* Grid lines */
.hbg-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(ellipse 90% 80% at 50% 30%, rgba(0,0,0,0.5) 0%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 30%, rgba(0,0,0,0.5) 0%, transparent 100%);
}

.hbg-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
}

.hbg-g1 {
    width: 800px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, transparent 65%);
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
}

.hbg-g2 {
    width: 500px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 65%);
    bottom: 0;
    right: 8%;
}

/* Floating platform cards */
.hfloats {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.hfc {
    position: absolute;
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 9px 14px;
    border-radius: 12px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    color: rgba(255,255,255,0.65);
    font-size: 12.5px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0.55;
}

.hfc-icon {
    width: 26px;
    height: 26px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

/* Main hero content */
.hero-body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;
    width: 100%;
    max-width: 720px;
    text-align: center;
    flex: 1;
    justify-content: center;
}

/* Brand mark */
.brand-row {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 18px 8px 10px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
}

.brand-icon {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
}

.brand-icon svg { display: block; width: 28px; height: 28px; }

.brand-name {
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.3px;
    color: rgba(255,255,255,0.85);
}

:global([data-theme="light"]) .brand-name {
    color: rgba(15, 23, 42, 0.85);
}

/* Headline */
.hero-h1 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(38px, 6vw, 68px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -3px;
    color: #F8FAFC;
    margin: 0;
    font-feature-settings: "cv02","cv03","cv04","cv11";
}

:global([data-theme="light"]) .hero-h1 {
    color: #0F172A;
}

.h1-glow {
    background: linear-gradient(120deg, #38BDF8 0%, #818CF8 55%, #C084FC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-sub {
    font-size: 17px;
    color: rgba(255,255,255,0.5);
    line-height: 1.65;
    margin: 0;
    max-width: 520px;
    font-weight: 400;
}

:global([data-theme="light"]) .hero-sub {
    color: rgba(15, 23, 42, 0.6);
}

/* Platform icon strip */
.hero-platforms {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: -4px;
}

.hp-item {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 12px 5px 5px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.09);
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.6);
    transition: background 0.15s, border-color 0.15s;
}

@media (hover: hover) {
    .hp-item:hover {
        background: rgba(255,255,255,0.1);
        border-color: rgba(255,255,255,0.15);
    }
}

.hp-icon {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.hp-label { white-space: nowrap; }

.hp-more {
    font-size: 11.5px;
    color: rgba(255,255,255,0.3);
    font-weight: 500;
    padding: 0 6px;
}

/* ─── Downloader panel ─────────────────────────────────────── */
#downloader-wrap {
    width: 100%;
    max-width: 660px;
}

.premium-command-panel {
    background: rgba(10, 10, 16, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 24px;
    box-shadow:
        0 24px 64px rgba(0, 0, 0, 0.6),
        0 0 80px rgba(56, 189, 248, 0.08);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

:global([data-theme="light"]) .premium-command-panel {
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow:
        0 24px 64px rgba(15, 23, 42, 0.08),
        0 0 80px rgba(2, 132, 199, 0.04);
}

.dl-services {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

/* ─── Trust pills ─────────────────────────────────────────── */
#hero-trust, .hero-trust {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: -4px;
}

.ht-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.45);
    padding: 5px 12px 5px 8px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
}

.ht-pill svg { width: 16px; height: 16px; flex-shrink: 0; }

/* Terms */
.hero-terms {
    position: relative;
    z-index: 1;
    margin-top: 16px;
    font-size: 11.5px;
    color: rgba(255,255,255,0.22);
    text-align: center;
}

.hero-terms a { color: rgba(59,130,246,0.75); text-decoration: underline; }

/* ════════════════════════════════════════ SHARED SECTION STYLES */
.page-sec {
    padding: 96px var(--padding);
    display: flex;
    justify-content: center;
    border-top: 1px solid var(--content-border);
}

#popular-sec {
    background: #06060c;
}
:global([data-theme="light"]) #popular-sec {
    background: #ffffff;
}

#how-sec {
    background: #030307;
}
:global([data-theme="light"]) #how-sec {
    background: #f8fafc;
}

#faq-sec {
    background: #06060c;
}
:global([data-theme="light"]) #faq-sec {
    background: #ffffff;
}

#guides-sec {
    background: #030307;
}
:global([data-theme="light"]) #guides-sec {
    background: #f8fafc;
}

.sec-in {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    max-width: 920px;
    text-align: center;
}

.sec-in-narrow { max-width: 680px; }

.sec-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--blue);
    opacity: 0.85;
}

.sec-h2 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 800;
    letter-spacing: -2px;
    color: var(--secondary);
    line-height: 1.1;
    margin: 0;
    font-feature-settings: "cv02","cv03","cv04","cv11";
}

.sec-sub {
    font-size: 15px;
    color: var(--gray);
    margin: 0;
    line-height: 1.65;
}

/* ════════════════════════════════════ POPULAR DOWNLOADS SECTION */
.pop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    width: 100%;
    margin-top: 24px;
}

.pop-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    text-decoration: none;
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s, background-color 0.25s;
    position: relative;
    overflow: hidden;
}

:global([data-theme="light"]) .pop-card {
    background: rgba(15, 23, 42, 0.02);
    border: 1px solid rgba(15, 23, 42, 0.06);
}

@media (hover: hover) {
    .pop-card:hover {
        border-color: color-mix(in srgb, var(--pa) 50%, transparent);
        box-shadow: 
            0 12px 30px rgba(0, 0, 0, 0.3),
            0 0 20px color-mix(in srgb, var(--pa) 12%, transparent);
        transform: translateY(-3px);
        background: rgba(255, 255, 255, 0.04);
    }
    
    :global([data-theme="light"]) .pop-card:hover {
        border-color: color-mix(in srgb, var(--pa) 50%, transparent);
        box-shadow: 
            0 12px 30px rgba(15, 23, 42, 0.04),
            0 0 20px color-mix(in srgb, var(--pa) 8%, transparent);
        background: rgba(15, 23, 42, 0.04);
    }
}

.pop-icon-col { flex-shrink: 0; }

.pop-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}

.pop-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    text-align: left;
    min-width: 0;
}

.pop-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--secondary);
    letter-spacing: -0.2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.pop-desc {
    font-size: 12px;
    color: var(--gray);
    line-height: 1.4;
}

.pop-arrow {
    width: 20px;
    height: 20px;
    color: var(--gray);
    flex-shrink: 0;
    transition: color 0.15s, transform 0.15s;
}

@media (hover: hover) {
    .pop-card:hover .pop-arrow {
        color: var(--pa);
        transform: translateX(3px);
    }
}

/* ════════════════════════════════════════ HOW IT WORKS SECTION */
.steps {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-top: 40px;
    gap: 0;
}

.step-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    text-align: left;
    padding-right: 24px;
}

.step-n {
    font-size: 54px;
    font-weight: 900;
    letter-spacing: -3px;
    line-height: 1;
    background: linear-gradient(130deg, var(--blue) 0%, color-mix(in srgb, var(--blue) 30%, transparent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-feature-settings: "tnum";
}

.step-body h3 {
    font-size: 16px;
    font-weight: 700;
    color: var(--secondary);
    margin: 0 0 8px;
    letter-spacing: -0.2px;
}

.step-body p {
    font-size: 13.5px;
    color: var(--gray);
    line-height: 1.65;
    margin: 0;
}

.step-conn {
    flex-shrink: 0;
    width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    color: var(--button-elevated);
    padding-bottom: 20px;
}

.step-conn svg { width: 32px; height: 24px; }

/* ════════════════════════════════════════════════ FAQ SECTION */
.faq-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    margin-top: 24px;
    text-align: left;
}

.faq-item {
    border-radius: 14px;
    background: var(--primary);
    border: 1px solid var(--button-stroke);
    overflow: hidden;
    transition: border-color 0.2s;
}

[data-theme="dark"] .faq-item,
.page-sec-alt .faq-item { background: var(--popup-bg, #111827); }

.faq-item[open] { border-color: rgba(59,130,246,0.4); }

.faq-q {
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
    transition: color 0.15s;
}

.faq-q::-webkit-details-marker { display: none; }
@media (hover: hover) { .faq-q:hover { color: var(--blue); } }

.faq-chev {
    font-size: 20px;
    font-weight: 300;
    color: var(--gray);
    flex-shrink: 0;
    transition: transform 0.2s;
    line-height: 1;
}

.faq-item[open] .faq-chev { transform: rotate(45deg); color: var(--blue); }

.faq-a {
    padding: 12px 20px 18px;
    font-size: 13.5px;
    color: var(--gray);
    line-height: 1.75;
    margin: 0;
    border-top: 1px solid var(--button-stroke);
}

/* ════════════════════════════════════════════ GUIDES SECTION */
.guides-hdr {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
}

.guides-hdr > div {
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
    flex-shrink: 0;
    align-self: center;
    transition: border-color 0.15s, background 0.15s;
}

@media (hover: hover) {
    .view-all-btn:hover { border-color: var(--blue); background: rgba(59,130,246,0.05); }
}

.guides-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    width: 100%;
    margin-top: 8px;
}

.gcard {
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
    .gcard:hover {
        border-color: rgba(59,130,246,0.35);
        box-shadow: 0 10px 32px rgba(59,130,246,0.08);
        transform: translateY(-3px);
    }
}

.gcard-bar { height: 3px; width: 100%; flex-shrink: 0; }

.gcard-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 18px 20px 20px;
    flex: 1;
    text-align: left;
}

.gcard-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.gcard-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.gcard-time { font-size: 11.5px; color: var(--gray); }

.gcard-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--secondary);
    margin: 0;
    line-height: 1.42;
    letter-spacing: -0.2px;
}

.gcard-exc {
    font-size: 13px;
    color: var(--gray);
    line-height: 1.68;
    margin: 0;
    flex: 1;
}

.gcard-cta { font-size: 12.5px; font-weight: 600; color: var(--blue); margin-top: 4px; }

/* ════════════════════════════════════════════════════ FOOTER */
#sp-footer {
    border-top: 1px solid var(--content-border);
    padding: 64px var(--padding) 52px;
}

.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 32px 48px;
    max-width: 960px;
    margin: 0 auto;
}

.footer-brand { display: flex; flex-direction: column; gap: 14px; }

.fb-logo {
    display: inline-flex;
    align-items: center;
    gap: 9px;
}

.fb-icon { width: 20px; height: 20px; }
.fb-icon svg { display: block; width: 20px; height: 20px; }

.fb-wordmark {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.4px;
    background: linear-gradient(130deg, #3B82F6 20%, #818CF8 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.fb-tagline { font-size: 13.5px; color: var(--gray); line-height: 1.7; margin: 0; }

.fb-disclaimer {
    font-size: 11.5px;
    color: var(--gray);
    line-height: 1.65;
    margin: 0;
    opacity: 0.55;
    max-width: 300px;
}

.fb-copy { font-size: 11.5px; color: var(--gray); opacity: 0.4; margin: 0; }

.footer-col { display: flex; flex-direction: column; gap: 18px; }

.fc-heading {
    font-size: 11px;
    font-weight: 700;
    color: var(--secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.5;
    margin: 0;
}

.fc-links { display: flex; flex-direction: column; gap: 11px; }
.fc-links a { font-size: 13.5px; color: var(--gray); text-decoration: none; transition: color 0.15s; }
@media (hover: hover) { .fc-links a:hover { color: var(--secondary); } }

/* ════════════════════════════════════════════════ RESPONSIVE */

/* 900px — footer 2 cols */
@media screen and (max-width: 900px) {
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
}

/* 768px — steps vertical, pop grid 2-col */
@media screen and (max-width: 768px) {
    .pop-grid { grid-template-columns: repeat(2, 1fr); }

    .steps { flex-direction: column; gap: 32px; }
    .step-conn { display: none; }
    .step-item { padding-right: 0; }
}

/* 660px — guides + pop single col */
@media screen and (max-width: 660px) {
    .guides-grid { grid-template-columns: 1fr; }
    .pop-grid { grid-template-columns: 1fr; }
    .guides-hdr { flex-direction: column; align-items: flex-start; gap: 12px; }
}

/* 535px — full mobile layout */
@media screen and (max-width: 535px) {
    #hero {
        min-height: calc(100svh - var(--sidebar-height-mobile) - var(--sidebar-inner-padding) * 2);
        padding: 40px 16px 24px;
    }

    .hfloats { display: none; }

    .hero-body { gap: 18px; }

    .hero-h1 { font-size: 32px; letter-spacing: -1.8px; }
    .hero-sub { font-size: 14.5px; }

    .hero-platforms { gap: 7px; }
    .hp-item { padding: 4px 10px 4px 4px; font-size: 11.5px; }
    .hp-icon { width: 22px; height: 22px; border-radius: 5px; }
    .hp-more { display: none; }

    .dl-panel { border-radius: 16px; }
    .dl-chrome { padding: 9px 12px; border-radius: 16px 16px 0 0; }
    .dlc-r,.dlc-y,.dlc-g { width: 9px; height: 9px; }
    .dlc-label { font-size: 10.5px; }
    .dl-body { padding: 12px 12px 10px; }

    .ht-pill { font-size: 11.5px; padding: 5px 10px 5px 7px; }

    .page-sec { padding: 60px 16px; }

    .footer-grid { grid-template-columns: 1fr; gap: 28px; }
    .fb-disclaimer { max-width: none; }
}
</style>
