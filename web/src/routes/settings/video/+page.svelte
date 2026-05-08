<script lang="ts">
    import { t } from "$lib/i18n/translations";

    import { videoQualityOptions } from "$lib/types/settings";

    import SettingsCategory from "$components/settings/SettingsCategory.svelte";
    import Switcher from "$components/buttons/Switcher.svelte";
    import SettingsButton from "$components/buttons/SettingsButton.svelte";
    import SettingsToggle from "$components/buttons/SettingsToggle.svelte";
</script>

<SettingsCategory
    sectionId="quality"
    title={$t("settings.video.quality")}
>
    <Switcher big={true} description={$t("settings.video.quality.description")}>
        {#each videoQualityOptions as value}
            <SettingsButton
                settingContext="save"
                settingId="videoQuality"
                settingValue={value}
            >
                {$t(`settings.video.quality.${value}`)}
            </SettingsButton>
        {/each}
    </Switcher>
</SettingsCategory>

<SettingsCategory sectionId="h265" title={$t("settings.video.h265")}>
    <SettingsToggle
        settingContext="save"
        settingId="allowH265"
        title={$t("settings.video.h265.title")}
        description={$t("settings.video.h265.description")}
    />
</SettingsCategory>

<SettingsCategory sectionId="convert-gif" title={$t("settings.video.twitter.gif")}>
    <SettingsToggle
        settingContext="save"
        settingId="convertGif"
        title={$t("settings.video.twitter.gif.title")}
        description={$t("settings.video.twitter.gif.description")}
    />
</SettingsCategory>

