/**
 * Main application initialization
 * Handles theme switching, navigation, hero animations, and scroll effects
 */
document.addEventListener('DOMContentLoaded', (event) => {
    // ===== Footer Configuration =====
    const footerConfig = {
        copyrightYear: new Date().getFullYear(),
        companyName: 'Jack Harter',
        allRightsReserved: true
    };

    /**
     * Update footer with current year and copyright info
     */
    function updateFooter() {
        const footers = document.querySelectorAll('footer p');
        if (footers.length > 0) {
            const rightsText = footerConfig.allRightsReserved ? ' All rights reserved.' : '';
            footers.forEach(footer => {
                footer.textContent = `\u00A9 ${footerConfig.copyrightYear} ${footerConfig.companyName}.${rightsText}`;
            });
        }
    }

    updateFooter();

    // ===== Theme Management =====
    const themeToggle = document.getElementById('theme-toggle');
    
    /**
     * Get system theme preference
     * @returns {string} 'light' or 'dark'
     */
    const getSystemTheme = () => {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };
    
    // Apply saved or system theme
    const currentTheme = localStorage.getItem('theme') || getSystemTheme();

    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            announceThemeChange('Light theme activated');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            announceThemeChange('Dark theme activated');
        }
    });
    
    /**
     * Announce changes to screen readers for accessibility
     * @param {string} message - Message to announce
     */
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

    // ===== Hamburger Menu =====
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            
            const isExpanded = nav.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
            announceThemeChange(isExpanded ? 'Menu opened' : 'Menu closed');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? 'hidden' : '';
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
                hamburger.focus();
            }
        });
    }

    // ===== Hero Section Typewriter Animation =====
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroCTA = document.getElementById('hero-cta');
    const cursor = document.getElementById('cursor');
    
    /**
     * Page configuration map - centralizes page-specific content
     * Eliminates duplicate title checks throughout the code
     */
    const PAGE_CONFIGS = {
        'About': {
            titlePhrases: ['Jack Harter'],
            subtitle: 'DevOps and Linux Engineer',
            ctaText: 'Get in touch',
            ctaHref: 'contact.html',
            isHomePage: false
        },
        'Contact': {
            titlePhrases: ['Contact Jack Harter'],
            subtitle: 'Get in touch with me',
            ctaText: 'Learn about me',
            ctaHref: 'about.html',
            isHomePage: false
        },
        'Projects': {
            titlePhrases: ['My Projects'],
            subtitle: 'Explore my work',
            ctaText: 'Get in touch',
            ctaHref: 'contact.html',
            isHomePage: false
        },
        'Home': {
            titlePhrases: [
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
                'Keep on Hacking!'
            ],
            subtitle: 'Welcome to my corner of the internet',
            ctaText: 'Learn more about me',
            ctaHref: 'pages/about.html',
            isHomePage: true
        }
    };
    
    /**
     * Get page configuration based on document title
     * @returns {Object} Configuration object for current page
     */
    function getPageConfig() {
        for (const [pageName, config] of Object.entries(PAGE_CONFIGS)) {
            if (document.title.includes(pageName)) {
                return config;
            }
        }
        return PAGE_CONFIGS['Home']; // Default to home
    }
    
    const pageConfig = getPageConfig();
    let titlePhrases = pageConfig.titlePhrases;
    let isHomePage = pageConfig.isHomePage;
    
    let currentPhraseIndex = 0;
    let i = 0;
    
    // Animation timing constants
    const TYPING_SPEED_MS = 60;
    const PHRASE_PAUSE_MS = 2000;
    const DELETE_SPEED_MS = 30;

    /**
     * Delay helper for async timing
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise} Resolves after delay
     */
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Type out a phrase character by character
     * @param {string} phrase - The phrase to type
     */
    async function typePhrase(phrase) {
        for (let j = 0; j < phrase.length; j++) {
            const currentText = phrase.substring(0, j + 1);
            heroTitle.innerHTML = currentText + '<span id="cursor" class="cursor">|</span>';
            await delay(TYPING_SPEED_MS);
        }
    }

    /**
     * Delete the current phrase character by character
     */
    async function deletePhrase() {
        const currentText = heroTitle.textContent.replace('|', '');
        for (let j = currentText.length; j > 0; j--) {
            const newText = currentText.substring(0, j - 1);
            heroTitle.innerHTML = newText + '<span id="cursor" class="cursor">|</span>';
            await delay(DELETE_SPEED_MS);
        }
    }

    /**
     * Configure hero section content for non-home pages
     * Sets subtitle, CTA text, and CTA href from page config
     */
    function configureHeroContent() {
        if (!isHomePage && heroSubtitle && heroCTA) {
            heroSubtitle.textContent = pageConfig.subtitle;
            heroCTA.textContent = pageConfig.ctaText;
            heroCTA.href = pageConfig.ctaHref;
        }
    }
    
    /**
     * Animate hero subtitle and CTA reveal with fade-in effect
     */
    async function animateHeroElements() {
        await delay(200);
        if (heroSubtitle) heroSubtitle.classList.add('show');
        await delay(700);
        if (heroCTA) heroCTA.classList.add('show');
    }

    /**
     * Main typewriter animation controller
     * Handles both looping (homepage) and single-phrase (other pages) modes
     */
    async function typeWriter() {
        if (isHomePage && titlePhrases.length > 1) {
            // Homepage: cycle through phrases indefinitely
            while (true) {
                const currentPhrase = titlePhrases[currentPhraseIndex];
                await typePhrase(currentPhrase);
                await delay(PHRASE_PAUSE_MS);
                await deletePhrase();
                await delay(500);
                
                currentPhraseIndex = (currentPhraseIndex + 1) % titlePhrases.length;
            }
        } else {
            // Other pages: type single phrase and show hero elements
            configureHeroContent();
            const phrase = titlePhrases[0];
            await typePhrase(phrase);
            await animateHeroElements();
        }
    }
    
    /**
     * Trigger hero animations for homepage after first phrase completes
     */
    async function triggerHomePageAnimations() {
        await delay(TYPING_SPEED_MS * titlePhrases[0].length + PHRASE_PAUSE_MS + 200);
        await animateHeroElements();
    }
    
    // Initialize typewriter animation
    if (heroTitle) {
        heroTitle.innerHTML = '<span id="cursor" class="cursor">|</span>';
        setTimeout(() => { 
            typeWriter();
            if (isHomePage && titlePhrases.length > 1) {
                triggerHomePageAnimations();
            }
        }, 400);
    }

    // ===== Sticky Header with Scroll Effects =====
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let ticking = false;

    /**
     * Update header style based on scroll position
     */
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        ticking = false;
    }

    /**
     * Request animation frame for scroll handler (performance optimization)
     */
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ===== Scroll-Triggered Animations =====
    /**
     * Setup Intersection Observer for card animations
     * Cards fade in as they enter the viewport
     */
    function setupScrollAnimations() {
        // Fallback for browsers without Intersection Observer support
        if (!('IntersectionObserver' in window)) {
            const allCards = document.querySelectorAll('.card.fade-in-section, .project-card.fade-in-section');
            allCards.forEach(card => {
                card.classList.remove('card-hidden');
                card.classList.add('visible');
            });
            return;
        }

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const cards = document.querySelectorAll('.card.fade-in-section, .project-card.fade-in-section');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const delay = prefersReducedMotion ? 0 : index * 100;
                    
                    setTimeout(() => {
                        card.classList.remove('card-hidden');
                        card.classList.add('visible');
                    }, delay);
                    
                    observer.unobserve(card);
                }
            });
        }, observerOptions);

        cards.forEach(card => observer.observe(card));
    }

    setTimeout(setupScrollAnimations, 100);

    // ===== Timeline Expand/Collapse =====
    const timelineHeaders = document.querySelectorAll('.timeline-header');

    timelineHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const details = this.parentElement.querySelector('.timeline-details');
            const toggle = this.querySelector('.timeline-toggle');

            if (details && toggle) {
                const isExpanded = details.classList.toggle('expanded');
                toggle.classList.toggle('expanded');
                this.setAttribute('aria-expanded', isExpanded.toString());
            }
        });

        // Keyboard support
        header.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
    });

    // ===== Case Study Toggle =====
    const caseStudyToggles = document.querySelectorAll('.case-study-toggle');
    
    caseStudyToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const contentId = this.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                // Collapse
                this.setAttribute('aria-expanded', 'false');
                content.setAttribute('hidden', '');
                this.innerHTML = '<i class="fas fa-chevron-down"></i> View Case Study';
                
                // Scroll to card if partially off screen
                setTimeout(() => {
                    const cardRect = this.closest('.project-card').getBoundingClientRect();
                    if (cardRect.top < 100) {
                        this.closest('.project-card').scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }, 100);
            } else {
                // Expand
                this.setAttribute('aria-expanded', 'true');
                content.removeAttribute('hidden');
                this.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Case Study';
            }
        });
    });
    
    // ===== Skills Filtering =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCategories = document.querySelectorAll('.skill-category');

    if (filterButtons.length > 0 && skillCategories.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                
                // Filter skill categories
                skillCategories.forEach(category => {
                    if (filterValue === 'all') {
                        category.classList.remove('hidden');
                    } else {
                        const categoryValue = category.getAttribute('data-category');
                        category.classList.toggle('hidden', categoryValue !== filterValue);
                    }
                });

                // Announce to screen readers
                announceThemeChange(`Filtered to ${filterValue === 'all' ? 'all skills' : filterValue + ' skills'}`);
            });
        });
    }
});
