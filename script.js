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

    function typeWriter() {
        if (i < titleText.length) {
            heroTitle.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 60);
        } else {
            // Fade in subtitle after typing is done
            setTimeout(() => {
                heroSubtitle.style.opacity = 1;
                heroSubtitle.classList.add('fade-in');
                setTimeout(() => {
                    heroCTA.style.opacity = 1;
                    heroCTA.classList.add('visible');
                    setTimeout(() => {
                        // Fade in About Me section
                        const aboutCard = document.getElementById('about-card');
                        if (aboutCard) {
                            aboutCard.classList.add('visible');
                            aboutCard.style.opacity = 1;
                        }
                    }, 700);
                }, 700);
            }, 200);
        }
    }
    if (heroTitle) {
        heroTitle.textContent = '';
        setTimeout(typeWriter, 400);
    }
});