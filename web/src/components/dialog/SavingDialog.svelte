<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import { device } from "$lib/device";
    import { openFile, shareFile, openURL, autoDownload } from "$lib/download";

    import type { CobaltFileUrlType } from "$lib/types/api";

    import DialogContainer from "$components/dialog/DialogContainer.svelte";
    import DialogButtons from "$components/dialog/DialogButtons.svelte";

    import IconDownload from "@tabler/icons-svelte/IconDownload.svelte";
    import IconExternalLink from "@tabler/icons-svelte/IconExternalLink.svelte";
    import IconVideo from "@tabler/icons-svelte/IconVideo.svelte";
    import IconMusic from "@tabler/icons-svelte/IconMusic.svelte";
    import IconPhoto from "@tabler/icons-svelte/IconPhoto.svelte";

    export let id: string;
    export let dismissable = true;
    export let bodyText: string = "";

    export let url: string = "";
    export let file: File | undefined = undefined;
    export let urlType: CobaltFileUrlType | undefined = undefined;
    export let filename: string | undefined = undefined;
    export let platform: string | undefined = undefined;
    export let quality: string | undefined = undefined;
    export let isAudio: boolean = false;

    let close: () => void;
    let downloading = false;
    let downloadError = false;
    let previewFailed = false;
    let mediaLoaded = false;

    const imageExts = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif']);

    $: ext = filename?.split('.').pop()?.toLowerCase() ?? '';
    $: mediaType = isAudio ? 'audio' : imageExts.has(ext) ? 'image' : 'video';

    // Only attempt inline preview for tunnel URLs (our CORS-enabled proxy).
    // Redirect URLs are CDN links — they lack CORS headers and will fail silently.
    $: canPreview = Boolean(url) && (urlType === 'tunnel' || mediaType === 'audio' || mediaType === 'image');

    $: format = filename?.split('.').pop()?.toUpperCase() ?? '';

    $: qualityLabel = (() => {
        if (!quality) return '';
        if (quality === 'best') return 'Best quality';
        if (quality === 'audio') return format || 'Audio';
        return `${quality}p`;
    })();

    $: typeBadge = isAudio ? 'Audio' : mediaType === 'image' ? 'Photo' : 'Video';

    $: displayName = (() => {
        if (!filename) return platform ? `${platform} download` : 'Download ready';
        return filename.length > 44 ? filename.slice(0, 41) + '…' : filename;
    })();

    const handleDownload = async () => {
        if (file) return openFile(file);
        if (!url) return;
        downloading = true;
        downloadError = false;

        if (device.is.iOS) {
            try {
                const resp = await fetch(url, { mode: 'cors', credentials: 'omit' });
                if (!resp.ok) throw new Error();
                const blob = await resp.blob();
                const name = filename ?? 'snapsave-download.mp4';
                const f = new File([blob], name, { type: blob.type || 'video/mp4' });
                await shareFile(f).catch(() => openFile(f));
            } catch {
                openURL(url, true);
            }
        } else {
            const result = await autoDownload(url, filename);
            if (result === 'failed') downloadError = true;
        }
        downloading = false;
    };
</script>

