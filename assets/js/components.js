/**
 * Shared HTML Components Module
 * 
 * This module provides reusable header and footer components to implement DRY principles
 * across all pages in the site. It dynamically injects common HTML structures.
 * 
 * WARNING: This is a client-side JavaScript workaround for GitHub Pages.
 * For production use, consider using Jekyll (which GitHub Pages supports natively)
 * or another static site generator for better SEO and user experience.
 * 
 * TRADEOFFS:
 * - Pros: No build process, single source of truth, easy maintenance
 * - Cons: Flash of unstyled content (FOUC), requires JavaScript, slight SEO delay
 * 
 * USAGE:
 * Add to your HTML <body> tag:
 *   data-root-page="true" (for index.html, 404.html)
 *   data-root-page="false" (for pages/*.html)
 *   data-current-page="home|about|projects|contact"
 * 
 * Then include this script before script.js:
 *   <script src="assets/js/components.js"></script>
 *   <script src="assets/js/script.js"></script>
 */

(function() {
    'use strict';
    
    /**
     * Generate the header HTML with navigation, logo, social links, and theme switcher
     * @param {boolean} isRootPage - Whether this is a root-level page (index.html, 404.html) or in pages/ subdirectory
     * @param {string} currentPage - The current page identifier (e.g., 'home', 'about', 'projects', 'contact')
     * @returns {string} Complete header HTML
     */
    function generateHeader(isRootPage, currentPage) {
        const pathPrefix = isRootPage ? '' : '../';
        const pagesPrefix = isRootPage ? 'pages/' : '';
        
        return `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header>
        <div class="logo">
            <h1>Hartr.net</h1>
        </div>
        <button class="hamburger" aria-label="Toggle navigation menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav>
            <ul>
                <li><a href="${pathPrefix}index.html"${currentPage === 'home' ? ' class="current-page"' : ''}>Home</a></li>
                <li><a href="${pagesPrefix}about.html"${currentPage === 'about' ? ' class="current-page"' : ''}>About the Author</a></li>
                <li><a href="${pagesPrefix}projects.html"${currentPage === 'projects' ? ' class="current-page"' : ''}>Projects</a></li>
                <li><a href="${pagesPrefix}contact.html"${currentPage === 'contact' ? ' class="current-page"' : ''}>Contact</a></li>
            </ul>
        </nav>
        <div class="social-links">
            <a href="https://github.com/jharter1" target="_blank" rel="noopener noreferrer" aria-label="Visit Jack's GitHub profile (opens in a new tab)">
                <i class="fab fa-github" aria-hidden="true"></i>
            </a>
            <a href="https://www.linkedin.com/in/jwharter/" target="_blank" rel="noopener noreferrer" aria-label="Visit Jack's LinkedIn profile (opens in a new tab)">
                <i class="fab fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href="https://blog.hartr.net" target="_blank" rel="noopener noreferrer" aria-label="Visit Jack's Blog (opens in a new tab)">
                <i class="fas fa-blog" aria-hidden="true"></i>
            </a>
            <a href="https://news.ycombinator.com/user?id=jhartr" target="_blank" rel="noopener noreferrer" aria-label="Visit Jack's Hacker News profile (opens in a new tab)">
                <i class="fab fa-hacker-news" aria-hidden="true"></i>
            </a>
            <a href="https://linktr.ee/jackharter" target="_blank" rel="noopener noreferrer" aria-label="Visit Jack's LinkTree page (opens in a new tab)">
                <i class="fas fa-link" aria-hidden="true"></i>
            </a>
        </div>
        <div class="theme-switcher">
            <label class="switch" for="theme-toggle">
                <span class="sr-only">Toggle between light and dark theme</span>
                <input type="checkbox" id="theme-toggle" aria-label="Toggle theme">
                <span class="slider round" aria-hidden="true"></span>
                <span class="theme-icon" aria-hidden="true">
                    <i class="fas fa-moon"></i>
                </span>
            </label>
        </div>
    </header>
    `;
    }
    
    /**
     * Generate the footer HTML
     * @returns {string} Complete footer HTML
     */
    function generateFooter() {
        return `
    <footer>
        <p>Loading...</p>
    </footer>
    `;
    }
    
    /**
     * Initialize common components on the page
     * This function injects header and footer HTML into the DOM
     */
    function initComponents() {
        try {
            // Get configuration from body data attributes
            const bodyElement = document.body;
            const isRootPage = bodyElement.getAttribute('data-root-page') === 'true';
            const currentPage = bodyElement.getAttribute('data-current-page') || '';
            
            // Check if components already exist (avoid double-injection)
            if (document.querySelector('header')) {
                console.warn('Components: Header already exists, skipping injection');
                return;
            }
            
            // Generate HTML
            const headerHTML = generateHeader(isRootPage, currentPage);
            const footerHTML = generateFooter();
            
            // Insert header at the beginning of body (before main content)
            bodyElement.insertAdjacentHTML('afterbegin', headerHTML);
            
            // Insert footer before closing body tag (after main content)
            bodyElement.insertAdjacentHTML('beforeend', footerHTML);
            
            console.log('Components: Header and footer injected successfully');
        } catch (error) {
            console.error('Components: Failed to inject header/footer', error);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
    } else {
        // DOM already loaded
        initComponents();
    }
})();

