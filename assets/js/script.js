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

    // ===== Activity Feed Integration =====
    /**
     * ActivityFeed class - Manages GitHub activity feed integration
     * Fetches, caches, and displays recent GitHub activity
     */
    class ActivityFeed {
        constructor(options = {}) {
            this.username = options.username || 'jharter1';
            this.maxItems = options.maxItems || 10;
            this.cacheKey = 'github_activity_cache';
            this.cacheDuration = options.cacheDuration || 3600000; // 1 hour default
            this.containerId = options.containerId || 'currently-card';
            this.feedUrl = `https://github.com/${this.username}.atom`;
        }

        /**
         * Initialize activity feed
         */
        async init() {
            const container = document.getElementById(this.containerId);
            if (!container) return;

            try {
                const activities = await this.fetchActivities();
                this.renderFeed(container, activities);
            } catch (error) {
                console.error('Error initializing activity feed:', error);
                this.renderError(container);
            }
        }

        /**
         * Fetch GitHub activities with caching
         * @returns {Promise<Array>} Array of activity items
         */
        async fetchActivities() {
            // Check cache first
            const cached = this.getCache();
            if (cached) {
                return cached;
            }

            // Fetch fresh data
            try {
                const response = await fetch(this.feedUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const text = await response.text();
                const activities = this.parseAtomFeed(text);
                
                // Cache the results
                this.setCache(activities);
                
                return activities;
            } catch (error) {
                console.error('Error fetching GitHub activity:', error);
                // Return cached data even if expired, or empty array
                const expiredCache = this.getCache(true);
                return expiredCache || [];
            }
        }

        /**
         * Parse GitHub Atom feed XML
         * @param {string} xmlText - Atom feed XML text
         * @returns {Array} Parsed activity items
         */
        parseAtomFeed(xmlText) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            const entries = xmlDoc.querySelectorAll('entry');
            
            const activities = [];
            entries.forEach((entry, index) => {
                if (index >= this.maxItems) return;
                
                const title = entry.querySelector('title')?.textContent || '';
                const link = entry.querySelector('link')?.getAttribute('href') || '';
                const published = entry.querySelector('published')?.textContent || '';
                const content = entry.querySelector('content')?.textContent || '';
                const id = entry.querySelector('id')?.textContent || '';
                
                // Determine activity type from title
                const type = this.determineActivityType(title);
                
                activities.push({
                    platform: 'github',
                    type: type,
                    title: title,
                    description: this.extractDescription(content, type),
                    timestamp: published,
                    url: link,
                    id: id
                });
            });
            
            return activities;
        }

        /**
         * Determine activity type from title
         * @param {string} title - Activity title
         * @returns {string} Activity type
         */
        determineActivityType(title) {
            if (title.includes('pushed to')) return 'commit';
            if (title.includes('opened pull request')) return 'pr-opened';
            if (title.includes('merged pull request')) return 'pr-merged';
            if (title.includes('opened issue')) return 'issue-opened';
            if (title.includes('closed issue')) return 'issue-closed';
            if (title.includes('starred')) return 'starred';
            if (title.includes('forked')) return 'forked';
            if (title.includes('created repository')) return 'repo-created';
            if (title.includes('created a branch')) return 'branch-created';
            return 'activity';
        }

        /**
         * Extract description from content
         * @param {string} content - Activity content HTML
         * @param {string} type - Activity type
         * @returns {string} Cleaned description
         */
        extractDescription(content, type) {
            // Remove HTML tags and clean up
            const temp = document.createElement('div');
            temp.innerHTML = content;
            let text = temp.textContent || temp.innerText || '';
            
            // Trim and limit length
            text = text.trim().substring(0, 150);
            if (text.length === 150) text += '...';
            
            return text;
        }

        /**
         * Get cached activities
         * @param {boolean} ignoreExpiry - Return expired cache if true
         * @returns {Array|null} Cached activities or null
         */
        getCache(ignoreExpiry = false) {
            try {
                const cached = localStorage.getItem(this.cacheKey);
                if (!cached) return null;
                
                const data = JSON.parse(cached);
                const now = Date.now();
                
                if (!ignoreExpiry && now - data.timestamp > this.cacheDuration) {
                    return null;
                }
                
                return data.activities;
            } catch (error) {
                console.error('Error reading cache:', error);
                return null;
            }
        }

        /**
         * Set cache with timestamp
         * @param {Array} activities - Activities to cache
         */
        setCache(activities) {
            try {
                const data = {
                    timestamp: Date.now(),
                    activities: activities
                };
                localStorage.setItem(this.cacheKey, JSON.stringify(data));
            } catch (error) {
                console.error('Error setting cache:', error);
            }
        }

        /**
         * Render activity feed in container
         * @param {HTMLElement} container - Container element
         * @param {Array} activities - Activity items to render
         */
        renderFeed(container, activities) {
            if (!activities || activities.length === 0) {
                this.renderEmpty(container);
                return;
            }

            // Update the Currently card to show feed
            const feedHTML = `
                <h2>Currently</h2>
                <div class="activity-feed-header">
                    <p>Recent GitHub Activity</p>
                    <div class="activity-filters">
                        <button class="filter-chip active" data-filter="all">All</button>
                        <button class="filter-chip" data-filter="commit">Commits</button>
                        <button class="filter-chip" data-filter="pr">PRs</button>
                        <button class="filter-chip" data-filter="issue">Issues</button>
                    </div>
                </div>
                <div class="activity-timeline">
                    ${activities.map(activity => this.renderActivityItem(activity)).join('')}
                </div>
                <div class="activity-footer">
                    <a href="https://github.com/${this.username}" target="_blank" rel="noopener noreferrer">
                        View all activity on GitHub <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            `;
            
            container.innerHTML = feedHTML;
            
            // Setup filter buttons
            this.setupFilters(container);
        }

        /**
         * Render single activity item
         * @param {Object} activity - Activity data
         * @returns {string} HTML string
         */
        renderActivityItem(activity) {
            const icon = this.getActivityIcon(activity.type);
            const timeAgo = this.getTimeAgo(activity.timestamp);
            const filterClass = this.getFilterClass(activity.type);
            
            return `
                <div class="activity-item ${filterClass}" data-type="${filterClass}">
                    <div class="activity-icon">
                        <i class="fab fa-github"></i>
                        <span class="activity-type-icon">${icon}</span>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">
                            <a href="${activity.url}" target="_blank" rel="noopener noreferrer">
                                ${this.escapeHtml(activity.title)}
                            </a>
                        </div>
                        <div class="activity-meta">
                            <span class="activity-time">${timeAgo}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        /**
         * Get filter class for activity type
         * @param {string} type - Activity type
         * @returns {string} Filter class
         */
        getFilterClass(type) {
            if (type === 'commit') return 'commit';
            if (type.includes('pr-')) return 'pr';
            if (type.includes('issue-')) return 'issue';
            return 'other';
        }

        /**
         * Get icon for activity type
         * @param {string} type - Activity type
         * @returns {string} Icon HTML
         */
        getActivityIcon(type) {
            const icons = {
                'commit': '<i class="fas fa-code-commit"></i>',
                'pr-opened': '<i class="fas fa-code-pull-request"></i>',
                'pr-merged': '<i class="fas fa-code-merge"></i>',
                'issue-opened': '<i class="fas fa-circle-dot"></i>',
                'issue-closed': '<i class="fas fa-circle-check"></i>',
                'starred': '<i class="fas fa-star"></i>',
                'forked': '<i class="fas fa-code-fork"></i>',
                'repo-created': '<i class="fas fa-plus"></i>',
                'branch-created': '<i class="fas fa-code-branch"></i>',
                'activity': '<i class="fas fa-clock"></i>'
            };
            return icons[type] || icons['activity'];
        }

        /**
         * Calculate time ago from timestamp
         * @param {string} timestamp - ISO timestamp
         * @returns {string} Human-readable time ago
         */
        getTimeAgo(timestamp) {
            const date = new Date(timestamp);
            const now = new Date();
            const seconds = Math.floor((now - date) / 1000);
            
            if (seconds < 60) return 'just now';
            if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
            if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
            if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
            return date.toLocaleDateString();
        }

        /**
         * Escape HTML to prevent XSS
         * @param {string} text - Text to escape
         * @returns {string} Escaped text
         */
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        /**
         * Setup filter button functionality
         * @param {HTMLElement} container - Container element
         */
        setupFilters(container) {
            const filterButtons = container.querySelectorAll('.filter-chip');
            const activityItems = container.querySelectorAll('.activity-item');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active state
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const filter = button.getAttribute('data-filter');
                    
                    // Filter items
                    activityItems.forEach(item => {
                        if (filter === 'all') {
                            item.style.display = '';
                        } else {
                            const itemType = item.getAttribute('data-type');
                            item.style.display = itemType === filter ? '' : 'none';
                        }
                    });
                });
            });
        }

        /**
         * Render empty state
         * @param {HTMLElement} container - Container element
         */
        renderEmpty(container) {
            container.innerHTML = `
                <h2>Currently</h2>
                <p>Working on infrastructure automation and exploring new technologies in cloud-centric disciplines. Always learning and sharing knowledge through my <a href="https://blog.hartr.net">blog</a>.</p>
                <p class="activity-status">
                    <i class="fab fa-github"></i> Check out my <a href="https://github.com/${this.username}" target="_blank" rel="noopener noreferrer">GitHub profile</a> for recent activity.
                </p>
            `;
        }

        /**
         * Render error state
         * @param {HTMLElement} container - Container element
         */
        renderError(container) {
            container.innerHTML = `
                <h2>Currently</h2>
                <p>Working on infrastructure automation and exploring new technologies in cloud-centric disciplines. Always learning and sharing knowledge through my <a href="https://blog.hartr.net">blog</a>.</p>
                <p class="activity-status activity-error">
                    <i class="fas fa-exclamation-circle"></i> Unable to load recent activity. Visit my <a href="https://github.com/${this.username}" target="_blank" rel="noopener noreferrer">GitHub profile</a> to see what I've been up to.
                </p>
            `;
        }
    }

    // Initialize activity feed on home page
    if (document.getElementById('currently-card')) {
        const activityFeed = new ActivityFeed({
            username: 'jharter1',
            maxItems: 8,
            cacheDuration: 3600000, // 1 hour
            containerId: 'currently-card'
        });
        
        // Initialize after a short delay to not block initial page load
        setTimeout(() => {
            activityFeed.init();
        }, 1000);
    }

    // ===== Geometric Background Animation =====
    /**
     * Initialize and render subtle geometric background animation
     * Features moving particles connected by lines for a network effect
     */
    function initGeometricBackground() {
        const canvas = document.getElementById('geometric-bg');
        if (!canvas) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            canvas.style.display = 'none';
            return;
        }

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId = null;

        // Configuration
        const config = {
            particleCount: 50, // Reduced for subtlety and performance
            particleSpeed: 0.3, // Slow movement
            connectionDistance: 150,
            particleRadius: 2,
            lineWidth: 1
        };

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * config.particleSpeed;
                this.vy = (Math.random() - 0.5) * config.particleSpeed;
                this.radius = config.particleRadius;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Keep particles within bounds
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = getComputedStyle(document.documentElement)
                    .getPropertyValue('--bg-animation-particle').trim();
                ctx.fill();
            }
        }

        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Initialize particles
        function initParticles() {
            particles = [];
            for (let i = 0; i < config.particleCount; i++) {
                particles.push(new Particle());
            }
        }

        // Draw connections between nearby particles
        function drawConnections() {
            const lineColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--bg-animation-line').trim();
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.connectionDistance) {
                        const opacity = (1 - (distance / config.connectionDistance)) * 0.5;
                        ctx.beginPath();
                        ctx.strokeStyle = lineColor;
                        ctx.globalAlpha = opacity;
                        ctx.lineWidth = config.lineWidth;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            drawConnections();

            animationFrameId = requestAnimationFrame(animate);
        }

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                initParticles();
            }, 250);
        });

        // Handle theme changes - update colors dynamically
        const themeObserver = new MutationObserver(() => {
            // Animation will pick up new CSS variables on next frame
        });
        themeObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Initialize
        resizeCanvas();
        initParticles();
        animate();

        // Cleanup function
        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            themeObserver.disconnect();
        };
    }

    // Initialize geometric background
    initGeometricBackground();
});
