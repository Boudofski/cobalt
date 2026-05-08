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

    // iOS download state
    // iosDownloadAttempted: a download method was triggered (show hint panel)
    // iosBlobFile: blob fetched for redirect-path or lazy share fallback
    // iosFetchingShare: lazy blob fetch in progress for share fallback
    let iosDownloadAttempted = false;
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

    // Platform-aware fallback filename — Pinterest CDN URLs never expose a clean
    // filename segment so we give it a recognisable default.
    $: safeFilename = filename
        ?? (platform === 'Pinterest' ? 'snapsave-pinterest-video.mp4' : 'snapsave-download.mp4');

    // ── iOS: share sheet fallback ─────────────────────────────────────────────
    //
    // Used as stage-2 for both paths:
    //   - tunnel path: iosBlobFile is null → fetches blob lazily, then shares
    //   - redirect path: iosBlobFile already set by handleDownloadIOSRedirect → shares directly
    //
    // navigator.share({ files }) is user-triggered (called from on:click),
    // so the user gesture is always valid when this runs.

    const tryShare = async (f: File) => {
        try {
            if (navigator.canShare?.({ files: [f] })) {
                await navigator.share({ files: [f], title: f.name });
            } else {
                downloadError = true;
            }
        } catch (e: unknown) {
            // AbortError = user dismissed the sheet — not an error
            if ((e as { name?: string })?.name !== 'AbortError') {
                downloadError = true;
            }
        }
    };

    const handleIOSShareFallback = async () => {
        // If we already have the blob (redirect path fetched it), share directly.
        if (iosBlobFile) {
            return tryShare(iosBlobFile);
        }

        // Lazy blob fetch for the tunnel navigation path.
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

    // ── iOS primary paths ─────────────────────────────────────────────────────

    // Tunnel path: navigate browser directly to the tunnel URL.
    //
    // The backend's /tunnel endpoint already sets:
    //   Content-Disposition: attachment; filename="..."
    //   Content-Type: video/mp4  (forwarded from upstream)
    //
    // Safari iOS 13+ honours Content-Disposition: attachment and triggers its
    // native download manager without loading the entire file into RAM first.
    // This is the most reliable approach for large files and slow connections.
    //
    // We open in a new tab (target=_blank) so the web app page is never lost.
    const handleDownloadIOSTunnel = () => {
        const w = window.open(url, '_blank', 'noopener,noreferrer');
        if (!w) {
            // Popup blocked (rare in direct click handlers but possible).
            // Fall back to the blob approach.
            handleDownloadIOSRedirect();
            return;
        }
        iosDownloadAttempted = true;
    };

    // Redirect / fallback path: fetch blob → <a download> click.
    //
    // Used for redirect-type URLs (CDN URLs that lack our Content-Disposition
    // header) and as the blob fallback when window.open is blocked.
    //
    // The <a download> click saves the blob to Files in Safari iOS 13+.
    // iosBlobFile is kept for the share sheet fallback (stage 2).
    const handleDownloadIOSRedirect = async () => {
        downloading = true;
        downloadError = false;
        iosDownloadAttempted = false;
        iosBlobFile = null;

        try {
            const resp = await fetch(url, { mode: 'cors', credentials: 'omit' });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const blob = await resp.blob();
            const mime = blob.type || 'video/mp4';
            const f = new File([blob], safeFilename, { type: mime });

            // <a download> with blob URL — triggers download in Safari iOS 13+
            const blobUrl = URL.createObjectURL(f);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = safeFilename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);

            iosBlobFile = f;
            iosDownloadAttempted = true;
        } catch {
            // CORS blocked, network error, or large file OOM — show calm fallback
            downloadError = true;
        } finally {
            downloading = false;
        }
    };

    // ── Main download handler ─────────────────────────────────────────────────

    const handleDownload = async () => {
        if (file) return openFile(file);
        if (!url) return;

        if (device.is.iOS) {
            // Reset UI state for a fresh attempt
            downloadError = false;
            iosDownloadAttempted = false;
            iosBlobFile = null;

            if (urlType === 'tunnel') {
                // Primary: navigate to the backend tunnel URL which has
                // Content-Disposition: attachment.  No blob RAM overhead.
                return handleDownloadIOSTunnel();
            }

            // redirect or unknown type: blob approach
            return handleDownloadIOSRedirect();
        }

        // Desktop / Android
        downloading = true;
        downloadError = false;

        if (urlType === 'redirect') {
            // CDN redirect URL — try blob fetch + anchor click.
            // If CORS blocks it, show the manual-download panel.
            // Never auto-open the raw CDN link as a first action.
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
            // Tunnel URL — CORS-enabled proxy. autoDownload with openFallback:false
            // so a CORS failure surfaces the error panel instead of opening a new tab.
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
                {downloading ? 'Preparing your file…' : 'Download File'}
            </button>

            <!-- iOS: download was triggered — show hint + share fallback button -->
            {#if device.is.iOS && iosDownloadAttempted && !downloadError}
                <div class="hint-panel">
                    <p>
                        {#if urlType === 'tunnel'}
                            Use Save to Files or Save Video if Safari prompts you.
                        {:else}
                            iPhone Safari may ask you to save through the share sheet.
                        {/if}
                    </p>
                    <button
                        class="btn-share"
                        on:click={handleIOSShareFallback}
                        disabled={iosFetchingShare}
                    >
                        <IconShare2 />
                        {iosFetchingShare ? 'Preparing…' : 'Save / Share File'}
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
