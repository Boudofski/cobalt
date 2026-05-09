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
        Guide: "#3B82F6",
    };
</script>

<svelte:head>
    <title>SnapSave Blog — Tips & Guides for Downloading Social Media Videos</title>
    <meta name="description" content="Practical guides for saving videos from Instagram, TikTok, Pinterest, Facebook, Twitter, and Reddit. Free tips, no fluff." />
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
                            <span class="post-tag" style="background: {tagColors[post.tag]}22; color: {tagColors[post.tag]}; border-color: {tagColors[post.tag]}44">{post.tag}</span>
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
            </aside>
        </div>
    </div>
</div>

<style>
    .blog-page { display: flex; flex-direction: column; width: 100%; min-height: 100%; }

    .blog-hero { padding: 56px var(--padding) 40px; border-bottom: 1px solid var(--content-border); }
    .blog-hero-inner { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }

    .breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--gray); }
    .breadcrumb a { color: var(--blue); text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }

    .blog-title { font-size: clamp(28px, 4vw, 42px); font-weight: 700; letter-spacing: -1.2px; color: var(--secondary); margin: 0; }
    .blog-sub { font-size: 16px; color: var(--gray); line-height: 1.6; margin: 0; max-width: 560px; }

    .blog-content { padding: 48px var(--padding); }
    .blog-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr 260px; gap: 48px; align-items: start; }

    .posts-grid { display: flex; flex-direction: column; gap: 16px; }

    .post-card {
        display: flex; flex-direction: column; gap: 12px;
        padding: 22px 24px; border-radius: var(--border-radius);
        background: var(--button); border: 1px solid var(--button-stroke);
        text-decoration: none; transition: border-color 0.18s;
    }
    .post-card:hover { border-color: var(--blue); }

    .post-card-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .post-tag { display: inline-flex; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; letter-spacing: 0.3px; border: 1px solid; }
    .post-meta { font-size: 12px; color: var(--gray); }

    .post-title { font-size: 16px; font-weight: 700; color: var(--secondary); margin: 0; line-height: 1.4; letter-spacing: -0.3px; }
    .post-excerpt { font-size: 13.5px; color: var(--gray); line-height: 1.65; margin: 0; }
    .post-cta { font-size: 13px; font-weight: 600; color: var(--blue); }

    .blog-sidebar { position: sticky; top: 80px; }
    .sidebar-section { background: var(--button); border: 1px solid var(--button-stroke); border-radius: var(--border-radius); padding: 20px; }
    .sidebar-heading { font-size: 13px; font-weight: 700; color: var(--secondary); margin: 0 0 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .sidebar-links { display: flex; flex-direction: column; gap: 6px; }
    .sidebar-link { font-size: 13px; color: var(--blue); text-decoration: none; padding: 5px 0; border-bottom: 1px solid var(--button-stroke); }
    .sidebar-link:last-child { border-bottom: none; }
    .sidebar-link:hover { text-decoration: underline; }

    @media (max-width: 700px) {
        .blog-inner { grid-template-columns: 1fr; }
        .blog-sidebar { position: static; }
        .blog-hero { padding: 40px 16px 28px; }
        .blog-content { padding: 32px 16px; }
    }
</style>
