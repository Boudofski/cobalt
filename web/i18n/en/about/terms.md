<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="general">
<SectionHeading
    title={$t("about.heading.general")}
    sectionId="general"
/>

these terms apply to users of the official SnapSave instance at snapssave.com.
by using SnapSave, you agree to these terms.
</section>

<section id="saving">
<SectionHeading
    title={$t("about.heading.saving")}
    sectionId="saving"
/>

SnapSave is a tool designed to help you save publicly accessible media from supported platforms.

**only use SnapSave to download content that is publicly available and that you have permission to save.** do not use it to download private, paywalled, or otherwise restricted content.

SnapSave's processing servers act as anonymous proxies. no content is stored on our servers — everything is processed in memory and discarded once the download is complete. we take zero liability for what the saved content is used for.
</section>

<section id="responsibility">
<SectionHeading
    title={$t("about.heading.responsibility")}
    sectionId="responsibility"
/>

you (the end user) are solely responsible for:

- what you download and how you use it.
- ensuring you have the right to download the content.
- complying with the terms of service of the source platform.
- complying with applicable copyright law in your country.

do not re-distribute, re-upload, sell, or monetise content that belongs to other creators without their explicit permission.

when using content for educational purposes, always cite sources and credit original creators.

**fair use and proper attribution benefit everyone.**
</section>

<section id="abuse">
<SectionHeading
    title={$t("about.heading.abuse")}
    sectionId="abuse"
/>

SnapSave is a privacy-first tool — we have no logging and cannot automatically detect abuse.

however, you may report concerns (including DMCA takedown requests and abuse reports) by emailing us at [support@snapssave.com](mailto:support@snapssave.com).

please include as much relevant detail as possible. we will respond to legitimate requests promptly.
</section>
