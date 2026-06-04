<script>
    /** Real platform brand icons — white SVG on themed background.
     *  The background colour/gradient is applied by the parent via
     *  class="picon picon-{platform}" so gradient IDs never conflict. */
    export let platform = '';
    export let size = 24;
</script>

{#if platform === 'instagram'}
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
     stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/>
    <circle cx="12" cy="12" r="4.5"/>
    <circle cx="17" cy="7" r="1.3" fill="white" stroke="none"/>
</svg>

{:else if platform === 'tiktok'}
<svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5
             2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01
             a6.27 6.27 0 0 0-.79-.05 6.27 6.27 0 0 0-6.27 6.27 6.27 6.27 0 0 0 6.27 6.27
             6.27 6.27 0 0 0 6.27-6.27V9a8.1 8.1 0 0 0 4.84 1.6V7.12a4.87 4.87 0 0 1-1-.43z"/>
</svg>

{:else if platform === 'facebook'}
<svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M13.5 21V14h2.46l.38-3H13.5V9.5c0-.87.24-1.5 1.5-1.5H17V5.35A20 20 0 0 0 14.6 5
             c-2.58 0-4.35 1.58-4.35 4.5V11H8v3h2.25v7H13.5z"/>
</svg>

{:else if platform === 'twitter'}
<svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68
             l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
</svg>

{:else if platform === 'pinterest'}
<svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-2.02.03-2.87
             .19-.81 1.28-5.44 1.28-5.44s-.33-.54-.33-1.35c0-1.27.73-2.22 1.65-2.22.77 0
             1.15.58 1.15 1.28 0 .78-.5 1.95-.76 3.03-.22.91.45 1.65 1.34 1.65 1.6 0
             2.83-1.7 2.83-4.13 0-2.16-1.55-3.67-3.77-3.67-2.57 0-4.07 1.93-4.07 3.92
             0 .78.3 1.6.67 2.06.07.09.08.17.06.26-.07.27-.22.91-.25 1.03-.04.17-.14.2
             -.32.12-1.16-.54-1.88-2.23-1.88-3.6 0-2.93 2.13-5.62 6.14-5.62 3.22 0 5.72
             2.3 5.72 5.35 0 3.2-2.01 5.76-4.8 5.76-.94 0-1.82-.48-2.12-1.06l-.57 2.14
             c-.21.8-.78 1.8-1.15 2.41.58.18 1.2.28 1.83.28C17.52 22 22 17.52 22 12S17.52 2 12 2z"/>
</svg>

{:else if platform === 'reddit'}
<svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.43 9.3
             c.02.23.03.47.03.7 0 3.59-4.19 6.5-9.36 6.5S2.74 15.59 2.74 12c0-.23.01-.47.03-.7
             a1.75 1.75 0 0 1-.52-3.17c.9-3.13 4.08-5.13 7.75-5.13s6.85 2 7.75 5.13a1.75 1.75
             0 0 1-.32 3.17zm-9.67-.3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm4.48 0a1.5 1.5
             0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.24 4c1.16 0 2.1-.5 2.1-1.1H7.9c0 .6.95 1.1 2.1 1.1z"/>
</svg>

{:else if platform === 'snapchat'}
<svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M12 2c-2.9 0-5.25 2.36-5.25 5.27 0 .68-.03 1.13-.03 1.7a1.6 1.6 0 0 1-.6.13
             c-.43 0-.82-.22-1.05-.22 0 0-.04.47.54.79-.3.04-.87.04-1.46.25-.57.21-.47.52
             -.47.52s.32.1.7.1c.36 0 .76-.1.97-.17.2-.07.97.6 1.74.67.78.07 1.49-.6 2.24-.6
             .76 0 1.46.67 2.24.6.77-.07 1.54-.74 1.74-.67.21.07.6.17.97.17.38 0 .7-.1.7-.1
             s.1-.31-.47-.52c-.59-.21-1.16-.21-1.46-.25.58-.32.54-.79.54-.79-.23 0-.62.22
             -1.05.22a1.6 1.6 0 0 1-.6-.13c0-.57-.03-1.02-.03-1.7C17.25 4.36 14.9 2 12 2z"/>
</svg>

{:else if platform === 'vimeo'}
<svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M22 7.42c-.09 1.99-1.47 4.72-4.15 8.18-2.77 3.6-5.12 5.4-7.03 5.4-1.19 0
             -2.19-1.1-3-3.3L6.18 12c-.61-2.2-1.26-3.3-1.95-3.3-.15 0-.68.32-1.6.96L2 8.39
             c1.01-.89 2-1.77 2.98-2.65C6.3 4.61 7.3 4 8 3.93c1.58-.15 2.56.93 2.93 3.26
             .4 2.52.67 4.07.83 4.68.46 2.08.97 3.12 1.51 3.12.43 0 1.07-.68 1.93-2.03
             .86-1.36 1.3-2.39 1.37-3.09.12-1.16-.33-1.74-1.37-1.74-.49 0-.99.1-1.51.33
             1.01-3.28 2.91-4.88 5.74-4.79 2.1.05 3.09 1.41 2.97 4.09 0 0-.01.02-.01.04z"/>
</svg>

{:else if platform === 'soundcloud'}
<svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M2 13.5A2.5 2.5 0 0 0 4.5 16h14A3.5 3.5 0 0 0 22 12.5a3.5 3.5 0 0 0-3-3.46
             A5 5 0 0 0 9.5 9a2.5 2.5 0 0 0-2.45 2H4.5A2.5 2.5 0 0 0 2 13.5zM2 13.5"/>
</svg>

{:else if platform === 'bluesky'}
<svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.5 14.5
             c-.8.8-1.8 1.2-3 1.2s-2.2-.4-3-1.2c-.8-.8-1.2-1.8-1.2-3 0-.8.2-1.5.6-2.1
             L7 9.5l1.5-1.5 1.9 1.9c.5-.2 1-.3 1.6-.3s1.1.1 1.6.3L15.5 8l1.5 1.5-1.9 1.9
             c.4.6.6 1.3.6 2.1 0 1.2-.4 2.2-1.2 3z"/>
</svg>

{:else}
<!-- Fallback: simple download icon -->
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
     stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3v13M6 11l6 6 6-6"/>
    <path d="M5 20h14"/>
</svg>
{/if}

<style>
    svg { display: block; flex-shrink: 0; }
</style>
