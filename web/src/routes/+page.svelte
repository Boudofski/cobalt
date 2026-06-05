<script>
    import { t } from "$lib/i18n/translations";

    import HomeNav from "$components/misc/HomeNav.svelte";
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

<HomeNav />

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

            <!-- Decorative floating result card -->
            <div class="dec-result-card" aria-hidden="true">
                <div class="drc-icon">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21H19.44a2 2 0 001.94-1.515L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="drc-text">
                    <span class="drc-status">Ready: instagram-reel.mp4</span>
                    <span class="drc-meta">Best quality · 12.4 MB</span>
                </div>
                <div class="drc-btn">Download</div>
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
                        <PlatformIcons platform={dl.key} size={32} />
                    </div>
                </div>
                <div class="pop-text">
                    <span class="pop-name">{dl.name}</span>
                    <span class="pop-desc">{dl.desc}</span>
                </div>
                <div class="pop-cta">
                    <svg class="pop-arrow" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
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
                <div class="step-icon-wrap">
                    <div class="step-icon">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L17.431 4.22a2 2 0 00-1.43-.598H10a2 2 0 00-2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <div class="step-n">01</div>
                </div>
                <div class="step-body">
                    <h3>Copy the link</h3>
                    <p>Find any video on any supported platform. Tap Share → Copy Link, or grab the URL from your browser.</p>
                </div>
            </div>
            <div class="step-item">
                <div class="step-icon-wrap">
                    <div class="step-icon">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <div class="step-n">02</div>
                </div>
                <div class="step-body">
                    <h3>Paste into SnapSave</h3>
                    <p>Open SnapSave above and paste your link. The platform is detected automatically — no manual selection needed.</p>
                </div>
            </div>
            <div class="step-item">
                <div class="step-icon-wrap">
                    <div class="step-icon">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <div class="step-n">03</div>
                </div>
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
                <div class="gcard-body">
                    <span class="gcard-tag">{g.tag}</span>
                    <h3 class="gcard-title">{g.title}</h3>
                    <p class="gcard-exc">{g.excerpt}</p>
                    <span class="gcard-cta">
                        Read guide
                        <svg viewBox="0 0 16 16" fill="none" style="width:14px;height:14px;"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
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
    padding: 100px var(--padding) 36px;
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
    --gray:                    #475569; /* Darker slate-gray for better light mode contrast */
    --button:                  rgba(15, 23, 42, 0.05);
    --button-hover:            rgba(15, 23, 42, 0.09);
    --button-press:            rgba(15, 23, 42, 0.14);
    --button-text:             #0F172A;
    --button-stroke:           rgba(15, 23, 42, 0.10);
    --button-box-shadow:       0 0 0 1px rgba(15, 23, 42, 0.10) inset;
    --button-elevated:         rgba(15, 23, 42, 0.08);
    --button-elevated-hover:   rgba(15, 23, 42, 0.12);
    --button-elevated-press:   rgba(15, 23, 42, 0.16);
    --button-elevated-shimmer: rgba(15, 23, 42, 0.06);
    --button-hover-transparent:rgba(15, 23, 42, 0.05);
    --button-press-transparent:rgba(15, 23, 42, 0.10);
    --button-active-hover:     #0F172A;
    --input-border:            rgba(15, 23, 42, 0.20);
    --sidebar-highlight:       #0284C7;
    --popup-bg:                #FFFFFF;
    --popup-stroke:            rgba(15, 23, 42, 0.10);
    --content-border:          rgba(15, 23, 42, 0.08);
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

:global([data-theme="light"]) .hfc {
    background: rgba(15, 23, 42, 0.05);
    border-color: rgba(15, 23, 42, 0.08);
    color: rgba(15, 23, 42, 0.7);
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
    gap: 28px;
    width: 100%;
    max-width: 840px;
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

:global([data-theme="light"]) .brand-row {
    background: rgba(15, 23, 42, 0.05);
    border-color: rgba(15, 23, 42, 0.08);
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
    font-size: clamp(42px, 7vw, 76px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -3.5px;
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
    font-size: 18px;
    color: rgba(255,255,255,0.5);
    line-height: 1.6;
    margin: 0;
    max-width: 540px;
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
    gap: 12px;
    margin-top: -4px;
}

.hp-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px 6px 6px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.6);
    transition: all 0.2s;
}

