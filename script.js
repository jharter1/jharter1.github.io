document.addEventListener('DOMContentLoaded', (event) => {
    // Footer configuration
    const footerConfig = {
        copyrightYear: new Date().getFullYear(),
        ownerName: 'Jack Harter',
        companyName: 'Jack Harter', // Can be different from owner if needed
        allRightsReserved: true
    };

    // Update footer content
    function updateFooter() {
        const footer = document.querySelector('footer p');
        if (footer) {
            const rightsText = footerConfig.allRightsReserved ? ' All rights reserved.' : '';
            footer.textContent = `© ${footerConfig.copyrightYear} ${footerConfig.companyName}.${rightsText}`;
        }
    }

    // Initialize footer
    updateFooter();

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
        // Fade in About Me section (home page) or content cards (other pages)
        const aboutCard = document.getElementById('about-card');
        if (aboutCard) {
            aboutCard.classList.add('visible');
            aboutCard.style.opacity = 1;
        } else {
            // Animate content cards on other pages
            const contentCards = document.querySelectorAll('.card.fade-in-section');
            for (let i = 0; i < contentCards.length; i++) {
                await delay(300); // Stagger the animations
                contentCards[i].classList.add('visible');
                contentCards[i].style.opacity = 1;
            }
        }
    }
    if (heroTitle) {
        heroTitle.textContent = '';
        setTimeout(() => { typeWriter(); }, 400);
    }
});