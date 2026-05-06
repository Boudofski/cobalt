<script>
    import IconCobalt from "$components/icons/Cobalt.svelte";
</script>

<div id="snapsave-logo">
    <div id="logo-icon">
        <IconCobalt />
    </div>
    <span id="brand-name">SnapSave</span>
</div>

<style>
    #snapsave-logo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 18px 8px 12px;
        gap: 7px;
        flex-shrink: 0;
    }

    #logo-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        overflow: hidden;
    }

    #logo-icon :global(svg) {
        width: 36px;
        height: 36px;
    }

    #brand-name {
        font-size: 9.5px;
        font-weight: 700;
        letter-spacing: 1px;
        color: var(--sidebar-highlight);
        text-transform: uppercase;
        opacity: 0.85;
        white-space: nowrap;
    }

    @media screen and (max-width: 535px) {
        #snapsave-logo {
            display: none;
        }
    }
</style>
