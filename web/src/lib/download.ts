import { get } from "svelte/store";

import settings from "$lib/state/settings";

import { device } from "$lib/device";
import { t } from "$lib/i18n/translations";
import { createDialog } from "$lib/state/dialogs";

import type { DialogInfo } from "$lib/types/dialog";
import type { CobaltFileUrlType } from "$lib/types/api";

type DownloadFileParams = {
    url?: string,
    file?: File,
    urlType?: CobaltFileUrlType,
    filename?: string,
}

type SavingDialogParams = {
    url?: string,
    file?: File,
    body?: string,
    urlType?: CobaltFileUrlType,
    filename?: string,
}

const openSavingDialog = ({ url, file, body, urlType, filename }: SavingDialogParams) => {
    const dialogData: DialogInfo = {
        type: "saving",
        id: "saving",
        file,
        url,
        urlType,
        filename,
    }
    if (body) dialogData.bodyText = body;

    createDialog(dialogData)
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const clickAnchor = (href: string, download: string, newTab = false) => {
    const a = document.createElement('a');
    a.href = href;
    a.download = download;
    if (newTab) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

const guessFilename = (url: string, apiFilename?: string): string => {
    if (apiFilename) return apiFilename;
    try {
        const raw = new URL(url).pathname.split('/').pop() || '';
        const seg = raw.split('?')[0];
        const dot = seg.lastIndexOf('.');
        if (dot !== -1) {
            const ext = seg.slice(dot + 1).toLowerCase();
            const audio = new Set(['mp3', 'm4a', 'ogg', 'wav', 'flac', 'opus', 'aac']);
            const video = new Set(['mp4', 'webm', 'mov', 'avi', 'mkv', 'ts']);
            if (audio.has(ext)) return `snapsave-audio.${ext}`;
            if (video.has(ext)) return `snapsave-video.${ext}`;
        }
    } catch { /* ignore parse errors */ }
    return 'snapsave-download.mp4';
};

// ── Public API ────────────────────────────────────────────────────────────────

export const openFile = (file: File) => {
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = file.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export const shareFile = async (file: File) => {
    return await navigator?.share({
        files: [ file ],
    });
}

/*
 * autoDownload — preferred download trigger.
 *
 * Strategy:
 *  1. Try blob fetch (works for CORS-enabled URLs — our tunnel API uses CORS wildcard).
 *     On iOS we hand the blob to the Web Share sheet for the best native UX.
 *     On desktop we create a blob: URL and click a download anchor.
 *  2. If CORS fails and openFallback is true (default for backward-compat):
 *     Fall back to a direct anchor click with target="_blank".
 *     Pass openFallback: false from dialog contexts so a failure returns 'failed'
 *     instead of auto-opening a new tab.
 *
 * Returns 'blob' | 'anchor' | 'failed'.
 */
export const autoDownload = async (
    url: string,
    filename?: string,
    options?: { openFallback?: boolean }
): Promise<'blob' | 'anchor' | 'failed'> => {
    const { openFallback = true } = options ?? {};
    const name = guessFilename(url, filename);

    try {
        const resp = await fetch(url, { mode: 'cors', credentials: 'omit' });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const blob = await resp.blob();

        if (device.is.iOS) {
            const file = new File([blob], name, { type: blob.type || 'video/mp4' });
            try {
                // Under iOS size limit for share sheet
                if (file.size < 1024 * 1024 * 256) {
                    await shareFile(file);
                } else {
                    openFile(file);
                }
                return 'blob';
            } catch {
                openFile(file);
                return 'blob';
            }
        }

        const blobUrl = URL.createObjectURL(blob);
        clickAnchor(blobUrl, name);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
        return 'blob';

    } catch {
        if (!openFallback) return 'failed';
        // CORS blocked or network error — direct anchor click.
        // target="_blank" guards against navigating away if Content-Disposition
        // is not set on the remote URL.
        clickAnchor(url, name, /* newTab */ true);
        return 'anchor';
    }
};

export const openURL = (url: string, hasDialog = false) => {
    if (!['http:', 'https:'].includes(new URL(url).protocol)) {
        return alert('error: invalid url!');
    }

    const open = window.open(url, "_blank", "noopener,noreferrer");

    /* if new tab got blocked by user agent, show a saving dialog */
    if (!open && !hasDialog) {
        return openSavingDialog({
            url,
            body: get(t)("dialog.saving.blocked")
        });
    }
}

export const shareURL = async (url: string) => {
    return await navigator?.share({ url });
}

export const copyURL = async (url: string) => {
    return await navigator?.clipboard?.writeText(url);
}

export const downloadFile = ({ url, file, urlType, filename }: DownloadFileParams) => {
    if (!url && !file) throw new Error("attempted to download void");

    const pref = get(settings).save.savingMethod;

    if (pref === "ask") {
        return openSavingDialog({ url, file, urlType, filename });
    }

    /*
        user actions (such as invoke share, open new tab) have expiration.
        in webkit, for example, that timeout is 5 seconds.
        https://github.com/WebKit/WebKit/blob/b838f8bb/Source/WebCore/page/LocalDOMWindow.cpp#L167

        navigator.userActivation.isActive makes sure that we're still able to
        invoke an action without the user agent interrupting it.
        if not, we show a saving dialog for user to re-invoke that action.

        if browser is old or doesn't support this API, we just assume that it expired.
    */
    if (!navigator?.userActivation?.isActive) {
        return openSavingDialog({
            url,
            file,
            body: get(t)("dialog.saving.timeout"),
            urlType,
            filename,
        });
    }

    // iOS + URL: API calls are async and expire the user gesture before download can trigger.
    // Show the saving dialog so the user's tap on "Download video" provides a fresh gesture.
    if (device.is.iOS && url && !file) {
        return openSavingDialog({ url, urlType, filename });
    }

    try {
        if (file) {
            const iosFileShareSizeLimit = 1024 * 1024 * 256;

            if (device.is.iOS) {
                if (file.size < iosFileShareSizeLimit) {
                    return shareFile(file);
                } else {
                    return openFile(file);
                }
            }

            if (pref === "share" && device.supports.share) {
                return shareFile(file);
            } else if (pref === "download") {
                return openFile(file);
            }
        }

        if (url) {
            if (pref === "share" && device.supports.share) {
                return shareURL(url);
            } else if (pref === "download" && device.supports.directDownload
                    && !(device.is.iOS && urlType === "redirect")) {
                // autoDownload replaces openURL: tries blob fetch (no new tab),
                // falls back to anchor click if CORS is blocked.
                return autoDownload(url, filename);
            } else if (pref === "copy" && !file) {
                return copyURL(url);
            }
        }
    } catch { /* catch & ignore */ }

    return openSavingDialog({ url, file, urlType, filename });
}