:global([data-theme="light"]) .hp-item {
    background: rgba(15, 23, 42, 0.04);
    border-color: rgba(15, 23, 42, 0.08);
    color: rgba(15, 23, 42, 0.7);
}

@media (hover: hover) {
    .hp-item:hover {
        background: rgba(255,255,255,0.12);
        border-color: rgba(255,255,255,0.2);
        transform: translateY(-1px);
    }
}

.hp-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.hp-more {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    font-weight: 600;
    padding: 0 8px;
}

:global([data-theme="light"]) .hp-more {
    color: rgba(15, 23, 42, 0.5);
}

/* ─── Downloader panel ─────────────────────────────────────── */
#downloader-wrap {
    width: 100%;
    max-width: 720px;
    position: relative;
    margin-top: 12px;
}

.premium-command-panel {
    background: rgba(10, 10, 16, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 28px;
    padding: 32px;
    box-shadow:
        0 32px 80px rgba(0, 0, 0, 0.7),
        0 0 100px rgba(56, 189, 248, 0.1);
    backdrop-filter: blur(32px) saturate(180%);
    -webkit-backdrop-filter: blur(32px) saturate(180%);
    transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
}

.premium-command-panel:focus-within {
    transform: scale(1.01);
}

:global([data-theme="light"]) .premium-command-panel {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(15, 23, 42, 0.1);
    box-shadow:
        0 32px 80px rgba(15, 23, 42, 0.1),
        0 0 100px rgba(2, 132, 199, 0.05);
}

.dl-services {
    margin-top: 14px;
    display: flex;
    justify-content: center;
}

/* Decorative result card */
.dec-result-card {
    position: absolute;
    bottom: -40px;
    right: -60px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    z-index: 2;
    pointer-events: none;
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0) rotate(2deg); }
    50% { transform: translateY(-10px) rotate(3deg); }
}

.drc-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: var(--blue);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.drc-icon svg { width: 20px; height: 20px; }

.drc-text {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.drc-status { font-size: 13px; font-weight: 700; color: white; }
.drc-meta { font-size: 11px; color: rgba(255,255,255,0.6); }

.drc-btn {
    padding: 6px 14px;
    border-radius: 8px;
    background: white;
    color: black;
    font-size: 12px;
    font-weight: 700;
}

:global([data-theme="light"]) .dec-result-card {
    background: rgba(15, 23, 42, 0.95);
    border-color: rgba(15, 23, 42, 0.15);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
}
:global([data-theme="light"]) .drc-status {
    color: #FFFFFF;
}
:global([data-theme="light"]) .drc-meta {
    color: rgba(255, 255, 255, 0.7);
}
:global([data-theme="light"]) .drc-btn {
    background: #FFFFFF;
    color: #0F172A;
}

/* ─── Trust pills ─────────────────────────────────────────── */
.hero-trust {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 24px;
}

.ht-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    padding: 6px 14px 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
}

:global([data-theme="light"]) .ht-pill {
    color: rgba(15, 23, 42, 0.7);
    border-color: rgba(15, 23, 42, 0.08);
    background: rgba(15, 23, 42, 0.03);
}

.ht-pill svg { width: 18px; height: 18px; flex-shrink: 0; }

/* Terms */
.hero-terms {
    position: relative;
    z-index: 1;
    margin-top: 24px;
    font-size: 12px;
    color: rgba(255,255,255,0.25);
    text-align: center;
}

.hero-terms a { color: var(--blue); text-decoration: underline; }

/* ════════════════════════════════════════ SHARED SECTION STYLES */
.page-sec {
    padding: 120px var(--padding);
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
    max-width: 960px;
    text-align: center;
}

.sec-in-narrow { max-width: 720px; }

.sec-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--blue);
}

.sec-h2 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 800;
    letter-spacing: -2px;
    color: var(--secondary);
    line-height: 1;
    margin: 0;
    font-feature-settings: "cv02","cv03","cv04","cv11";
}

.sec-sub {
    font-size: 17px;
    color: var(--gray);
    margin: 0;
    line-height: 1.6;
    max-width: 600px;
}

/* ════════════════════════════════════ POPULAR DOWNLOADS SECTION */
.pop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    width: 100%;
    margin-top: 40px;
}

.pop-card {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 24px;
    border-radius: 24px;
    background: #0F0F16;
    border: 1px solid rgba(255, 255, 255, 0.08);
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
    position: relative;
    overflow: hidden;
}

:global([data-theme="light"]) .pop-card {
    background: #FFFFFF;
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}

