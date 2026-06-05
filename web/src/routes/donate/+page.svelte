<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { t } from "$lib/i18n/translations";

    onMount(() => {
        goto("/", { replaceState: true });
    });
</script>

<svelte:head>
    <title>{$t("tabs.donate")} ~ {$t("general.cobalt")}</title>
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div style="display:none">
    <p>Redirecting...</p>
</div>
