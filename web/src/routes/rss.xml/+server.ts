export const prerender = true;

const BASE = "https://snapssave.com";

const posts = [
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