@media (hover: hover) {
    .pop-card:hover {
        border-color: var(--pa);
        box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 20px color-mix(in srgb, var(--pa) 15%, transparent);
        transform: translateY(-5px);
        background: #14141d;
    }
    
    :global([data-theme="light"]) .pop-card:hover {
        box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.06),
            0 0 20px color-mix(in srgb, var(--pa) 10%, transparent);
        background: #FFFFFF;
    }
}

.pop-icon-col { flex-shrink: 0; }

.pop-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

.pop-text {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    text-align: left;
    min-width: 0;
}

.pop-name {
    font-size: 16px;
    font-weight: 700;
    color: var(--secondary);
    letter-spacing: -0.3px;
}

.pop-desc {
    font-size: 13px;
    color: var(--gray);
    line-height: 1.4;
}

.pop-cta {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
}

.pop-arrow {
    width: 18px;
    height: 18px;
    color: var(--gray);
}

@media (hover: hover) {
    .pop-card:hover .pop-cta {
        background: var(--pa);
        color: white;
    }
    .pop-card:hover .pop-arrow {
        color: white;
        transform: translateX(2px);
    }
}

/* ════════════════════════════════════════ HOW IT WORKS SECTION */
.steps {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-top: 60px;
    gap: 24px;
}

.step-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: left;
    padding: 32px;
    border-radius: 28px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
}

:global([data-theme="light"]) .step-item {
    background: #0F0F16;
    border: 1px solid rgba(255, 255, 255, 0.08);
}
:global([data-theme="light"]) .step-body h3 {
    color: #F8FAFC !important;
}
:global([data-theme="light"]) .step-body p {
    color: #94A3B8 !important;
}
:global([data-theme="light"]) .step-n {
    color: #F8FAFC !important;
    opacity: 0.15;
}

.step-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.step-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: rgba(56, 189, 248, 0.1);
    color: var(--blue);
    display: flex;
    align-items: center;
    justify-content: center;
}

.step-icon svg { width: 24px; height: 24px; }

.step-n {
    font-size: 40px;
    font-weight: 900;
    letter-spacing: -2px;
    opacity: 0.1;
    color: var(--secondary);
}

.step-body h3 {
    font-size: 18px;
    font-weight: 700;
    color: var(--secondary);
    margin: 0 0 10px;
    letter-spacing: -0.3px;
}

.step-body p {
    font-size: 15px;
    color: var(--gray);
    line-height: 1.6;
    margin: 0;
}

/* ════════════════════════════════════════════════ FAQ SECTION */
.faq-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin-top: 40px;
    text-align: left;
}

.faq-item {
    border-radius: 18px;
    background: #0F0F16;
    border: 1px solid rgba(255,255,255,0.08);
    overflow: hidden;
    transition: border-color 0.3s;
}

.faq-item[open] { border-color: var(--blue); }

:global([data-theme="light"]) .faq-item {
    background: #0F0F16;
    border-color: rgba(255, 255, 255, 0.08);
}
:global([data-theme="light"]) .faq-item .faq-q {
    color: #F8FAFC !important;
}
:global([data-theme="light"]) .faq-item .faq-a {
    color: #94A3B8 !important;
}
:global([data-theme="light"]) .faq-item .faq-chev {
    color: #94A3B8 !important;
    background: rgba(255, 255, 255, 0.05);
}

.faq-q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    font-size: 16px;
    font-weight: 600;
    color: var(--secondary);
    cursor: pointer;
    list-style: none;
}

.faq-q::-webkit-details-marker { display: none; }

.faq-chev {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--gray);
    transition: all 0.3s;
}

.faq-item[open] .faq-chev { transform: rotate(45deg); background: var(--blue); color: white; }

.faq-a {
    padding: 0 24px 24px;
    font-size: 15px;
    color: var(--gray);
    line-height: 1.7;
    margin: 0;
}

/* ════════════════════════════════════════════ GUIDES SECTION */
.guides-hdr {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
}

.view-all-btn {
    display: inline-flex;
    padding: 12px 24px;
    border-radius: 14px;
    background: rgba(56, 189, 248, 0.08);
    border: 1px solid rgba(56, 189, 248, 0.2);
    font-size: 14px;
    font-weight: 600;
    color: var(--blue);
    text-decoration: none;
    transition: all 0.2s;
}

@media (hover: hover) {
    .view-all-btn:hover { background: var(--blue); color: white; border-color: var(--blue); }
}

