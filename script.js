document.addEventListener('DOMContentLoaded', (event) => {
    // Footer configuration
    const footerConfig = {
        copyrightYear: new Date().getFullYear(),
        companyName: 'Jack Harter', // Can be different from owner if needed
        allRightsReserved: true
    };

    // Update footer content
    function updateFooter() {
        const footers = document.querySelectorAll('footer p');
        if (footers.length > 0) {
            const rightsText = footerConfig.allRightsReserved ? ' All rights reserved.' : '';
            footers.forEach(footer => {
                footer.textContent = `© ${footerConfig.copyrightYear} ${footerConfig.companyName}.${rightsText}`;
            });
        }
    }

    // Initialize footer
    updateFooter();

    const themeToggle = document.getElementById('theme-toggle');
    
    // Detect system preference if no stored preference
    const getSystemTheme = () => {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };
    
    const currentTheme = localStorage.getItem('theme') || getSystemTheme();

    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            // Announce to screen readers
            announceThemeChange('Light theme activated');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            // Announce to screen readers
            announceThemeChange('Dark theme activated');
        }
    });
    
    // Accessibility: Announce theme changes to screen readers
    function announceThemeChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }

    // Animated hero section
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroCTA = document.getElementById('hero-cta');
    
    // Determine page-specific content
    let titleText = 'Welcome to Hartr.net';
    if (document.title.includes('About')) {
        titleText = 'Jack Harter';
    } else if (document.title.includes('Contact')) {
        titleText = 'Contact Jack Harter';
    }
    
    let i = 0;
    const TYPING_SPEED_MS = 60;

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typeWriter() {
        for (; i < titleText.length; i++) {
            heroTitle.textContent += titleText.charAt(i);
            await delay(TYPING_SPEED_MS);
        }
        // Fade in subtitle after typing is done
        await delay(200);
        heroSubtitle.style.opacity = 1;
        heroSubtitle.classList.add('fade-in');
        await delay(700);
        heroCTA.style.opacity = 1;
        heroCTA.classList.add('visible');
        await delay(700);
        // Fade in content cards (all pages now use the same system)
        const contentCards = document.querySelectorAll('.card.fade-in-section');
        for (let cardIndex = 0; cardIndex < contentCards.length; cardIndex++) {
            await delay(300); // Stagger the animations
            contentCards[cardIndex].classList.add('visible');
            contentCards[cardIndex].style.opacity = 1;
        }
    }
    if (heroTitle) {
        heroTitle.textContent = '';
        setTimeout(() => { typeWriter(); }, 400);
    }
});