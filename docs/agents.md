# Coding Agents Guide

## Project Overview
This is **jharter1.github.io** - Jack Harter's personal DevOps portfolio website hosted on GitHub Pages. The site showcases Jack's professional experience, skills, and projects in DevOps, Linux engineering, and open-source technologies.

**Note**: This site has been migrated to use Jekyll static site generator. See `docs/JEKYLL_MIGRATION.md` for details.

## Project Structure
```
/
├── _layouts/            # Jekyll page layouts
│   ├── default.html     # Base layout with header/footer
│   ├── home.html        # Homepage layout
│   └── error.html       # 404 page layout
├── _includes/           # Reusable components
│   ├── header.html      # Site header with navigation
│   ├── header-404.html  # Simplified 404 header
│   ├── footer.html      # Site footer
│   └── hero.html        # Hero section with typewriter
├── assets/              # Static resources
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   └── images/         # Images, icons, favicon
├── pages/              # Content pages
├── docs/               # Documentation
├── .github/workflows/  # GitHub Actions
├── _config.yml         # Jekyll configuration
├── Gemfile             # Ruby dependencies
├── index.html          # Homepage (Jekyll front matter + content)
├── 404.html            # Custom error page
└── CNAME               # Custom domain config
```

## Technical Stack
- **Static Site Generator**: Jekyll 4.4+
- **Frontend**: HTML5, CSS3, JavaScript (vanilla)
- **Hosting**: GitHub Pages with custom domain
- **CI/CD**: GitHub Actions for Jekyll build and deployment
- **Version Control**: Git with feature branch workflow

## Development Guidelines

### File Organization
- **Root files**: `index.html`, `404.html`, and `CNAME` (required for GitHub Pages)
- **Jekyll structure**: Layouts in `_layouts/`, includes in `_includes/`
- **Assets**: Organized by type in `assets/css/`, `assets/js/`, `assets/images/`
- **Pages**: All content pages in `pages/` directory with Jekyll front matter
- **Documentation**: All docs in `docs/` directory
- **Config**: `_config.yml` for site-wide settings, `Gemfile` for dependencies

### Code Standards
- **HTML**: Semantic HTML5 with accessibility features (skip links, alt text)
- **CSS**: Custom properties for theming, mobile-first responsive design
- **JavaScript**: Vanilla JS, no dependencies, progressive enhancement
- **Jekyll**: Use Liquid templating, `relative_url` filter for paths
- **Performance**: Optimized for fast loading, minimal external dependencies

### GitHub Workflow
- **Branch Strategy**: Feature branches from `main`
- **Naming**: `feature/descriptive-name` for new features
- **Commits**: Conventional commits with clear descriptions
- **PRs**: Comprehensive descriptions with testing notes

### Key Features
1. **Dynamic Theme System**: Light/dark mode toggle with system preference detection
2. **Rotating Typewriter Effect**: JavaScript-powered text animation in hero section
3. **Responsive Design**: Mobile-first layout with CSS Grid/Flexbox
4. **Accessibility**: WCAG compliance with skip links, semantic markup
5. **Custom 404 Page**: DevOps-themed terminal simulation
6. **Professional Portfolio**: Showcasing DevOps skills and experience
7. **Case Study Expandables**: Detailed project case studies with expand/collapse functionality

## Common Tasks

### Adding New Pages
1. Create HTML file in `pages/` directory with Jekyll front matter:
   ```yaml
   ---
   layout: default
   title: Page Title
   hero: true  # Optional
   permalink: /pages/pagename/
   ---
   ```
2. Add page content (no need for header/footer/navigation)
3. Navigation updates automatically from `_config.yml`
4. Use `{{ '/path' | relative_url }}` for internal links

### Updating Navigation
Edit `_config.yml` and modify the `navigation` section:
```yaml
navigation:
  - title: New Page
    url: /pages/newpage/
```

### Asset Management
- **CSS**: Add to `assets/css/styles.css` or create new files
- **JS**: Add to `assets/js/script.js` or create new files  
- **Images**: Place in `assets/images/` with descriptive names
- Use Jekyll's `relative_url` filter: `{{ '/assets/...' | relative_url }}`

### Content Updates
- **About**: Edit `pages/about.html` (front matter + content only)
- **Contact**: Edit `pages/contact.html`
- **Homepage**: Edit `index.html`
- **Projects**: Edit `pages/projects.html` 
  - Add new project cards following existing structure
  - For case studies: Add `.case-study-toggle` button and `.case-study-content` section
  - Include sections: Problem Statement, Approach & Strategy, Technical Decisions, Implementation Details, Challenges & Solutions, Results & Impact, Lessons Learned

### Updating Header/Footer
- **Header**: Edit `_includes/header.html` (changes apply to all pages)
- **Footer**: Edit `_includes/footer.html`
- **404 Header**: Edit `_includes/header-404.html` (no social links)

### Building and Testing
```bash
# Install dependencies (first time)
bundle install

# Build the site
bundle exec jekyll build

# Serve locally with live reload
bundle exec jekyll serve

# View at http://localhost:4000
```

## Important Considerations

### GitHub Pages Constraints
- Static site hosting only
- No server-side processing
- Root files required for proper routing
- Custom domain via CNAME file

### Performance Priorities
- Minimize HTTP requests
- Optimize image sizes
- Use efficient CSS/JS
- Leverage browser caching

### Accessibility Requirements
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- Screen reader compatibility

## Recent Major Changes

### Jekyll Migration (Current)
- Migrated from static HTML to Jekyll static site generator
- Implemented DRY principles using layouts and includes
- Centralized configuration in `_config.yml`
- Reduced code duplication by ~75%
- Added Jekyll build/deploy GitHub Actions workflow
- All existing functionality preserved

### Project Reorganization (Issue #10)
- Moved from flat structure to organized directories
- All file references updated for new paths
- Maintained GitHub Pages compatibility
- Improved maintainability and professionalism

### Implemented Features
- ✅ Jekyll static site generator with DRY architecture
- ✅ Custom 404 page with DevOps theme (Issue #8)
- ✅ Rotating typewriter effect (Issue #16)
- ✅ Animation timing fixes (Issue #13)
- ✅ Code quality improvements (Issues #25, #26)
- ✅ Automated branch cleanup workflow

## Working with This Project

### Before Making Changes
1. Review existing structure and conventions
2. Check for open GitHub issues related to your task
3. Create feature branch from `main`
4. Test changes locally before committing

### Testing Checklist
- [ ] All pages load without errors
- [ ] Navigation links work correctly
- [ ] Assets (CSS, JS, images) load properly
- [ ] Responsive design works on mobile/desktop
- [ ] Theme toggle functionality works
- [ ] Accessibility features intact

### Pull Request Guidelines
- Use descriptive titles with conventional commit format
- Include comprehensive description of changes
- Reference any related GitHub issues
- Test all functionality before requesting review

## Future Considerations
- Consider adding build process for optimization
- Potential integration with blog.hartr.net
- Enhanced portfolio showcases
- Progressive Web App features

## Contact & Resources
- **Owner**: Jack Harter (@jharter1)
- **Repository**: https://github.com/jharter1/jharter1.github.io
- **Live Site**: https://jharter1.github.io
- **Issues**: Use GitHub Issues for bug reports and feature requests

---

*This guide helps coding agents understand the project structure, conventions, and best practices for contributing effectively to Jack Harter's portfolio website.*