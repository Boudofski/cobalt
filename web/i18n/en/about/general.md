<script lang="ts">
    import { contacts } from "$lib/env";
    import { t } from "$lib/i18n/translations";

    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="summary">
<SectionHeading
    title={$t("about.heading.summary")}
    sectionId="summary"
/>

SnapSave is a fast, free, and private social media video downloader.

paste any link from Instagram, TikTok, Facebook, Twitter/X, Pinterest, Reddit, and dozens more — and download the media instantly. no account, no tracking, no nonsense.
</section>

<section id="privacy-efficiency">
<SectionHeading
    title={$t("about.heading.privacy_efficiency")}
    sectionId="privacy-efficiency"
/>

privacy is not an afterthought at SnapSave — it's the foundation.

all requests to our backend are anonymous. we keep no logs and store no identifying information about you or your requests.

when a download requires server-side processing (such as merging tracks), the data is handled in encrypted memory and discarded within 90 seconds. it is never written to disk.

if your device supports local processing, media is handled entirely on-device — nothing leaves your browser for that step.

you can [enable tunneling](/settings/privacy#tunnel) in privacy settings to further anonymise your traffic.
</section>

<section id="motivation">
<SectionHeading
    title={$t("about.heading.motivation")}
    sectionId="motivation"
/>

SnapSave was built to give people a safe, clean alternative to the cluttered and ad-riddled downloaders that dominate the space.

we believe the best software is fast, honest, and respects its users.
</section>

<section id="community">
<SectionHeading
    title={$t("about.heading.community")}
    sectionId="community"
/>

SnapSave is built on open-source technology. you can explore the source code and contribute [on GitHub]({contacts.github}).

questions or feedback? reach out at [support@snapssave.com](mailto:support@snapssave.com).
</section>
