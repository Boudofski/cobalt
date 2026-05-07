<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import { device } from "$lib/device";
    import { hapticConfirm } from "$lib/haptics";
    import { iosShortcutUrl } from "$lib/env";
    import {
        copyURL,
        shareURL,
        openFile,
        shareFile,
        openURL,
        autoDownload,
    } from "$lib/download";

    import type { CobaltFileUrlType } from "$lib/types/api";

    import DialogContainer from "$components/dialog/DialogContainer.svelte";
    import DialogButtons from "$components/dialog/DialogButtons.svelte";
    import CopyIcon from "$components/misc/CopyIcon.svelte";

    import IconDownload from "@tabler/icons-svelte/IconDownload.svelte";
    import IconShare2 from "@tabler/icons-svelte/IconShare2.svelte";
    import IconExternalLink from "@tabler/icons-svelte/IconExternalLink.svelte";
    import IconChevronDown from "@tabler/icons-svelte/IconChevronDown.svelte";

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
    let copied = false;
    let downloading = false;
    let downloadError = false;
    let shortcutExpanded = false;

    $: if (copied) setTimeout(() => { copied = false; }, 1500);

    $: format = filename?.split('.').pop()?.toUpperCase() ?? '';

    $: qualityDisplay = (() => {
        if (!quality) return '';
        if (quality === 'best') return $t('dialog.saving.quality.best');
        if (quality === 'audio') return format || 'MP3';
        return `${quality}p`;
    })();

    $: infoChips = [qualityDisplay, (!isAudio && format) ? format : null].filter(Boolean) as string[];

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
    <div class="dialog-body popup-body">
        <div class="dialog-inner-container">

            <!-- platform + type badges -->
            <div class="meta-row">
                {#if platform}
                    <span class="chip chip-platform">{platform}</span>
                {/if}
                <span class="chip chip-type" class:is-audio={isAudio}>
                    {isAudio ? $t('dialog.saving.type.audio') : $t('dialog.saving.type.video')}
                </span>
            </div>

            <!-- filename -->
            {#if filename}
                <p class="result-name">{filename}</p>
            {/if}

            <!-- quality pill -->
            {#if infoChips.length}
                <div class="quality-pill">
                    <span class="q-star">★</span>
                    <span class="q-text">{infoChips.join(' · ')}</span>
                </div>
            {/if}

            <div class="sep"></div>

            <!-- action area -->
            <div class="result-actions">

                {#if device.is.iOS}
                    <p class="section-label">{$t('dialog.saving.ios.title')}</p>

                    <button
                        class="btn-primary"
                        class:is-loading={downloading}
                        disabled={downloading}
                        on:click={handleDownload}
                    >
                        <IconDownload />
                        {downloading ? $t('dialog.saving.preparing') : $t('dialog.saving.ios.download')}
                    </button>

                    <button class="btn-plain" on:click={() => openURL(url, true)}>
                        <IconExternalLink />
                        {$t('dialog.saving.ios.open')}
                    </button>

                    <button
                        class="btn-expand"
                        on:click={() => shortcutExpanded = !shortcutExpanded}
                    >
                        {$t('dialog.saving.ios.howto.toggle')}
                        <span class="expand-icon" class:rotated={shortcutExpanded}>
                            <IconChevronDown />
                        </span>
                    </button>

                    {#if shortcutExpanded}
                        <div class="shortcut-panel">
                            <ol class="steps">
                                <li>{$t('dialog.saving.ios.howto.1')}</li>
                                <li>{$t('dialog.saving.ios.howto.2')}</li>
                                <li>{$t('dialog.saving.ios.howto.3')}</li>
                            </ol>
                            <a
                                href={iosShortcutUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn-plain shortcut-dl-link"
                            >
                                <IconDownload />
                                {$t('dialog.saving.ios.shortcut.get')}
                            </a>
                        </div>
                    {/if}

                {:else}
                    <!-- Desktop / Android -->
                    {#if file || device.supports.directDownload}
                        <button
                            class="btn-primary"
                            class:is-loading={downloading}
                            disabled={downloading}
                            on:click={handleDownload}
                        >
                            <IconDownload />
                            {downloading ? $t('dialog.saving.preparing') : $t('button.download')}
                        </button>
                    {/if}

                    <div class="btn-row">
                        {#if device.supports.share}
                            <button
                                class="btn-plain"
                                on:click={async () => {
                                    if (file) await shareFile(file);
                                    else if (url) await shareURL(url);
                                }}
                            >
                                <IconShare2 />
                                {$t('button.share')}
                            </button>
                        {/if}
                        {#if !file}
                            <button
                                class="btn-plain"
                                on:click={() => {
                                    if (!copied) { copyURL(url); hapticConfirm(); copied = true; }
                                }}
                            >
                                <CopyIcon check={copied} />
                                {copied ? $t('button.copied') : $t('button.copy')}
                            </button>
                        {/if}
                    </div>

                    {#if downloadError}
                        <div class="error-panel">
                            <p>{$t('dialog.saving.error.blocked')}</p>
                            <a href={url} target="_blank" rel="noopener noreferrer" class="btn-plain">
                                {$t('dialog.saving.error.manual')}
                            </a>
                        </div>
                    {/if}
                {/if}

                {#if bodyText}
                    <p class="body-note">{bodyText}</p>
                {/if}

            </div>
        </div>

        <DialogButtons
            buttons={[{ text: $t('button.done'), main: true, action: () => {} }]}
            closeFunc={close}
        />
    </div>
</DialogContainer>

<style>
    .popup-body {
        max-width: 380px;
        width: calc(100% - var(--padding) - var(--dialog-padding) * 2);
        max-height: 82dvh;
        display: flex;
        flex-direction: column;
        gap: var(--padding);
    }

    .dialog-inner-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow-y: auto;
        width: 100%;
    }

    /* ── badges ── */
    .meta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
    }

    .chip {
        font-size: 10.5px;
        font-weight: 700;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        padding: 3px 8px;
        border-radius: 6px;
    }

    .chip-platform {
        background: var(--blue);
        color: #fff;
    }

    .chip-type {
        background: rgba(59, 130, 246, 0.13);
        color: var(--blue);
    }

    .chip-type.is-audio {
        background: rgba(124, 58, 237, 0.12);
        color: #7C3AED;
    }

    /* ── filename ── */
    .result-name {
        margin: 0;
        font-size: 14.5px;
        font-weight: 600;
        color: var(--secondary);
        word-break: break-all;
        line-height: 1.4;
    }

    /* ── quality pill ── */
    .quality-pill {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        background: var(--button-elevated);
        border-radius: 7px;
        padding: 5px 10px;
        align-self: flex-start;
    }

    .q-star { color: var(--blue); font-size: 11px; line-height: 1; }

    .q-text {
        font-size: 12px;
        font-weight: 600;
        color: var(--secondary);
        letter-spacing: 0.03em;
    }

    /* ── separator ── */
    .sep {
        height: 1px;
        background: var(--popup-stroke);
        flex-shrink: 0;
    }

    /* ── actions ── */
    .result-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .section-label {
        margin: 0;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.09em;
        text-transform: uppercase;
        color: var(--gray);
    }

    /* primary blue button */
    .btn-primary {
        width: 100%;
        background: var(--blue);
        color: #fff;
        border: none;
        border-radius: 11px;
        padding: 13px 16px;
        font-size: 15px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        transition: opacity 0.15s, transform 0.1s;
    }

    .btn-primary:hover:not(:disabled) { opacity: 0.88; }
    .btn-primary:active:not(:disabled) { transform: scale(0.985); }

    .btn-primary:disabled,
    .btn-primary.is-loading { opacity: 0.6; cursor: wait; }

    .btn-primary :global(svg) { width: 19px; height: 19px; stroke-width: 2px; }

    /* secondary elevated button */
    .btn-plain {
        width: 100%;
        background: var(--button-elevated);
        color: var(--secondary);
        border: none;
        border-radius: 10px;
        padding: 11px 14px;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        cursor: pointer;
        text-decoration: none;
        transition: background 0.12s;
    }

    .btn-plain:hover { background: var(--button-elevated-hover); }

    .btn-plain :global(svg) { width: 17px; height: 17px; stroke-width: 1.8px; }

    /* share + copy side-by-side */
    .btn-row {
        display: flex;
        gap: 8px;
    }

    .btn-row .btn-plain { flex: 1; }

    /* expand toggle for shortcut guide */
    .btn-expand {
        background: none;
        border: none;
        color: var(--gray);
        font-size: 12.5px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        padding: 3px 0;
        width: 100%;
    }

    .expand-icon {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        transition: transform 0.2s;
    }

    .expand-icon.rotated { transform: rotate(180deg); }

    .expand-icon :global(svg) {
        width: 15px;
        height: 15px;
        color: var(--gray);
    }

    /* collapsible shortcut panel */
    .shortcut-panel {
        background: var(--button-elevated);
        border-radius: 11px;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 11px;
    }

    .steps {
        margin: 0;
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .steps li {
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary);
        line-height: 1.45;
    }

    .shortcut-dl-link {
        border-radius: 8px;
        padding: 9px 12px;
        font-size: 13px;
    }

    /* error panel */
    .error-panel {
        background: rgba(239, 68, 68, 0.07);
        border: 1px solid rgba(239, 68, 68, 0.18);
        border-radius: 10px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: stretch;
    }

    .error-panel p {
        margin: 0;
        font-size: 13px;
        font-weight: 500;
        color: #EF4444;
    }

    .error-panel .btn-plain {
        font-size: 13px;
        padding: 9px 12px;
        border-radius: 8px;
    }

    /* body text (timeout / blocked messages) */
    .body-note {
        font-size: 13px;
        font-weight: 500;
        line-height: 1.5;
        color: var(--gray);
        white-space: pre-wrap;
        user-select: text;
        -webkit-user-select: text;
        margin: 0;
    }
</style>
