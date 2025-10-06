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
                footer.textContent = `\u00A9 ${footerConfig.copyrightYear} ${footerConfig.companyName}.${rightsText}`;
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

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            const isExpanded = nav.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
            
            // Announce menu state to screen readers
            const menuState = isExpanded ? 'Menu opened' : 'Menu closed';
            announceThemeChange(menuState);
            
            // Prevent body scroll when menu is open
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking navigation links
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                hamburger.focus(); // Return focus to hamburger button
            }
        });
    }

    // Animated hero section
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroCTA = document.getElementById('hero-cta');
    const cursor = document.getElementById('cursor');
    
    // Determine page-specific content
    let titlePhrases = ['Welcome to Hartr.net'];
    let isHomePage = true;
    
    if (document.title.includes('About')) {
        titlePhrases = ['Jack Harter'];
        isHomePage = false;
    } else if (document.title.includes('Contact')) {
        titlePhrases = ['Contact Jack Harter'];
        isHomePage = false;
    } else if (document.title.includes('Projects')) {
        titlePhrases = ['My Projects'];
        isHomePage = false;
    } else {
        // Homepage - rotating professional phrases
        titlePhrases = [
            'DevOps Engineer',
            'Linux Lover',
            'Automation Striver',
            'Infrastructure Builder',
            'CI/CD Designer',
            'Occasional Podcaster',
            'Tech Blogger',
            'Continuous Improvement Zealot',
            'Wicked Problem Solver',
            'Cloud Navigator',
            'Network Nomad',
            'Silo Buster',
            'GitOps Practitioner',
            'Collaboration Champion',
            'Wait, are you still reading this?',
            'I didn\'t think anyone would get this far!',
            'Alright, Back to Work!',
            'Making the Complex Simpler',
            'Building Reliable Systems',
            'System Automation Appreciator',
            'Newbie Mentor',
            'Friend to the Terminal',
            'Coffee Enthusiast',
            'Tmux Tinkerer',
            'Vim VVizard',
            'Docker Dabbler',
            'Terraform Taskmaster',
            'GitHub Gardener',
            'Wireless Wonk',
            'Cat Herder',
            'Biking Enthusiast',
            'Avid Reader',
            'Meetup Regular',
            'You can feel free to check out other pages too!',
            'Thanks for stopping by!',
            'Have a great day!',
            'Keep on Hacking!',
            // Add more phrases as desired
        ];
    }
    
    let currentPhraseIndex = 0;
    let i = 0;
    const TYPING_SPEED_MS = 60;
    const PHRASE_PAUSE_MS = 2000; // Pause between phrases
    const DELETE_SPEED_MS = 30;   // Faster deletion

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typePhrase(phrase) {
        // Type the phrase
        for (let j = 0; j < phrase.length; j++) {
            const currentText = phrase.substring(0, j + 1);
            heroTitle.innerHTML = currentText + '<span id="cursor" class="cursor">|</span>';
            await delay(TYPING_SPEED_MS);
        }
    }

    async function deletePhrase() {
        // Delete the current phrase
        const currentText = heroTitle.textContent.replace('|', '');
        for (let j = currentText.length; j > 0; j--) {
            const newText = currentText.substring(0, j - 1);
            heroTitle.innerHTML = newText + '<span id="cursor" class="cursor">|</span>';
            await delay(DELETE_SPEED_MS);
        }
    }

    async function typeWriter() {
        if (isHomePage && titlePhrases.length > 1) {
            // Homepage: cycle through phrases
            while (true) {
                const currentPhrase = titlePhrases[currentPhraseIndex];
                await typePhrase(currentPhrase);
                await delay(PHRASE_PAUSE_MS);
                await deletePhrase();
                await delay(500); // Brief pause before next phrase
                
                currentPhraseIndex = (currentPhraseIndex + 1) % titlePhrases.length;
            }
        } else {
            // Other pages: single phrase
            
            // Set content for subtitle and CTA based on page (while still hidden)
            if (document.title.includes('About')) {
                heroSubtitle.textContent = 'DevOps and Linux Engineer';
                heroCTA.textContent = 'Get in touch';
                heroCTA.href = 'contact.html';
            } else if (document.title.includes('Contact')) {
                heroSubtitle.textContent = 'Get in touch with me';
                heroCTA.textContent = 'Learn about me';
                heroCTA.href = 'about_the_author.html';
            }
            
            const phrase = titlePhrases[0];
            await typePhrase(phrase);
            
            // Continue with original animation sequence
            await delay(200);
            heroSubtitle.classList.add('show');
            await delay(700);
            heroCTA.classList.add('show');
            await delay(700);
            // Fade in content cards (all pages now use the same system)
            const contentCards = document.querySelectorAll('.card.fade-in-section, .project-card.fade-in-section');
            for (let cardIndex = 0; cardIndex < contentCards.length; cardIndex++) {
                await delay(300); // Stagger the animations
                contentCards[cardIndex].classList.remove('card-hidden');
                contentCards[cardIndex].classList.add('visible');
            }
        }
    }
    
    // Trigger card animations for homepage after first phrase completes
    async function triggerHomePageAnimations() {
        await delay(TYPING_SPEED_MS * titlePhrases[0].length + PHRASE_PAUSE_MS + 200);
        
        // Fade in subtitle and CTA
        heroSubtitle.classList.add('show');
        await delay(700);
        heroCTA.classList.add('show');
        await delay(700);
        
        // Fade in content cards
        const contentCards = document.querySelectorAll('.card.fade-in-section');
        for (let cardIndex = 0; cardIndex < contentCards.length; cardIndex++) {
            await delay(300);
            contentCards[cardIndex].classList.remove('card-hidden');
            contentCards[cardIndex].classList.add('visible');
        }
    }
    
    if (heroTitle) {
        heroTitle.innerHTML = '<span id="cursor" class="cursor">|</span>';
        setTimeout(() => { 
            typeWriter();
            if (isHomePage && titlePhrases.length > 1) {
                triggerHomePageAnimations();
            }
        }, 400);
    }

    // Sticky header with shrinking animation
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add or remove scrolled class based on scroll position
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', onScroll, { passive: true });

    // Timeline expand/collapse functionality
    const timelineHeaders = document.querySelectorAll('.timeline-header');

    timelineHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const details = this.parentElement.querySelector('.timeline-details');
            const toggle = this.querySelector('.timeline-toggle');

            if (details && toggle) {
                const isExpanded = details.classList.toggle('expanded');
                toggle.classList.toggle('expanded');

                // Update aria-expanded for accessibility
                this.setAttribute('aria-expanded', isExpanded.toString());
            }
        });

        // Add keyboard support
        header.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make it focusable
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
    });

    // Skills filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCategories = document.querySelectorAll('.skill-category');

    if (filterButtons.length > 0 && skillCategories.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Get filter value
                const filterValue = button.getAttribute('data-filter');

                // Filter skill categories
                skillCategories.forEach(category => {
                    if (filterValue === 'all') {
                        category.classList.remove('hidden');
                    } else {
                        const categoryValue = category.getAttribute('data-category');
                        if (categoryValue === filterValue) {
                            category.classList.remove('hidden');
                        } else {
                            category.classList.add('hidden');
                        }
                    }
                });

                // Announce filter change to screen readers
                announceThemeChange(`Filtered to ${filterValue === 'all' ? 'all skills' : filterValue + ' skills'}`);
            });
        });
    }
});
