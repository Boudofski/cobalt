import { get } from "svelte/store";
import settings from "$lib/state/settings";
import { activeApiOrigin } from "$lib/api/api-fallback";

export const currentApiURL = () => {
    const processingSettings = get(settings).processing;
    const customInstanceURL = processingSettings.customInstanceURL;

    if (processingSettings.enableCustomInstances && customInstanceURL.length > 0) {
        return new URL(customInstanceURL).origin;
    }

    return get(activeApiOrigin);
}
