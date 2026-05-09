import env from "$lib/env";
import API from "$lib/api/api";
import settings from "$lib/state/settings";
import lazySettingGetter from "$lib/settings/lazy-get";

import { get } from "svelte/store";
import { t } from "$lib/i18n/translations";
import { downloadFile } from "$lib/download";
import { createDialog } from "$lib/state/dialogs";
import { downloadButtonState } from "$lib/state/omnibox";
import { createSavePipeline } from "$lib/task-manager/queue";

import type { CobaltSaveRequestBody } from "$lib/types/api";

declare global {
    interface Window {
        umami?: { track: (event: string, data?: Record<string, unknown>) => void };
    }
}

const umamiTrack = (event: string, data?: Record<string, unknown>) => {
    try { window.umami?.track(event, data); } catch { /* ignore if blocked */ }
};

type SavingHandlerArgs = {
    url?: string,
    request?: CobaltSaveRequestBody,
    oldTaskId?: string
}

const detectPlatform = (url: string): string => {
    try {
        const h = new URL(url).hostname.replace(/^www\./, '');
        if (/instagram\.com/.test(h)) return 'Instagram';
        if (/tiktok\.com/.test(h)) return 'TikTok';
        if (/youtube\.com|youtu\.be/.test(h)) return 'YouTube';
        if (/twitter\.com|x\.com/.test(h)) return 'X / Twitter';
        if (/facebook\.com|fb\.watch/.test(h)) return 'Facebook';
        if (/twitch\.tv/.test(h)) return 'Twitch';
        if (/reddit\.com/.test(h)) return 'Reddit';
        if (/vimeo\.com/.test(h)) return 'Vimeo';
        if (/pinterest\.com/.test(h) || h === 'pin.it') return 'Pinterest';
        if (/snapchat\.com/.test(h)) return 'Snapchat';
        if (/soundcloud\.com/.test(h)) return 'SoundCloud';
        if (/bilibili\.com/.test(h)) return 'Bilibili';
    } catch { /* ignore */ }
    return '';
};

const deriveQuality = (req: CobaltSaveRequestBody): string => {
    if (req.downloadMode === 'audio') return 'audio';
    const q = req.videoQuality;
    if (!q || q === 'max') return 'best';
    return q;
};

