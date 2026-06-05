<script>
    import { onMount } from 'svelte';
    let scrolled = false;

    onMount(() => {
        const handleScroll = () => {
            scrolled = window.scrollY > 20;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<nav class="home-nav" class:scrolled>
    <div class="nav-in">
        <a href="/" class="nav-brand">
            <div class="brand-icon">
                <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" rx="8" fill="url(#nav-g)"/>
                    <path d="M14 5L11 13H7L14 22L21 13H17L14 5Z" fill="white"/>
                    <defs>
                        <linearGradient id="nav-g" x1="0" y1="0" x2="28" y2="28">
                            <stop stop-color="#3B82F6"/>
                            <stop offset="1" stop-color="#6366F1"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <span class="brand-name">SnapSave</span>
        </a>

        <div class="nav-links">
            <a href="#popular-sec">Platforms</a>
            <a href="#how-sec">How it works</a>
            <a href="/blog">Blog</a>
            <a href="/about">About</a>
        </div>

        <div class="nav-cta">
            <a href="/settings" class="settings-btn" title="Settings">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path></svg>
            </a>
            <a href="#downloader-wrap" class="nav-btn">Start Downloading</a>
        </div>
    </div>
</nav>

<style>
    .home-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 var(--padding);
        transition: all 0.3s ease;
        border-bottom: 1px solid transparent;
    }

    .home-nav.scrolled {
        background: rgba(3, 3, 7, 0.8);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        height: 64px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    :global([data-theme="light"]) .home-nav.scrolled {
        background: rgba(255, 255, 255, 0.8);
        border-bottom: 1px solid rgba(15, 23, 42, 0.08);
    }

    .nav-in {
        width: 100%;
        max-width: 1200px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .nav-brand {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
    }

    .brand-icon {
        width: 32px;
        height: 32px;
    }

    .brand-name {
        font-family: 'Outfit', sans-serif;
        font-size: 18px;
        font-weight: 800;
        color: white;
        letter-spacing: -0.5px;
    }

    :global([data-theme="light"]) .brand-name {
        color: #0F172A;
    }

    .nav-links {
        display: flex;
        align-items: center;
        gap: 32px;
    }

    .nav-links a {
        font-size: 14px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        transition: color 0.2s;
    }

    .nav-links a:hover {
        color: white;
    }

    :global([data-theme="light"]) .nav-links a {
        color: rgba(15, 23, 42, 0.6);
    }

    :global([data-theme="light"]) .nav-links a:hover {
        color: #0F172A;
    }

    .nav-cta {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .settings-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        color: rgba(255, 255, 255, 0.5);
        transition: all 0.2s;
    }

    :global([data-theme="light"]) .settings-btn {
        color: rgba(15, 23, 42, 0.5);
    }

    .settings-btn:hover {
        background: rgba(255, 255, 255, 0.05);
        color: white;
    }

    :global([data-theme="light"]) .settings-btn:hover {
        background: rgba(15, 23, 42, 0.05);
        color: #0F172A;
    }

    .settings-btn svg {
        width: 20px;
        height: 20px;
    }

    .nav-btn {
        padding: 10px 20px;
        border-radius: 12px;
        background: #3B82F6;
        color: white;
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.2s;
    }

    .nav-btn:hover {
        background: #2563EB;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    @media screen and (max-width: 768px) {
        .nav-links {
            display: none;
        }
        .nav-btn {
            display: none;
        }
    }
</style>
