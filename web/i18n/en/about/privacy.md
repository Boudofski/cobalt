<script lang="ts">
    import env from "$lib/env";
    import { t } from "$lib/i18n/translations";

    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="general">
<SectionHeading
    title={$t("about.heading.general")}
    sectionId="general"
/>

SnapSave's privacy policy is simple: **we do not collect, store, or share any personal information about you.**

what you download is your business. we have no interest in tracking you, profiling you, or selling your data to anyone.

these terms apply when using the official SnapSave instance at snapssave.com.
</section>

<section id="saving">
<SectionHeading
    title={$t("about.heading.saving")}
    sectionId="saving"
/>

when you request a download, SnapSave may need to proxy or process media files on your behalf.

if that's required, a temporary tunnel is created. this tunnel holds only the minimum information needed to complete your download — such as the media URL and format — and is **permanently deleted from server memory within 90 seconds.**

we maintain a strict zero-log policy. we never write request data to disk and cannot identify individual users.

media content is never stored or cached. everything is streamed live — just like an anonymous proxy.
</section>

<section id="encryption">
<SectionHeading
    title={$t("about.heading.encryption")}
    sectionId="encryption"
/>

temporarily held tunnel data is encrypted using the **AES-256** standard.

decryption keys are included only in the download link and are never logged, cached, or stored anywhere else. only you have access to the link and the key. keys are generated fresh for every request.
</section>

<section id="local">
<SectionHeading
    title={$t("about.heading.local")}
    sectionId="local"
/>

some operations (such as merging video and audio tracks) can be performed entirely on your device using local processing.

when local processing is used, **no data leaves your device for that step.** you can check whether local processing is active in your settings.
</section>

<section id="responsibility">
<SectionHeading
    title={$t("about.heading.responsibility")}
    sectionId="responsibility"
/>

you are responsible for how you use SnapSave. please only download content that is publicly accessible and that you have the right to save.

do not use SnapSave to download private, copyrighted, or restricted content without permission.

if you have privacy or data questions, contact us at [support@snapssave.com](mailto:support@snapssave.com).
</section>
