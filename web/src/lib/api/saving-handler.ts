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
        if (/pinterest\.com/.test(h)) return 'Pinterest';
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

    const selectedRequest = request || {
        url: url!,

        // not lazy cuz default depends on device capabilities
        localProcessing: get(settings).save.localProcessing,

        alwaysProxy: getSetting("save", "alwaysProxy"),
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

    if (!response) {
        downloadButtonState.set("error");
        return error(get(t)("error.api.unreachable"));
    }

    if (response.status === "error") {
        downloadButtonState.set("error");

        return error(
            get(t)(response.error.code, response?.error?.context)
        );
    }

    if (response.status === "redirect") {
        downloadButtonState.set("done");

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
