<script>
    const posts = [
        {
            slug: "how-to-download-pinterest-videos-on-iphone",
            title: "How to Download Pinterest Videos on iPhone and Android",
            excerpt: "Pinterest videos don't have a native save button. Here's the fastest way to save any public Pinterest pin video to your phone — no app required.",
            tag: "Pinterest",
            date: "May 2025",
            readTime: "4 min read",
        },
        {
            slug: "how-to-save-instagram-reels-online",
            title: "How to Save Instagram Reels Without an App",
            excerpt: "Instagram removed the option to download Reels from its own app. This guide shows you the simplest way to save them to your camera roll for free.",
            tag: "Instagram",
            date: "May 2025",
            readTime: "4 min read",
        },
        {
            slug: "how-to-download-tiktok-videos-without-installing-an-app",
            title: "How to Download TikTok Videos Without Installing an App",
            excerpt: "You don't need to install anything to save a TikTok video. Paste the link into a browser and download it in seconds — with or without the watermark.",
            tag: "TikTok",
            date: "May 2025",
            readTime: "4 min read",
        },
        {
            slug: "how-to-save-twitter-x-videos-in-hd",
            title: "How to Save Twitter/X Videos in HD Quality",
            excerpt: "Twitter doesn't let you download videos natively. Here's how to save any public X/Twitter video in the best available quality, directly from your browser.",
            tag: "Twitter / X",
            date: "May 2025",
            readTime: "4 min read",
        },
        {
            slug: "how-to-download-reddit-videos-with-audio",
            title: "How to Download Reddit Videos With Audio",
            excerpt: "Reddit hosts video and audio separately, which is why most downloaded Reddit videos are silent. Here's how to get both merged into one file.",
            tag: "Reddit",
            date: "May 2025",
            readTime: "4 min read",
        },
        {
            slug: "how-to-save-facebook-reels-online",
            title: "How to Save Facebook Reels Online for Free",
            excerpt: "Facebook Reels play in the app, but there's no built-in download button. This guide walks you through saving any public Facebook Reel in a few clicks.",
            tag: "Facebook",
            date: "May 2025",
            readTime: "4 min read",
        },
        {
            slug: "how-to-download-snapchat-videos-online",
            title: "How to Download Snapchat Videos Online",
            excerpt: "Public Snapchat Spotlight videos are openly accessible on the web. Here's how to save them to your device in seconds — no app or account required.",
            tag: "Snapchat",
            date: "May 2025",
            readTime: "4 min read",
        },
        {
            slug: "how-to-save-vimeo-videos-for-personal-use",
            title: "How to Save Vimeo Videos for Personal Use",
            excerpt: "Vimeo hosts some of the highest-quality independent films and creative projects online. Save any public Vimeo video to your device without installing anything.",
            tag: "Vimeo",
            date: "May 2025",
            readTime: "4 min read",
        },
        {
            slug: "how-to-download-soundcloud-audio-online",
            title: "How to Download SoundCloud Audio Online",
            excerpt: "SoundCloud hosts millions of independent tracks and podcasts. Save any public track as an MP3 — no subscription, no account, no extension.",
            tag: "SoundCloud",
            date: "May 2025",
            readTime: "4 min read",
        },
        {
            slug: "how-to-save-bluesky-videos-and-media",
            title: "How to Save Bluesky Videos and Media",
            excerpt: "Bluesky has grown rapidly as a Twitter alternative. Public posts are genuinely public — here's how to save Bluesky videos to your device easily.",
            tag: "Bluesky",
            date: "May 2025",
            readTime: "4 min read",
        },
        {
            slug: "how-to-download-loom-videos",
            title: "How to Download Loom Videos You Have Permission to Save",
            excerpt: "Loom videos can disappear when owners delete them. Here's how to save publicly accessible Loom recordings for offline use — no extension required.",
            tag: "Loom",
            date: "May 2025",
            readTime: "4 min read",
        },
        {
            slug: "how-to-save-streamable-videos-online",
            title: "How to Save Streamable Videos Online",
            excerpt: "Streamable links shared on Reddit and Discord can vanish at any time. Download and keep a copy of any public Streamable clip in seconds.",
            tag: "Streamable",
            date: "May 2025",
            readTime: "3 min read",
        },
        {
            slug: "why-your-social-media-video-download-is-not-working",
            title: "Why Your Social Media Video Download Is Not Working",
            excerpt: "Download failing? Private content, expired links, platform blocks, browser issues — here's the complete troubleshooting guide to fix it fast.",
            tag: "Troubleshooting",
            date: "May 2025",
            readTime: "6 min read",
        },
        {
            slug: "how-to-copy-a-video-link",
            title: "How to Copy a Video Link From Instagram, TikTok, Facebook, X, Pinterest, and Reddit",
            excerpt: "To download a video you need the right URL — not a profile or search page, but the specific post link. Here's how to get it from every platform.",
            tag: "Guide",
            date: "May 2025",
            readTime: "5 min read",
        },
        {
            slug: "best-social-media-video-downloader-for-mobile",
            title: "Best Social Media Video Downloader for Mobile (iPhone & Android)",
            excerpt: "Comparing the best ways to download social media videos on your phone in 2025 — browser-based tools, native apps, and what actually works on iOS Safari.",
            tag: "Guide",
            date: "May 2025",
            readTime: "6 min read",
        },
    ];

    const tagColors = {
        Pinterest: "#E60023",
        Instagram: "#C13584",
        TikTok: "#010101",
        "Twitter / X": "#1DA1F2",
        Reddit: "#FF4500",
        Facebook: "#1877F2",
        Snapchat: "#FFFC00",
        Vimeo: "#1AB7EA",
        SoundCloud: "#FF5500",
        Bluesky: "#208BFE",
        Loom: "#7C3AED",
        Streamable: "#3B82F6",
        Troubleshooting: "#F59E0B",
        Guide: "#3B82F6",
    };

    const tagTextColors = {
        Snapchat: "#7A7A00",
        TikTok: "#ffffff",
    };