.guides-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    margin-top: 40px;
}

.gcard {
    display: flex;
    flex-direction: column;
    border-radius: 28px;
    background: #0F0F16;
    border: 1px solid rgba(255,255,255,0.08);
    text-decoration: none;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
}

:global([data-theme="light"]) .gcard {
    background: #0F0F16;
    border-color: rgba(255, 255, 255, 0.08);
}
:global([data-theme="light"]) .gcard-title {
    color: #F8FAFC !important;
}
:global([data-theme="light"]) .gcard-exc {
    color: #94A3B8 !important;
}
:global([data-theme="light"]) .gcard-tag {
    color: #38BDF8 !important;
    background: rgba(56, 189, 248, 0.1);
}
:global([data-theme="light"]) .gcard-cta {
    color: #38BDF8 !important;
}

@media (hover: hover) {
    .gcard:hover {
        border-color: var(--blue);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        transform: translateY(-5px);
    }
}

.gcard-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 32px;
    flex: 1;
    text-align: left;
}

.gcard-tag {
    display: inline-flex;
    padding: 4px 10px;
    border-radius: 6px;
    background: rgba(255,255,255,0.05);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    width: fit-content;
}

.gcard-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--secondary);
    margin: 0;
    line-height: 1.3;
}

.gcard-exc {
    font-size: 14px;
    color: var(--gray);
    line-height: 1.6;
    margin: 0;
    flex: 1;
}

.gcard-cta {
    font-size: 14px;
    font-weight: 600;
    color: var(--blue);
    display: flex;
    align-items: center;
    gap: 6px;
}

/* ════════════════════════════════════════════════════ FOOTER */
#sp-footer {
    border-top: 1px solid var(--content-border);
    padding: 80px var(--padding) 60px;
    background: #030307;
}

.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 48px;
    max-width: 1100px;
    margin: 0 auto;
}

.footer-brand { display: flex; flex-direction: column; gap: 20px; }

.fb-logo {
    display: inline-flex;
    align-items: center;
    gap: 12px;
}

.fb-wordmark {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: white;
}

.fb-tagline { font-size: 15px; color: var(--gray); line-height: 1.6; margin: 0; }

.fb-disclaimer {
    font-size: 12px;
    color: var(--gray);
    line-height: 1.6;
    margin: 0;
    opacity: 0.4;
    max-width: 320px;
}

.fb-copy { font-size: 12px; color: var(--gray); opacity: 0.3; margin: 0; }

.footer-col { display: flex; flex-direction: column; gap: 24px; }

.fc-heading {
    font-size: 12px;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 0;
}

.fc-links { display: flex; flex-direction: column; gap: 14px; }
.fc-links a { font-size: 14px; color: var(--gray); text-decoration: none; transition: color 0.2s; }
@media (hover: hover) { .fc-links a:hover { color: white; } }

/* ════════════════════════════════════════════════ RESPONSIVE */

@media screen and (max-width: 1024px) {
    .dec-result-card { display: none; }
}

@media screen and (max-width: 900px) {
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
}

@media screen and (max-width: 768px) {
    .hfloats { display: none !important; }
    .page-sec { padding: 60px 16px; }
    .pop-grid { grid-template-columns: 1fr; gap: 12px; margin-top: 24px; }
    .steps { flex-direction: column; gap: 12px; margin-top: 32px; }
    .step-item { padding: 20px; border-radius: 20px; }
    .guides-grid { grid-template-columns: 1fr; gap: 16px; margin-top: 24px; }
    .gcard-body { padding: 24px; }
    .faq-list { margin-top: 24px; gap: 10px; }
    #sp-footer { padding: 48px 16px 40px; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; }
    .footer-brand { gap: 16px; }
}

@media screen and (max-width: 535px) {
    #hero {
        min-height: auto;
        padding: 120px 16px 40px; /* Safe hero top padding to prevent nav overlap */
    }

    .hero-h1 { font-size: clamp(30px, 8vw, 36px); letter-spacing: -1.5px; }
    .hero-sub { font-size: 15px; }
    .premium-command-panel { padding: 16px 12px; border-radius: 20px; } /* Safe padding/width for command palette */
    .pop-card { padding: 16px; gap: 12px; border-radius: 18px; }
    .pop-icon { width: 48px; height: 48px; border-radius: 12px; }
    .pop-icon :global(svg) { width: 24px !important; height: 24px !important; }
}
</style>