<DialogContainer {id} {dismissable} bind:close>
    <div class="dialog-body save-dialog">

        <!-- ── Preview area ── -->
        <div class="preview-wrap" class:audio-wrap={mediaType === 'audio'}>
            {#if canPreview && !previewFailed}
                {#if mediaType === 'video'}
                    <video
                        class="preview-el"
                        class:loaded={mediaLoaded}
                        src={url}
                        controls
                        muted
                        playsinline
                        preload="metadata"
                        crossorigin="anonymous"
                        on:loadedmetadata={() => mediaLoaded = true}
                        on:error={() => previewFailed = true}
                    ></video>
                    {#if !mediaLoaded}
                        <div class="preview-placeholder" aria-hidden="true">
                            <div class="ph-icon"><IconVideo /></div>
                        </div>
                    {/if}
                {:else if mediaType === 'audio'}
                    <div class="audio-preview">
                        <div class="audio-icon"><IconMusic /></div>
                        <audio
                            class="audio-player"
                            src={url}
                            controls
                            preload="metadata"
                            crossorigin="anonymous"
                            on:error={() => previewFailed = true}
                        ></audio>
                    </div>
                {:else if mediaType === 'image'}
                    <img
                        class="preview-el preview-img"
                        class:loaded={mediaLoaded}
                        src={url}
                        alt={filename ?? 'preview'}
                        crossorigin="anonymous"
                        on:load={() => mediaLoaded = true}
                        on:error={() => previewFailed = true}
                    />
                    {#if !mediaLoaded}
                        <div class="preview-placeholder" aria-hidden="true">
                            <div class="ph-icon"><IconPhoto /></div>
                        </div>
                    {/if}
                {/if}
            {:else}
                <!-- Placeholder for redirect CDN URLs or failed previews -->
                <div class="preview-placeholder">
                    <div class="ph-icon">
                        {#if mediaType === 'audio'}
                            <IconMusic />
                        {:else if mediaType === 'image'}
                            <IconPhoto />
                        {:else}
                            <IconVideo />
                        {/if}
                    </div>
                    <span class="ph-text">
                        {previewFailed ? 'Preview unavailable' : 'Ready to download'}
                    </span>
                </div>
            {/if}
        </div>

        <!-- ── Metadata ── -->
        <div class="meta">
            <div class="badges">
                {#if platform}
                    <span class="badge badge-platform">{platform}</span>
                {/if}
                <span class="badge badge-type" class:is-audio={isAudio}>
                    {typeBadge}
                </span>
                {#if qualityLabel}
                    <span class="badge badge-quality">{qualityLabel}</span>
                {/if}
            </div>
            <p class="display-name" title={filename}>{displayName}</p>
        </div>

        <div class="sep"></div>

        <!-- ── Download action ── -->
        <div class="actions">
            <button
                class="btn-download"
                class:is-loading={downloading}
                disabled={downloading}
                on:click={handleDownload}
            >
                <IconDownload />
                {downloading ? 'Preparing…' : $t('button.download')}
            </button>

            {#if device.is.iOS && url}
                <div class="ios-fallback">
                    Can't save the file?
                    <button class="ios-open" on:click={() => openURL(url, true)}>
                        <IconExternalLink />
                        Open in Safari
                    </button>
                </div>
            {/if}

            {#if downloadError}
                <div class="error-panel">
                    <p>Browser blocked automatic download.</p>
                    {#if url}
                        <a href={url} target="_blank" rel="noopener noreferrer" class="manual-link">
                            <IconExternalLink />
                            Open manually
                        </a>
                    {/if}
                </div>
            {/if}

            {#if bodyText}
                <p class="body-note">{bodyText}</p>
            {/if}
        </div>

        <DialogButtons
            buttons={[{ text: $t('button.done'), main: true, action: () => {} }]}
            closeFunc={close}
        />
    </div>
</DialogContainer>

<style>
    .save-dialog {
        width: min(380px, calc(100vw - 32px));
        max-height: 90dvh;
        display: flex;
        flex-direction: column;
        gap: 14px;
        overflow: hidden;
    }

    /* ── Preview ── */
    .preview-wrap {
        position: relative;
        width: 100%;
        border-radius: 16px;
        overflow: hidden;
        background: var(--button-elevated);
        aspect-ratio: 16 / 9;
        flex-shrink: 0;
    }

    .preview-wrap.audio-wrap {
        aspect-ratio: unset;
        height: auto;
        min-height: 96px;
    }

    .preview-el {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        opacity: 0;
        transition: opacity 0.25s;
    }

    .preview-el.loaded { opacity: 1; }

    .preview-img {
        object-fit: cover;
    }

    .preview-placeholder {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: var(--gray);
    }

    .ph-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.45;
    }

    .ph-icon :global(svg) {
        width: 40px;
        height: 40px;
        stroke-width: 1.4px;
    }

    .ph-text {
        font-size: 12px;
        font-weight: 500;
        opacity: 0.7;
        letter-spacing: 0.01em;
    }

    /* Audio-specific preview */
    .audio-preview {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        padding: 20px 16px;
        min-height: 96px;
    }

    .audio-icon {
        display: flex;
        align-items: center;
        color: var(--blue);
        opacity: 0.7;
    }

    .audio-icon :global(svg) {
        width: 32px;
        height: 32px;
        stroke-width: 1.6px;
    }

    .audio-player {
        width: 100%;
        height: 36px;
        border-radius: 8px;
    }

    /* ── Metadata ── */
    .meta {
        display: flex;
        flex-direction: column;
        gap: 7px;
    }

    .badges {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        align-items: center;
    }

    .badge {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        padding: 3px 8px;
        border-radius: 6px;
        line-height: 1.4;
    }

    .badge-platform {
        background: var(--blue);
        color: #fff;
    }

    .badge-type {
        background: color-mix(in srgb, var(--blue) 15%, transparent);
        color: var(--blue);
    }

    .badge-type.is-audio {
        background: rgba(124, 58, 237, 0.12);
        color: #7C3AED;
    }

    .badge-quality {
        background: var(--button-elevated);
        color: var(--secondary);
        font-weight: 600;
    }

    .display-name {
        margin: 0;
        font-size: 13.5px;
        font-weight: 600;
        color: var(--secondary);
        line-height: 1.4;
        word-break: break-all;
    }

    /* ── Separator ── */
    .sep {
        height: 1px;
        background: var(--popup-stroke);
        flex-shrink: 0;
        margin: 0 -2px;
    }

    /* ── Actions ── */
    .actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .btn-download {
        width: 100%;
        background: var(--blue);
        color: #fff;
        border: none;
        border-radius: 13px;
        padding: 14px 16px;
        font-size: 15.5px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        letter-spacing: 0.01em;
        transition: opacity 0.15s, transform 0.1s;
    }

    .btn-download:hover:not(:disabled) { opacity: 0.88; }
    .btn-download:active:not(:disabled) { transform: scale(0.984); }
    .btn-download:disabled,
    .btn-download.is-loading { opacity: 0.6; cursor: wait; }

    .btn-download :global(svg) {
        width: 20px;
        height: 20px;
        stroke-width: 2.2px;
        flex-shrink: 0;
    }

    /* iOS fallback */
    .ios-fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 6px;
        font-size: 12px;
        color: var(--gray);
        text-align: center;
        padding: 2px 0;
    }

    .ios-open {
        background: none;
        border: none;
        color: var(--blue);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 0;
    }

    .ios-open :global(svg) {
        width: 13px;
        height: 13px;
        stroke-width: 2px;
    }

    /* Error panel */
    .error-panel {
        background: rgba(220, 38, 38, 0.07);
        border: 1px solid rgba(220, 38, 38, 0.18);
        border-radius: 10px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .error-panel p {
        margin: 0;
        font-size: 13px;
        font-weight: 500;
        color: var(--red);
    }

    .manual-link {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;
        font-weight: 600;
        color: var(--secondary);
        background: var(--button-elevated);
        border-radius: 8px;
        padding: 8px 12px;
        text-decoration: none;
        transition: background 0.12s;
    }

    .manual-link:hover { background: var(--button-elevated-hover); }

    .manual-link :global(svg) {
        width: 14px;
        height: 14px;
        stroke-width: 2px;
    }

    /* Body note */
    .body-note {
        font-size: 12.5px;
        font-weight: 500;
        color: var(--gray);
        line-height: 1.5;
        white-space: pre-wrap;
        margin: 0;
    }
</style>
