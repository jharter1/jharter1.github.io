# GitHub Copilot Instructions

This is **jharter1.github.io** - Jack Harter's personal DevOps portfolio website built with Jekyll and hosted on GitHub Pages.

## Project Context

- **Static Site Generator**: Jekyll 4.4+ with Liquid templating
- **Hosting**: GitHub Pages with custom domain (hartr.net)
- **Tech Stack**: HTML5, CSS3, vanilla JavaScript (no frameworks)
- **CI/CD**: GitHub Actions for Jekyll build and deployment
- **Branch Strategy**: Feature branches from `main` with conventional commits

## Key Conventions

### File Organization
- Root files (`index.html`, `404.html`, `CNAME`) required for GitHub Pages
- Layouts in `_layouts/`, reusable components in `_includes/`
- Content pages in `pages/` with Jekyll front matter
- Assets organized in `assets/css/`, `assets/js/`, `assets/images/`
- Configuration in `_config.yml`, Ruby deps in `Gemfile`

### Code Standards
- **HTML**: Semantic HTML5 with WCAG accessibility features
- **CSS**: Custom properties for theming, mobile-first responsive design
- **JavaScript**: Vanilla JS only, progressive enhancement, no dependencies
- **Jekyll**: Use `{{ '/path' | relative_url }}` filter for all internal links/assets
- **Performance**: Minimize HTTP requests, optimize assets, efficient CSS/JS

### Important Features to Preserve
1. Dynamic theme system (light/dark mode with system preference detection)
2. Rotating typewriter effect in hero section
3. Responsive design (mobile-first with CSS Grid/Flexbox)
4. Accessibility features (skip links, ARIA labels, semantic markup)
5. Custom 404 page with DevOps terminal theme

## Common Patterns

### Adding New Pages
```yaml
---
layout: default
title: Page Title
hero: true  # Optional
permalink: /pages/pagename/
---
```
- Navigation auto-updates from `_config.yml`
- No need to include header/footer/navigation in page content

### Jekyll Templating
- Use Liquid syntax: `{{ variable }}`, `{% for %}`, `{% if %}`
- Always use `relative_url` filter: `{{ '/assets/css/styles.css' | relative_url }}`
- Access config values: `{{ site.title }}`, `{{ site.social.github }}`

### Testing Changes
```bash
bundle install          # Install dependencies (first time)
bundle exec jekyll serve  # Local dev server with live reload
```
Visit http://localhost:4000 to test changes

## GitHub Pages Constraints
- Static hosting only (no server-side processing)
- Jekyll builds automatically via GitHub Actions
- Must maintain compatibility with GitHub Pages Jekyll version
- Custom domain configured via CNAME file

## Comprehensive Documentation
For detailed information about project structure, common tasks, and recent changes, see:
- `docs/agents.md` - Complete coding agents guide
- `docs/JEKYLL_MIGRATION.md` - Jekyll migration documentation

## Contact
- **Owner**: Jack Harter (@jharter1)
- **Repository**: https://github.com/jharter1/jharter1.github.io
- **Live Site**: https://jharter1.github.io
