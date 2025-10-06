document.addEventListener('DOMContentLoaded', (event) => {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Animated hero section
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroCTA = document.getElementById('hero-cta');
    const titleText = 'Welcome to Hartr.net';
    let i = 0;
    const TYPING_SPEED_MS = 60;

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typeWriter() {
        for (; i < titleText.length; i++) {
            heroTitle.textContent += titleText.charAt(i);
            await delay(60);
        }
        // Fade in subtitle after typing is done
        await delay(200);
        heroSubtitle.style.opacity = 1;
        heroSubtitle.classList.add('fade-in');
        await delay(700);
        heroCTA.style.opacity = 1;
        heroCTA.classList.add('visible');
        await delay(700);
        // Fade in About Me section
        const aboutCard = document.getElementById('about-card');
        if (aboutCard) {
            aboutCard.classList.add('visible');
            aboutCard.style.opacity = 1;
        }
    }
    if (heroTitle) {
        heroTitle.textContent = '';
        setTimeout(() => { typeWriter(); }, 400);
    }
});