import { writable, derived, get } from "svelte/store";
import env from "$lib/env";

const buildFallbackList = () => {
    const candidates = [
        env.DEFAULT_API ?? "https://co.wuk.sh",
        "https://api-cobalt.ishard.site",
        "https://dl.khyernet.xyz",
    ];

    const seen = new Set<string>();
    const result: string[] = [];

    for (const url of candidates) {
        try {
            const origin = new URL(url).origin;
            if (!seen.has(origin)) {
                seen.add(origin);
                result.push(origin);
            }
        } catch {
            // skip malformed URLs
        }
    }

    return result;
};

export const fallbackUrls = buildFallbackList();

const activeIndex = writable(0);

export const activeApiOrigin = derived(activeIndex, i => fallbackUrls[i] ?? fallbackUrls[0]);

export const tryNextApi = (): boolean => {
    const current = get(activeIndex);
    if (current < fallbackUrls.length - 1) {
        activeIndex.set(current + 1);
        return true;
    }
    return false;
};

export const resetApiIndex = () => activeIndex.set(0);
