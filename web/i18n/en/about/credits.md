<script lang="ts">
    import { contacts, docs } from "$lib/env";
    import { t } from "$lib/i18n/translations";

    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="summary">
<SectionHeading
    title="open source"
    sectionId="summary"
/>

SnapSave is built using advanced open-source media downloading technology. Huge thanks to the developers and contributors who help build a solid, privacy-first foundation for the web.
</section>

<section id="motivation">
<SectionHeading
    title="stack"
    sectionId="motivation"
/>

the frontend is built with [SvelteKit](https://kit.svelte.dev/) and deployed on [Vercel](https://vercel.com/).

local media processing uses [ffmpeg](https://ffmpeg.org/) via WebAssembly, compiled and maintained by the [libav.js](https://github.com/Yahweasel/libav.js) project.
</section>

<section id="licenses">
<SectionHeading
    title={$t("about.heading.licenses")}
    sectionId="licenses"
/>

the SnapSave API (processing server) is licensed under [AGPL-3.0]({docs.apiLicense}).

the SnapSave frontend is licensed under [CC-BY-NC-SA 4.0]({docs.webLicense}).

the full list of dependencies is available [on GitHub]({contacts.github}).
</section>

<section id="testers">
<SectionHeading
    title={$t("about.heading.testers")}
    sectionId="testers"
/>

thank you to everyone who has tested SnapSave and provided feedback.

want to contribute or report a bug? open an issue [on GitHub]({contacts.github}) or email [support@snapssave.com](mailto:support@snapssave.com).
</section>
