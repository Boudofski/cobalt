<script lang="ts">
    import { onMount } from 'svelte';
    import { t } from "$lib/i18n/translations";
    import { device } from "$lib/device";
    import { openFile, autoDownload } from "$lib/download";

    import type { CobaltFileUrlType } from "$lib/types/api";

    import DialogContainer from "$components/dialog/DialogContainer.svelte";
    import DialogButtons from "$components/dialog/DialogButtons.svelte";

    import IconDownload from "@tabler/icons-svelte/IconDownload.svelte";
    import IconExternalLink from "@tabler/icons-svelte/IconExternalLink.svelte";
    import IconShare2 from "@tabler/icons-svelte/IconShare2.svelte";

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
    // iOS state for the redirect/blob path (non-tunnel)
    let iosAnchorAttempted = false;
    let iosBlobFile: File | null = null;
    let iosFetchingShare = false;

    $: format = filename?.split('.').pop()?.toUpperCase() ?? '';

    $: qualityLabel = (() => {
        if (!quality) return '';
        if (quality === 'best') return 'Best quality';
        if (quality === 'audio') return format || 'Audio';
        return `${quality}p`;
    })();

    $: typeBadge = isAudio ? 'Audio' : 'Video';

    $: displayName = (() => {
        if (!filename) return platform ? `${platform} download` : 'Download ready';
        return filename.length > 44 ? filename.slice(0, 41) + '…' : filename;
    })();

    // Platform-aware fallback filename — Pinterest CDN never exposes a clean name.
    $: safeFilename = filename
        ?? (platform === 'Pinterest' ? 'snapsave-pinterest-video.mp4' : 'snapsave-download.mp4');

    // For iOS + tunnel: the primary button is a real <a> element so Safari
    // recognises it as an authentic user-tap navigation (window.open inside
    // async functions is blocked by WebKit even without any awaits).
    $: iosTunnelMode = device.is.iOS && urlType === 'tunnel' && !!url;

    // Dev-mode diagnostic — confirms what the dialog received.
    // Remove or disable if logs become noisy in production.
    onMount(() => {
        if (import.meta.env.DEV && url) {
            console.debug('[SnapSave] SavingDialog opened', {
                platform,
                urlType,
                url,
                filename,
                safeFilename,
                'device.is.iOS': device.is.iOS,
                iosTunnelMode,
            });
        }
    });

    // ── iOS share sheet (stage 2 for both paths) ──────────────────────────────
    //
    // If iosBlobFile is already set (redirect path fetched it during stage 1),
    // share it directly. Otherwise do a lazy blob fetch first.
    // This function is always called from a button on:click → user gesture valid.

    const tryShare = async (f: File) => {
        try {
            if (navigator.canShare?.({ files: [f] })) {
                await navigator.share({ files: [f], title: f.name });
            } else {
                downloadError = true;
            }
        } catch (e: unknown) {
            if ((e as { name?: string })?.name !== 'AbortError') {
                downloadError = true;
            }
        }
    };

    const handleIOSShare = async () => {
        if (iosBlobFile) {
            return tryShare(iosBlobFile);
        }
        // Lazy fetch for the tunnel path (blob not yet available)
        iosFetchingShare = true;
        try {
            const resp = await fetch(url, { mode: 'cors', credentials: 'omit' });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const blob = await resp.blob();
            const f = new File([blob], safeFilename, { type: blob.type || 'video/mp4' });
            iosBlobFile = f;
            await tryShare(f);
        } catch {
            downloadError = true;
        } finally {
            iosFetchingShare = false;
        }
    };

    // ── iOS redirect / blob path ──────────────────────────────────────────────
    //
    // Used for redirect-type URLs (CDN direct links without Content-Disposition)
    // and as the fallback when tunnel navigation somehow doesn't trigger a download.
    // Fetches the blob, clicks a <a download> anchor (Files app on iOS 13+),
    // and keeps the File for the share-sheet fallback.

    const handleDownloadIOSBlob = async () => {
        downloading = true;
        downloadError = false;
        iosAnchorAttempted = false;
        iosBlobFile = null;

        try {
            const resp = await fetch(url, { mode: 'cors', credentials: 'omit' });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const blob = await resp.blob();
            const mime = blob.type || 'video/mp4';
            const f = new File([blob], safeFilename, { type: mime });

            const blobUrl = URL.createObjectURL(f);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = safeFilename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);

            iosBlobFile = f;
            iosAnchorAttempted = true;
        } catch {
            downloadError = true;
        } finally {
            downloading = false;
        }
    };

    // ── Desktop / Android handler ─────────────────────────────────────────────

    const handleDownload = async () => {
        if (file) return openFile(file);
        if (!url) return;

        // iOS tunnel mode uses a real <a> element — this handler is not invoked
        // for that path. iOS redirect falls through to handleDownloadIOSBlob.
        if (device.is.iOS) return handleDownloadIOSBlob();

        downloading = true;
        downloadError = false;

        if (urlType === 'redirect') {
            try {
                const resp = await fetch(url, { mode: 'cors', credentials: 'omit' });
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                const blob = await resp.blob();
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = safeFilename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
            } catch {
                downloadError = true;
            }
        } else {
            const result = await autoDownload(url, filename, { openFallback: false });
            if (result === 'failed') downloadError = true;
        }

        downloading = false;
    };
</script>

