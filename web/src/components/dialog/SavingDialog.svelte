<script lang="ts">
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
    // iOS two-stage state: stage 1 = anchor download attempted,
    // stage 2 = user taps "Save / Share File" to trigger share sheet
    let iosBlobFile: File | null = null;
    let iosAnchorAttempted = false;

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

    // Platform-aware fallback filename — Pinterest gets a descriptive default
    // because its CDN URLs never expose a clean filename segment.
    $: safeFilename = filename
        ?? (platform === 'Pinterest' ? 'snapsave-pinterest-video.mp4' : 'snapsave-download.mp4');

    // ── iOS two-stage download ────────────────────────────────────────────────
    //
    // Stage 1 (handleDownloadIOS): fetch blob → click <a download>.
    //   Safari iOS 13+ supports blob: URL downloads via the download attribute;
    //   the file lands in Files / Downloads. We can't detect success, but we
    //   surface a follow-up "Save / Share File" button for users whose download
    //   didn't trigger (older iOS, non-Safari WebKit, large files).
    //
    // Stage 2 (handleIOSShare): navigator.share({ files }) — native share sheet
    //   with "Save to Files", "Save Video", AirDrop, etc.
    //
    // Last resort: calm error panel with a manual "Open Video" link.

    const handleDownloadIOS = async () => {
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

            // Attempt 1: <a download> with blob URL — triggers file download in Safari iOS 13+
            const blobUrl = URL.createObjectURL(f);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = safeFilename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);

            // Keep the file blob for the share sheet fallback (stage 2)
            iosBlobFile = f;
            iosAnchorAttempted = true;
        } catch {
            // CORS blocked or network failure — show calm fallback panel
            downloadError = true;
        } finally {
            downloading = false;
        }
    };

    // Stage 2: user-triggered share sheet with the already-fetched File object.
    // Triggered by the "Save / Share File" button in the hint panel.
    const handleIOSShare = async () => {
        if (!iosBlobFile) return;
        try {
            if (navigator.canShare?.({ files: [iosBlobFile] })) {
                await navigator.share({ files: [iosBlobFile], title: iosBlobFile.name });
            } else {
                // File sharing not supported — fall through to manual panel
                downloadError = true;
            }
        } catch (e: unknown) {
            // AbortError = user dismissed the share sheet — not an error
            if ((e as { name?: string })?.name !== 'AbortError') {
                downloadError = true;
            }
        }
    };

    // ── Main download handler ─────────────────────────────────────────────────

    const handleDownload = async () => {
        if (file) return openFile(file);
        if (!url) return;

        // iOS always uses the two-stage blob + share path regardless of urlType.
        // Raw link opening is the last-resort fallback only, never automatic.
        if (device.is.iOS) return handleDownloadIOS();

        downloading = true;
        downloadError = false;

        if (urlType === 'redirect') {
            // Redirect = CDN URL from the platform. Try blob fetch + anchor click.
            // If CORS blocks it, show the manual panel (right-click → Save As).
            // Never auto-open the raw CDN link — that navigates away from the app.
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
            // Tunnel URL — CORS-enabled proxy. Standard blob download via autoDownload.
            // openFallback: false so a failure shows the error panel, not a new tab.
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
            <button
                class="btn-download"
                class:is-loading={downloading}
                disabled={downloading}
                on:click={handleDownload}
            >
                <IconDownload />
                {downloading ? 'Preparing…' : 'Download File'}
            </button>

            <!-- iOS stage 1 success: offer share sheet as second save method -->
            {#if device.is.iOS && iosAnchorAttempted && !downloadError}
                <div class="hint-panel">
                    <p>Your file is ready. iPhone Safari may ask you to save through the share sheet.</p>
                    <button class="btn-share" on:click={handleIOSShare}>
                        <IconShare2 />
                        Save / Share File
                    </button>
                </div>
            {/if}

            <!-- Fallback / error panel -->
            {#if downloadError}
                <div class="hint-panel" class:is-error={!device.is.iOS}>
                    <p>
                        {#if device.is.iOS}
                            This source can't be downloaded directly on iPhone Safari.
                            Open the video, then use Share → Save to Files.
                        {:else}
                            Automatic download isn't available for this link.
                            Try opening manually (right-click → Save As).
                        {/if}
                    </p>
                    {#if url}
                        <a href={url} target="_blank" rel="noopener noreferrer" class="manual-link">
                            <IconExternalLink />
                            Open Video
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
        transition: opacity 0.15s, transform 0.1s;
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

    /* ── iOS share sheet fallback button ── */
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

    .btn-share:hover { background: var(--button-elevated-hover); }

    .btn-share :global(svg) {
        width: 16px;
        height: 16px;
        stroke-width: 2px;
        flex-shrink: 0;
    }

    /* ── Helper / fallback panel ── */
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

    /* Desktop error state — red instead of calm blue */
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
