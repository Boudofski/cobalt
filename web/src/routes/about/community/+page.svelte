<script lang="ts">
    import { contacts } from "$lib/env";
</script>

<div id="support-page">
    <div id="support-links">
        <a class="support-link" href={contacts.github} target="_blank" rel="noopener noreferrer">
            <span class="support-label">GitHub</span>
            <span class="support-desc">open issues, contribute code, or follow the project</span>
        </a>
        <a class="support-link" href="mailto:support@snapssave.com">
            <span class="support-label">Email</span>
            <span class="support-desc">support@snapssave.com — for bugs, questions, or abuse reports</span>
        </a>
    </div>

    <div class="subtext support-note">
        if you want to report a bug or recurring issue, open an issue on GitHub. for everything else, email us — we read every message and aim to reply within 2–3 business days.
    </div>
</div>

<style>
    #support-page {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    #support-links {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .support-link {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 16px 20px;
        border-radius: var(--border-radius);
        background: var(--button);
        border: 1px solid var(--button-stroke);
        text-decoration: none;
        transition: border-color 0.2s;
    }

    .support-link:hover {
        border-color: var(--blue);
    }

    .support-label {
        font-size: 14px;
        font-weight: 600;
        color: var(--secondary);
    }

    .support-desc {
        font-size: 12.5px;
        color: var(--gray);
        line-height: 1.5;
    }

    .support-note {
        text-align: start;
        padding: 0;
    }
</style>
