# SnapSave Manual Test Checklist

Run after every significant change to verify core platform flows.

## Setup

- Frontend: https://snapssave.com (or `localhost:5173` for local dev)
- API: https://api.snapssave.com
- Browser: Chrome (desktop), Safari (iPhone), Chrome (Android)

---

## API Health

```bash
curl https://api.snapssave.com
# Expected: JSON with version, url=https://api.snapssave.com, list of services
```

---

## Platform Tests

For each platform, paste a **public** link and verify each step.

Use non-age-restricted, non-region-locked, publicly available videos.

---

### YouTube

**Test URL:** `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

| Step | Expected | Pass |
|------|----------|------|
| API response | `{"status":"tunnel","url":"https://api.snapssave.com/tunnel?...","filename":"...youtube.mp4"}` | ☐ |
| Preview card shows | Platform badge: YouTube · filename displayed · quality pill | ☐ |
| Desktop: Click Download | File downloads without new tab | ☐ |
| iOS: Shows Shortcut guide | "Best method for iPhone" section visible | ☐ |
| iOS: Open in Safari | URL opens in new Safari tab | ☐ |
| Manual fallback | Share / Copy link buttons work | ☐ |

**Known limitations:**
- Age-restricted videos fail → `error.api.content.video.age`
- Private videos fail → `error.api.content.video.private`
- YouTube Shorts with deleted content fail → `error.api.content.video.unavailable`
- Without `YOUTUBE_SESSION_SERVER`, heavily bot-protected content may fail → `error.api.youtube.login`

---

### TikTok

**Test URL:** `https://vm.tiktok.com/ZMkS5xFdN/` (short URL format recommended)

| Step | Expected | Pass |
|------|----------|------|
| API response | `{"status":"tunnel","url":"https://api.snapssave.com/tunnel?...","filename":"tiktok_...mp4"}` | ☐ |
| Preview card shows | Platform badge: TikTok · filename · quality | ☐ |
| Desktop: Click Download | File downloads | ☐ |
| iOS: Shortcut flow | Shortcut guide visible | ☐ |
| Manual fallback | Share / Copy work | ☐ |

**Known limitations:**
- Specific videos may return `error.api.content.post.unavailable` (deleted, private, or TikTok-blocked)
- Full-URL format (`tiktok.com/@user/video/ID`) more likely to be rejected by TikTok than short URLs
- TikTok anti-bot measures may block the server's IP temporarily

---

### Instagram

**Test URL:** Use a public Reel or post (cannot provide a guaranteed-stable link)

| Step | Expected | Pass |
|------|----------|------|
| API response | `tunnel` or `picker` for carousels | ☐ |
| Single video | Preview card → Download | ☐ |
| Carousel (picker) | Picker grid shows thumbnails (desktop) or download buttons (iOS) | ☐ |
| iOS picker | One labeled button per item | ☐ |

**Known limitations:**
- Private accounts → `error.api.content.post.private`
- Stories/highlights may fail
- Instagram rate-limits aggressively; failures are temporary

---

### Facebook

**Test URL:** A public Facebook video (not Reels)

| Step | Expected | Pass |
|------|----------|------|
| API response | `redirect` or `tunnel` | ☐ |
| Preview card | Facebook badge + filename | ☐ |
| Desktop download | Download or new-tab fallback (CDN redirect = new tab) | ☐ |

**Known limitations:**
- Private/friend-only videos fail
- Some videos are CDN redirect (opens new tab on CORS fail — expected)

---

### X / Twitter

**Test URL:** A public tweet with video

| Step | Expected | Pass |
|------|----------|------|
| API response | `tunnel` or `redirect` | ☐ |
| Preview card | X / Twitter badge | ☐ |
| Desktop download | File downloads | ☐ |

**Known limitations:**
- Twitter/X has heavily restricted their API. Many videos return `error.api.fetch.empty`.
- This is a backend extractor issue, not frontend.
- Status: partially broken upstream; no fix available without new Twitter API access.

---

### Reddit

**Test URL:** A public Reddit post with video

| Step | Expected | Pass |
|------|----------|------|
| API response | `tunnel` or `redirect` | ☐ |
| Preview card | Reddit badge | ☐ |

**Known limitations:**
- Reddit changed their API in 2023; some videos return `error.api.fetch.fail`.
- Backend extractor issue; partially broken upstream.

---

## Error State Tests

| Scenario | Expected error message | Pass |
|----------|----------------------|------|
| Private Instagram post | "couldn't find anything about this post..." | ☐ |
| Age-restricted YouTube | "this video is age-restricted..." | ☐ |
| Deleted TikTok video | "couldn't find anything about this post..." + TikTok hint | ☐ |
| Invalid URL | "your link is invalid or this service is not supported..." | ☐ |
| Unsupported service | "this service is not supported yet..." | ☐ |
| Network timeout | "the processing instance took too long..." | ☐ |
| Tunnel probe fail | "couldn't reach the processing server..." | ☐ |

---

## iOS-Specific Tests (Safari on iPhone)

| Test | Expected | Pass |
|------|----------|------|
| Submit any YouTube link | Preview card appears (no auto-download) | ☐ |
| Tap "Download with iOS Shortcut" | Share sheet opens with file | ☐ |
| Tap "Open in Safari" | URL opens in new tab | ☐ |
| Tap "How to use the Shortcut" | Steps expand with shortcut install link | ☐ |
| Picker dialog (Instagram carousel) | Shows download buttons (not thumbnails) | ☐ |
| No new tab before user taps | API processes without opening new tab | ☐ |

---

## Regression Checks

| Feature | Expected | Pass |
|---------|----------|------|
| Settings page loads | No errors, all settings work | ☐ |
| About page loads | SnapSave branding, no Cobalt references | ☐ |
| Queue (local processing) | Processing queue visible and functional | ☐ |
| Copy link button | URL copied to clipboard | ☐ |
| Share button (Android/desktop) | Native share sheet opens | ☐ |
| Done button closes dialog | Dialog dismisses | ☐ |
| No "community instance" labels | Omnibox shows no instance badge | ☐ |

---

## AWS Backend Commands

Run on EC2 to diagnose backend issues:

```bash
# Check PM2 status
pm2 status

# Check API logs (last 200 lines)
pm2 logs snapsave-api --lines 200

# Verify API_URL is correct (should show https://api.snapssave.com)
pm2 env snapsave-api | grep API_URL

# Reload with updated ecosystem config (after git pull)
cd ~/cobalt
git pull origin main
pm2 reload infra/ecosystem.config.cjs --update-env

# Full restart (if reload doesn't work)
pm2 stop snapsave-api
pm2 start infra/ecosystem.config.cjs
pm2 save

# Test API locally from EC2
curl http://127.0.0.1:9000
curl -X POST http://127.0.0.1:9000/ \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

---

## YouTube poToken Server (Optional — improves reliability)

YouTube now requires proof-of-origin tokens for some videos.
Without a poToken server, most public videos still work, but
bot-protected or high-demand content may fail.

To set up:

```bash
# Install bgutil-ytdlp-pot-provider or youtube-trusted-session-generator
# Then set in ecosystem.config.cjs:
# YOUTUBE_SESSION_SERVER: "http://127.0.0.1:4416"
# And reload PM2.
```

Error when needed but missing: `error.api.youtube.no_session_tokens`
