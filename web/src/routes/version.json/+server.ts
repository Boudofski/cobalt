import { json } from "@sveltejs/kit";
import { getCommit, getBranch, getRemote, getVersion } from "@imput/version-info";

const tryGet = async (fn: () => Promise<string | undefined>) => {
    try { return await fn(); } catch { return null; }
};

export async function GET() {
    return json({
        commit: await tryGet(getCommit),
        branch: await tryGet(getBranch),
        remote: await tryGet(getRemote),
        version: await tryGet(getVersion)
    });
}

export const prerender = true;
