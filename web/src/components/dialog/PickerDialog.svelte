<script lang="ts">
    import { device } from "$lib/device";
    import { t } from "$lib/i18n/translations";
    import { downloadFile } from "$lib/download";

    import type { Optional } from "$lib/types/generic";
    import type { DialogButton } from "$lib/types/dialog";
    import type { DialogPickerItem } from "$lib/types/dialog";

    import DialogContainer from "$components/dialog/DialogContainer.svelte";
    import PickerItem from "$components/dialog/PickerItem.svelte";
    import DialogButtons from "$components/dialog/DialogButtons.svelte";

    import IconDownload from "@tabler/icons-svelte/IconDownload.svelte";
    import IconPhoto from "@tabler/icons-svelte/IconPhoto.svelte";
    import IconVideo from "@tabler/icons-svelte/IconVideo.svelte";
    import IconGif from "@tabler/icons-svelte/IconGif.svelte";

    const isTunnel = (url: string) => {
        try { return new URL(url).pathname === '/tunnel'; } catch { return false; }
    };

    export let id: string;
    export let items: Optional<DialogPickerItem[]> = undefined;
    export let buttons: Optional<DialogButton[]> = undefined;
    export let dismissable = true;

    let close: () => void;

    $: itemCount = items?.filter(i => i?.url).length ?? 0;
    $: gridCols = itemCount <= 3 ? itemCount : 4;
</script>

<DialogContainer {id} {dismissable} bind:close>
    <div class="dialog-body picker-dialog">

        <div class="picker-header">
            <p class="picker-title">{$t("dialog.picker.title")}</p>
            <p class="picker-desc">
                {#if device.is.iOS}
                    {$t("dialog.picker.description.ios")}
                {:else if device.is.mobile}
                    {$t("dialog.picker.description.phone")}
                {:else}
                    {$t("dialog.picker.description.desktop")}
                {/if}
            </p>
        </div>

        {#if items && items.length > 0}
            {#if device.is.iOS}
                <!-- iOS: vertical download buttons -->
                <div class="ios-list">
                    {#each items as item, i}
                        {#if item?.url}
                            <button
                                class="ios-item"
                                onclick={() => downloadFile({
                                    url: item.url,
                                    urlType: isTunnel(item.url) ? "tunnel" : "redirect",
                                })}
                            >
                                <span class="ios-item-icon">
                                    {#if item.type === 'video'}
                                        <IconVideo />
                                    {:else if item.type === 'gif'}
                                        <IconGif />
                                    {:else}
                                        <IconPhoto />
                                    {/if}
                                </span>
                                <span class="ios-item-label">
                                    {$t(`a11y.dialog.picker.item.${item.type ?? "photo"}`)}
                                    {i + 1}
                                </span>
                                <span class="ios-item-dl"><IconDownload /></span>
                            </button>
                        {/if}
                    {/each}
                </div>
            {:else}
                <!-- Desktop/Android: thumbnail grid -->
                <div
                    class="picker-grid"
                    style="--cols: {gridCols}"
                >
                    {#each items as item, i}
                        {#if item?.url}
                            <PickerItem {item} number={i + 1} />
                        {/if}
                    {/each}
                </div>
            {/if}
        {/if}

        {#if buttons}
            <DialogButtons {buttons} closeFunc={close} />
        {/if}
    </div>
</DialogContainer>

<style>
    .picker-dialog {
        --item-size: 116px;
        --item-gap: 4px;

        display: flex;
        flex-direction: column;
        gap: 14px;

        max-height: calc(90dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
        width: auto;
        max-width: min(520px, calc(100vw - 32px));
    }

    /* ── Header ── */
    .picker-header {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    .picker-title {
        margin: 0;
        font-size: 17px;
        font-weight: 700;
        color: var(--secondary);
        line-height: 1.2;
    }

    .picker-desc {
        margin: 0;
        font-size: 12.5px;
        font-weight: 500;
        color: var(--gray);
        line-height: 1.4;
    }

    /* ── Desktop thumbnail grid ── */
    .picker-grid {
        display: grid;
        grid-template-columns: repeat(var(--cols, 4), var(--item-size));
        gap: var(--item-gap);
        overflow-y: auto;
        border-radius: 12px;
    }

    :global(.picker-item) {
        width: var(--item-size);
        height: var(--item-size);
    }

    /* ── iOS list ── */
    .ios-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        max-width: 340px;
        align-self: center;
    }

    .ios-item {
        width: 100%;
        background: var(--button-elevated);
        border: none;
        border-radius: 12px;
        padding: 13px 14px;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: background 0.12s;
        text-align: left;
    }

    .ios-item:hover { background: var(--button-elevated-hover); }
    .ios-item:active { background: var(--button-elevated-press); }

    .ios-item-icon {
        display: flex;
        align-items: center;
        color: var(--gray);
        flex-shrink: 0;
    }

    .ios-item-icon :global(svg) {
        width: 20px;
        height: 20px;
        stroke-width: 1.8px;
    }

    .ios-item-label {
        flex: 1;
        font-size: 14.5px;
        font-weight: 600;
        color: var(--secondary);
        text-transform: capitalize;
    }

    .ios-item-dl {
        display: flex;
        align-items: center;
        color: var(--blue);
        flex-shrink: 0;
    }

    .ios-item-dl :global(svg) {
        width: 18px;
        height: 18px;
        stroke-width: 2px;
    }

    /* Responsive grid */
    @media screen and (max-width: 535px) {
        .picker-dialog {
            --item-size: 110px;
        }
    }

    @media screen and (max-width: 420px) {
        .picker-dialog {
            --item-size: 100px;
        }
    }

    @media screen and (max-width: 360px) {
        .picker-dialog {
            --item-size: 90px;
            --cols: 3 !important;
        }
    }

    @media screen and (max-width: 300px) {
        .picker-dialog {
            --item-size: 120px;
            --cols: 2 !important;
        }
    }
</style>
