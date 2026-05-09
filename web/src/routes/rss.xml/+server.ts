export const prerender = true;

const BASE = "https://snapssave.com";

const posts = [
    {
        title: "Why Your Social Media Video Download Is Not Working",
        description: "Download failing? Private content, expired links, platform blocks, browser issues — the complete troubleshooting guide to fix it fast.",
        slug: "why-your-social-media-video-download-is-not-working",
        pubDate: "Fri, 09 May 2025 12:00:00 GMT",
    },
    {
        title: "How to Copy a Video Link From Instagram, TikTok, Facebook, X, Pinterest, and Reddit",
        description: "To download a video you need the right URL — not a profile or search page, but the specific post link. Here's how to get it from every platform.",
        slug: "how-to-copy-a-video-link",
        pubDate: "Fri, 09 May 2025 11:00:00 GMT",
    },
    {
        title: "How to Save Streamable Videos Online",
        description: "Streamable links shared on Reddit and Discord can vanish at any time. Download any public Streamable clip in seconds — no account needed.",
        slug: "how-to-save-streamable-videos-online",
        pubDate: "Fri, 09 May 2025 10:00:00 GMT",
    },
    {
        title: "How to Download Loom Videos You Have Permission to Save",
        description: "Loom videos can disappear when owners delete them. Save publicly accessible Loom recordings for offline use — no extension required.",
        slug: "how-to-download-loom-videos",
        pubDate: "Fri, 09 May 2025 10:00:00 GMT",
    },
    {
        title: "How to Save Bluesky Videos and Media",
        description: "Bluesky has grown rapidly as a Twitter alternative. Public posts are genuinely public — here's how to save Bluesky videos to your device.",
        slug: "how-to-save-bluesky-videos-and-media",
        pubDate: "Fri, 09 May 2025 10:00:00 GMT",
    },
    {
        title: "How to Download SoundCloud Audio Online",
        description: "SoundCloud hosts millions of independent tracks and podcasts. Save any public track as an MP3 — no subscription, no account, no extension.",
        slug: "how-to-download-soundcloud-audio-online",
        pubDate: "Fri, 09 May 2025 10:00:00 GMT",
    },
    {
        title: "How to Save Vimeo Videos for Personal Use",
        description: "Vimeo hosts high-quality independent films and creative projects. Save any public Vimeo video to your device without installing anything.",
        slug: "how-to-save-vimeo-videos-for-personal-use",
        pubDate: "Fri, 09 May 2025 10:00:00 GMT",
    },
    {
        title: "How to Download Snapchat Videos Online",
        description: "Public Snapchat Spotlight videos are openly accessible on the web. Save them to your device in seconds — no app or account required.",
        slug: "how-to-download-snapchat-videos-online",
        pubDate: "Fri, 09 May 2025 10:00:00 GMT",
    },
    {
        title: "How to Download Pinterest Videos on iPhone and Android",
        description: "Pinterest doesn't have a native video save button. Here's the fastest way to download any public Pinterest pin video to your phone — no app required.",
        slug: "how-to-download-pinterest-videos-on-iphone",
        pubDate: "Fri, 09 May 2025 00:00:00 GMT",
    },
    {
        title: "How to Save Instagram Reels Online Without an App",
        description: "Instagram removed the native Reels download option. This guide shows the simplest way to save them to your camera roll for free.",
        slug: "how-to-save-instagram-reels-online",
        pubDate: "Fri, 09 May 2025 00:00:00 GMT",
    },
    {
        title: "How to Download TikTok Videos Without Installing an App",
        description: "You don't need to install anything to save a TikTok video. Paste the link into a browser and download it in seconds.",
        slug: "how-to-download-tiktok-videos-without-installing-an-app",
        pubDate: "Fri, 09 May 2025 00:00:00 GMT",
    },
    {
        title: "How to Save Twitter/X Videos in HD Quality",
        description: "Twitter doesn't let you download videos natively. Here's how to save any public X/Twitter video in the best available quality from your browser.",
        slug: "how-to-save-twitter-x-videos-in-hd",
        pubDate: "Fri, 09 May 2025 00:00:00 GMT",
    },
    {
        title: "How to Download Reddit Videos With Audio",
        description: "Reddit hosts video and audio separately, which is why most downloaded Reddit videos are silent. Here's how to get both merged into one file.",
        slug: "how-to-download-reddit-videos-with-audio",
        pubDate: "Fri, 09 May 2025 00:00:00 GMT",
    },
    {
        title: "How to Save Facebook Reels Online for Free",
        description: "Facebook Reels play in the app but there's no built-in download button. This guide walks you through saving any public Facebook Reel in a few clicks.",
        slug: "how-to-save-facebook-reels-online",
        pubDate: "Fri, 09 May 2025 00:00:00 GMT",
    },
    {
        title: "Best Social Media Video Downloader for Mobile (iPhone & Android)",
        description: "Comparing the best ways to download social media videos on your phone in 2025 — browser-based tools, apps, and what actually works on iOS Safari.",
        slug: "best-social-media-video-downloader-for-mobile",
        pubDate: "Fri, 09 May 2025 00:00:00 GMT",
    },
];

export function GET() {
    const items = posts
        .map(
            (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <description><![CDATA[${p.description}]]></description>
      <link>${BASE}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE}/blog/${p.slug}</guid>
      <pubDate>${p.pubDate}</pubDate>
    </item>`
        )
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SnapSave Blog</title>
    <description>Tips and guides for downloading social media videos from Instagram, TikTok, Pinterest, and more.</description>
    <link>${BASE}/blog</link>
    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${posts[0].pubDate}</lastBuildDate>
    <image>
      <url>${BASE}/favicon.png</url>
      <title>SnapSave Blog</title>
      <link>${BASE}/blog</link>
    </image>
${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