export const savingHandler = async ({ url, request, oldTaskId }: SavingHandlerArgs) => {
    downloadButtonState.set("think");

    umamiTrack("snapsave_download_submit", {
        platform: detectPlatform(url || request?.url || ""),
    });

    const error = (errorText: string) => {
        return createDialog({
            id: "save-error",
            type: "small",
            meowbalt: "error",
            buttons: [
                {
                    text: get(t)("button.gotit"),
                    main: true,
                    action: () => {},
                },
            ],
            bodyText: errorText,
        });
    }

    const getSetting = lazySettingGetter(get(settings));

    if (!request && !url) return;

    // Pinterest CDN (v1.pinimg.com) returns no CORS headers, so redirect URLs
    // can never be blob-downloaded by the browser. Force alwaysProxy so cobalt
    // converts redirect → tunnel through our CORS-enabled API.
    const inputUrl = (url || request?.url || '').toLowerCase();
    // pin.it is Pinterest's short-link domain — alias it so the proxy is forced
    // for both https://pinterest.com/... and https://pin.it/... links.
    const isPinterest = /pinterest\.com|\/\/pin\.it\//.test(inputUrl);
    const forcedProxy = isPinterest ? true : getSetting("save", "alwaysProxy");

    if (import.meta.env.DEV && isPinterest) {
        console.debug('[SnapSave] Pinterest / pin.it detected — forcing alwaysProxy=true', { inputUrl, forcedProxy });
    }

    const selectedRequest = request || {
        url: url!,

        // not lazy cuz default depends on device capabilities
        localProcessing: get(settings).save.localProcessing,

        alwaysProxy: forcedProxy,
        downloadMode: getSetting("save", "downloadMode"),

        subtitleLang: getSetting("save", "subtitleLang"),
        filenameStyle: getSetting("save", "filenameStyle"),
        disableMetadata: getSetting("save", "disableMetadata"),

        audioFormat: getSetting("save", "audioFormat"),
        audioBitrate: getSetting("save", "audioBitrate"),
        tiktokFullAudio: getSetting("save", "tiktokFullAudio"),
        youtubeDubLang: getSetting("save", "youtubeDubLang"),
        youtubeBetterAudio: getSetting("save", "youtubeBetterAudio"),

        videoQuality: getSetting("save", "videoQuality"),
        youtubeVideoCodec: getSetting("save", "youtubeVideoCodec"),
        youtubeVideoContainer: getSetting("save", "youtubeVideoContainer"),
        youtubeHLS: env.ENABLE_DEPRECATED_YOUTUBE_HLS ? getSetting("save", "youtubeHLS") : undefined,

        allowH265: getSetting("save", "allowH265"),
        convertGif: getSetting("save", "convertGif"),
    }

    const response = await API.request(selectedRequest);

    if (import.meta.env.DEV && /pinterest\.com/.test(inputUrl)) {
        console.debug('[SnapSave] Pinterest API response', {
            status: response?.status,
            urlType: (response as Record<string, unknown>)?.urlType ?? 'n/a',
            url: (response as Record<string, unknown>)?.url ?? 'n/a',
        });
    }

    if (!response) {
        downloadButtonState.set("error");
        umamiTrack("snapsave_download_error", { reason: "unreachable" });
        return error(get(t)("error.api.unreachable"));
    }

    if (response.status === "error") {
        downloadButtonState.set("error");

        const errorCode = response.error.code;
        let errorMsg = get(t)(errorCode, response?.error?.context)
            || get(t)("error.api.generic");

        // Replace with user-friendly platform-specific messages for content/fetch failures
        const isDownloadFailure = /\.(content\.|fetch\.)/.test(errorCode);
        if (isDownloadFailure && selectedRequest?.url) {
            const platform = detectPlatform(selectedRequest.url);
            if (platform === 'Instagram') {
                errorMsg = "This Instagram post may be private, expired, or unavailable.";
            } else if (platform === 'TikTok') {
                errorMsg = "This TikTok link may be unavailable or temporarily blocked.";
            } else if (platform === 'Pinterest') {
                errorMsg = "This Pinterest video could not be prepared right now. Try opening the pin and copying the link again.";
            } else if (platform === 'Facebook') {
                errorMsg = "This Facebook video may be private or not publicly accessible.";
            } else if (platform === 'X / Twitter') {
                errorMsg = "This X/Twitter video could not be reached right now.";
            } else if (platform === 'Reddit') {
                errorMsg = "This Reddit video may be unavailable, removed, or missing audio.";
            } else if (platform === 'Snapchat') {
                errorMsg = "This Snapchat content could not be reached. Only public Spotlight links are supported.";
            } else if (platform) {
                errorMsg = "We couldn't process this public link right now. Please try again.";
            }
        }

        umamiTrack("snapsave_download_error", {
            platform: detectPlatform(selectedRequest?.url || ""),
            code: errorCode,
        });
        return error(errorMsg);
    }

    if (response.status === "redirect") {
        downloadButtonState.set("done");
        umamiTrack("snapsave_download_success", {
            platform: detectPlatform(selectedRequest.url),
            type: "redirect",
        });

        return createDialog({
            id: "saving",
            type: "saving",
            url: response.url,
            filename: response.filename,
            urlType: "redirect",
            platform: detectPlatform(selectedRequest.url),
            quality: deriveQuality(selectedRequest),
            isAudio: selectedRequest.downloadMode === 'audio',
        });
    }

    if (response.status === "tunnel") {
        downloadButtonState.set("check");

        const probeResult = await API.probeCobaltTunnel(response.url);

        if (probeResult === 200) {
            downloadButtonState.set("done");
            umamiTrack("snapsave_download_success", {
                platform: detectPlatform(selectedRequest.url),
                type: "tunnel",
            });

            return createDialog({
                id: "saving",
                type: "saving",
                url: response.url,
                filename: response.filename,
                urlType: "tunnel",
                platform: detectPlatform(selectedRequest.url),
                quality: deriveQuality(selectedRequest),
                isAudio: selectedRequest.downloadMode === 'audio',
            });
        } else {
            downloadButtonState.set("error");
            return error(get(t)("error.tunnel.probe"));
        }
    }

    if (response.status === "local-processing") {
        downloadButtonState.set("done");
        return createSavePipeline(response, selectedRequest, oldTaskId);
    }

    if (response.status === "picker") {
        downloadButtonState.set("done");
        const buttons = [
            {
                text: get(t)("button.done"),
                main: true,
                action: () => { },
            },
        ];

        if (response.audio) {
            const pickerAudio = response.audio;
            buttons.unshift({
                text: get(t)("button.download.audio"),
                main: false,
                action: () => {
                    downloadFile({
                        url: pickerAudio,
                    });
                },
            });
        }

        return createDialog({
            id: "download-picker",
            type: "picker",
            items: response.picker,
            buttons,
        });
    }

    downloadButtonState.set("error");
    return error(get(t)("error.api.unknown_response"));
}