</script>

<svelte:head>
    <title>SnapSave Blog — Tips & Guides for Downloading Social Media Videos</title>
    <meta name="description" content="Practical guides for saving videos from Instagram, TikTok, Pinterest, Facebook, Twitter, Reddit, Snapchat, Vimeo, SoundCloud, and more. Free tips, no fluff." />
    <meta property="og:title" content="SnapSave Blog — Video Download Guides" />
    <meta property="og:description" content="Practical guides for saving videos from Instagram, TikTok, Pinterest, Facebook, Twitter, and Reddit." />
    <meta property="og:image" content="https://snapssave.com/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="SnapSave Blog" />
    <meta name="twitter:description" content="Tips and guides for downloading social media videos on any device." />
    <link rel="canonical" href="https://snapssave.com/blog" />
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Blog","name":"SnapSave Blog","url":"https://snapssave.com/blog","description":"Tips and guides for downloading social media videos from Instagram, TikTok, Pinterest, and more.","publisher":{"@type":"Organization","name":"SnapSave","url":"https://snapssave.com","logo":{"@type":"ImageObject","url":"https://snapssave.com/favicon.png"}}}</script>
</svelte:head>

<div class="blog-page">
    <div class="blog-hero">
        <div class="blog-hero-inner">
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="/">SnapSave</a>
                <span aria-hidden="true">›</span>
                <span>Blog</span>
            </nav>
            <h1 class="blog-title">SnapSave Blog</h1>
            <p class="blog-sub">Practical guides for saving videos from any platform — no app required, no fluff.</p>
        </div>
    </div>

    <div class="blog-content">
        <div class="blog-inner">
            <div class="posts-grid">
                {#each posts as post}
                    <a href="/blog/{post.slug}" class="post-card" data-umami-event="blog-card-click" data-umami-event-slug={post.slug}>
                        <div class="post-card-top">
                            <span
                                class="post-tag"
                                style="background: {tagColors[post.tag]}22; color: {tagTextColors[post.tag] || tagColors[post.tag]}; border-color: {tagColors[post.tag]}44"
                            >{post.tag}</span>
                            <span class="post-meta">{post.date} · {post.readTime}</span>
                        </div>
                        <h2 class="post-title">{post.title}</h2>
                        <p class="post-excerpt">{post.excerpt}</p>
                        <span class="post-cta">Read guide →</span>
                    </a>
                {/each}
            </div>

            <aside class="blog-sidebar">
                <div class="sidebar-section">
                    <h3 class="sidebar-heading">Quick downloads</h3>
                    <div class="sidebar-links">
                        <a href="/instagram-video-downloader" class="sidebar-link">Instagram Video Downloader</a>
                        <a href="/instagram-reels-downloader" class="sidebar-link">Instagram Reels Downloader</a>
                        <a href="/tiktok-video-downloader" class="sidebar-link">TikTok Video Downloader</a>
                        <a href="/facebook-video-downloader" class="sidebar-link">Facebook Video Downloader</a>
                        <a href="/twitter-video-downloader" class="sidebar-link">Twitter Video Downloader</a>
                        <a href="/pinterest-video-downloader" class="sidebar-link">Pinterest Video Downloader</a>
                        <a href="/reddit-video-downloader" class="sidebar-link">Reddit Video Downloader</a>
                        <a href="/snapchat-video-downloader" class="sidebar-link">Snapchat Video Downloader</a>
                    </div>
                </div>
                <div class="sidebar-section" style="margin-top: 16px;">
                    <h3 class="sidebar-heading">Troubleshooting</h3>
                    <div class="sidebar-links">
                        <a href="/blog/why-your-social-media-video-download-is-not-working" class="sidebar-link">Download not working?</a>
                        <a href="/blog/how-to-copy-a-video-link" class="sidebar-link">How to copy a video link</a>
                        <a href="/status" class="sidebar-link">Service status</a>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</div>

<style>
    .blog-page { display: flex; flex-direction: column; width: 100%; min-height: 100%; }

    /* ─── Hero ─── */
    .blog-hero {
        padding: 60px var(--padding) 44px;
        border-bottom: 1px solid var(--content-border);
    }

    .blog-hero-inner {
        max-width: 900px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .breadcrumb {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: var(--gray);
    }

    .breadcrumb a { color: var(--blue); text-decoration: none; }
    @media (hover: hover) { .breadcrumb a:hover { text-decoration: underline; } }

    .blog-title {
        font-size: clamp(30px, 4vw, 46px);
        font-weight: 800;
        letter-spacing: -1.5px;
        color: var(--secondary);
        margin: 0;
        font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    }

    .blog-sub {
        font-size: 16.5px;
        color: var(--gray);
        line-height: 1.7;
        margin: 0;
        max-width: 540px;
        font-weight: 400;
    }

    /* ─── Content layout ─── */
    .blog-content { padding: 52px var(--padding); }

    .blog-inner {
        max-width: 960px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 260px;
        gap: 52px;
        align-items: start;
    }

    /* ─── Post cards ─── */
    .posts-grid { display: flex; flex-direction: column; gap: 14px; }

    .post-card {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 24px 26px;
        border-radius: 16px;
        background: var(--button);
        border: 1px solid var(--button-stroke);
        text-decoration: none;
        transition: border-color 0.18s, box-shadow 0.18s;
    }

    @media (hover: hover) {
        .post-card:hover {
            border-color: rgba(59,130,246,0.35);
            box-shadow: 0 4px 16px rgba(59,130,246,0.07);
        }
    }

    .post-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }

    .post-tag {
        display: inline-flex;
        padding: 3px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.3px;
        border: 1px solid;
    }

    .post-meta { font-size: 12px; color: var(--gray); }

    .post-title {
        font-size: 16.5px;
        font-weight: 700;
        color: var(--secondary);
        margin: 0;
        line-height: 1.4;
        letter-spacing: -0.3px;
    }

    .post-excerpt {
        font-size: 13.5px;
        color: var(--gray);
        line-height: 1.68;
        margin: 0;
    }

    .post-cta {
        font-size: 13px;
        font-weight: 600;
        color: var(--blue);
        margin-top: 2px;
    }

    /* ─── Sidebar ─── */
    .blog-sidebar { position: sticky; top: 24px; }

    .sidebar-section {
        background: var(--button);
        border: 1px solid var(--button-stroke);
        border-radius: 14px;
        padding: 22px;
    }

    .sidebar-heading {
        font-size: 11px;
        font-weight: 700;
        color: var(--secondary);
        margin: 0 0 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
        opacity: 0.7;
    }

    .sidebar-links { display: flex; flex-direction: column; gap: 2px; }

    .sidebar-link {
        font-size: 13px;
        color: var(--gray);
        text-decoration: none;
        padding: 7px 10px;
        border-radius: 8px;
        transition: background 0.13s, color 0.13s;
        display: block;
    }

    @media (hover: hover) {
        .sidebar-link:hover {
            background: var(--button-hover);
            color: var(--secondary);
        }
    }

    /* ─── Responsive ─── */
    @media (max-width: 700px) {
        .blog-inner { grid-template-columns: 1fr; gap: 32px; }
        .blog-sidebar { position: static; }
        .blog-hero { padding: 44px 16px 32px; }
        .blog-content { padding: 36px 16px; }
    }
</style>