<DialogContainer {id} {dismissable} bind:close>
    <div class="dialog-body save-dialog">

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

        <!-- ── Actions ── -->
        <div class="actions">

            <!--
                iOS + tunnel: real <a> element.
                Safari honours Content-Disposition: attachment on a user-tapped
                anchor navigation. window.open() inside async handlers is silently
                blocked by WebKit even when no await has run.
            -->
            {#if iosTunnelMode}
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-download"
                >
                    <IconDownload />
                    Download File
                </a>

                <p class="ios-hint">
                    Tap Download File. If Safari opens the video instead, tap Share → Save to Files.
                </p>

                <button
                    class="btn-share"
                    on:click={handleIOSShare}
                    disabled={iosFetchingShare}
                >
                    <IconShare2 />
                    {iosFetchingShare ? 'Preparing…' : 'Save / Share File'}
                </button>

                {#if downloadError}
                    <div class="hint-panel">
                        <p>
                            This source can't be saved automatically on iPhone Safari.
                            Open the video, then tap Share → Save to Files.
                        </p>
                        <a href={url} target="_blank" rel="noopener noreferrer" class="manual-link">
                            <IconExternalLink />
                            Open Video
                        </a>
                    </div>
                {/if}

            <!--
                iOS + redirect, or non-iOS file download (local processing output):
                use the existing blob / button path.
            -->
            {:else if device.is.iOS && !file}
                <button
                    class="btn-download"
                    class:is-loading={downloading}
                    disabled={downloading}
                    on:click={handleDownload}
                >
                    <IconDownload />
                    {downloading ? 'Preparing your file…' : 'Download File'}
                </button>

                {#if iosAnchorAttempted && !downloadError}
                    <div class="hint-panel">
                        <p>iPhone Safari may ask you to save through the share sheet.</p>
                        <button
                            class="btn-share"
                            on:click={handleIOSShare}
                            disabled={iosFetchingShare}
                        >
                            <IconShare2 />
                            {iosFetchingShare ? 'Preparing…' : 'Save / Share File'}
                        </button>
                    </div>
                {/if}

                {#if downloadError}
                    <div class="hint-panel">
                        <p>
                            This source can't be downloaded directly on iPhone Safari.
                            Open the video, then use Share → Save to Files.
                        </p>
                        <a href={url} target="_blank" rel="noopener noreferrer" class="manual-link">
                            <IconExternalLink />
                            Open Video
                        </a>
                    </div>
                {/if}

            <!-- Desktop, Android, and iOS local-processing file download -->
            {:else}
                <button
                    class="btn-download"
                    class:is-loading={downloading}
                    disabled={downloading}
                    on:click={handleDownload}
                >
                    <IconDownload />
                    {downloading ? 'Preparing your file…' : 'Download File'}
                </button>

                {#if downloadError}
                    <div class="hint-panel is-error">
                        <p>
                            Automatic download isn't available for this link.
                            Try opening manually (right-click → Save As).
                        </p>
                        {#if url}
                            <a href={url} target="_blank" rel="noopener noreferrer" class="manual-link">
                                <IconExternalLink />
                                Open Video
                            </a>
                        {/if}
                    </div>
                {/if}
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
        width: min(360px, calc(100vw - 32px));
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    /* ── Metadata ── */
    .meta {
        display: flex;
        flex-direction: column;
        gap: 8px;
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
    }

    /* ── Actions ── */
    .actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    /* ── Primary download button / anchor ── */
    .btn-download {
        width: 100%;
        background: var(--blue);
        color: #fff;
        border: none;
        border-radius: 13px;
        padding: 14px 16px;
        font-size: 15px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        letter-spacing: 0.01em;
        text-decoration: none;
        transition: opacity 0.15s, transform 0.1s;
        box-sizing: border-box;
    }

    .btn-download:hover:not(:disabled) { opacity: 0.88; }
    .btn-download:active:not(:disabled) { transform: scale(0.985); }
    .btn-download:disabled,
    .btn-download.is-loading { opacity: 0.6; cursor: wait; }

    .btn-download :global(svg) {
        width: 19px;
        height: 19px;
        stroke-width: 2.2px;
        flex-shrink: 0;
    }

    /* ── iOS hint text (shown below the anchor for tunnel mode) ── */
    .ios-hint {
        margin: 0;
        font-size: 12.5px;
        font-weight: 500;
        color: var(--secondary);
        line-height: 1.45;
        opacity: 0.75;
    }

    /* ── Secondary share button ── */
    .btn-share {
        width: 100%;
        background: var(--button-elevated);
        color: var(--secondary);
        border: none;
        border-radius: 10px;
        padding: 11px 14px;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        cursor: pointer;
        transition: background 0.12s;
    }

    .btn-share:hover:not(:disabled) { background: var(--button-elevated-hover); }
    .btn-share:disabled { opacity: 0.6; cursor: wait; }

    .btn-share :global(svg) {
        width: 16px;
        height: 16px;
        stroke-width: 2px;
        flex-shrink: 0;
    }

    /* ── Hint / fallback panel ── */
    .hint-panel {
        background: color-mix(in srgb, var(--blue) 8%, transparent);
        border: 1px solid color-mix(in srgb, var(--blue) 20%, transparent);
        border-radius: 10px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .hint-panel p {
        margin: 0;
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary);
        line-height: 1.45;
    }

    /* Desktop error state — red tint */
    .hint-panel.is-error {
        background: rgba(220, 38, 38, 0.07);
        border-color: rgba(220, 38, 38, 0.18);
    }

    .hint-panel.is-error p {
        color: var(--red);
    }

    .manual-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        font-weight: 600;
        color: var(--secondary);
        background: var(--button-elevated);
        border-radius: 8px;
        padding: 9px 12px;
        text-decoration: none;
        transition: background 0.12s;
    }

    .manual-link:hover { background: var(--button-elevated-hover); }

    .manual-link :global(svg) { width: 14px; height: 14px; stroke-width: 2px; }

    /* Body note */
    .body-note {
        font-size: 12.5px;
        color: var(--gray);
        line-height: 1.5;
        white-space: pre-wrap;
        margin: 0;
    }
</style>
