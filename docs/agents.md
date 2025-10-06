# Coding Agents Guide

## Project Overview
This is **jharter1.github.io** - Jack Harter's personal DevOps portfolio website hosted on GitHub Pages. The site showcases Jack's professional experience, skills, and projects in DevOps, Linux engineering, and open-source technologies.

## Project Structure
```
/
├── assets/              # Static resources
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   └── images/         # Images, icons, favicon
├── pages/              # HTML pages (except root-required)
├── docs/               # Documentation
├── .github/workflows/  # GitHub Actions
├── index.html          # Homepage (GitHub Pages root)
├── 404.html            # Custom error page (GitHub Pages root)
└── CNAME               # Custom domain config (GitHub Pages root)
```

## Technical Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (no frameworks)
- **Hosting**: GitHub Pages with custom domain
- **CI/CD**: GitHub Actions for automation
- **Version Control**: Git with feature branch workflow

## Development Guidelines

### File Organization
- **Root files**: Only `index.html`, `404.html`, and `CNAME` for GitHub Pages compatibility
- **Assets**: Organized by type in `assets/css/`, `assets/js/`, `assets/images/`
- **Pages**: All HTML pages in `pages/` directory for clean URLs
- **Documentation**: All docs in `docs/` directory

### Code Standards
- **HTML**: Semantic HTML5 with accessibility features (skip links, alt text)
- **CSS**: Custom properties for theming, mobile-first responsive design
- **JavaScript**: Vanilla JS, no dependencies, progressive enhancement
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

## Common Tasks

### Adding New Pages
1. Create HTML file in `pages/` directory
2. Use existing page template structure
3. Update navigation in all existing pages
4. Ensure relative paths are correct (`../` for assets from pages/)

### Asset Management
- **CSS**: Add to `assets/css/styles.css` or create new files
- **JS**: Add to `assets/js/script.js` or create new files  
- **Images**: Place in `assets/images/` with descriptive names

### Content Updates
- **About**: Edit `pages/about.html`
- **Contact**: Edit `pages/contact.html`
- **Homepage**: Edit `index.html`

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

### Project Reorganization (Issue #10)
- Moved from flat structure to organized directories
- All file references updated for new paths
- Maintained GitHub Pages compatibility
- Improved maintainability and professionalism

### Implemented Features
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