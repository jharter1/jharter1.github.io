# Jekyll Migration Documentation

## Overview
This site has been successfully migrated from a static HTML site to use the Jekyll static site generator framework. The migration maintains all existing functionality while implementing DRY (Don't Repeat Yourself) principles through Jekyll's templating system.

## What Changed

### Structure
- **Before**: Static HTML files with repeated header/footer/navigation code
- **After**: Jekyll templates with reusable layouts and includes

### Key Components

#### Layouts (`_layouts/`)
1. **default.html**: Base layout for most pages with header, footer, and hero section
2. **home.html**: Extends default layout for the homepage

#### Includes (`_includes/`)
1. **header.html**: Main site header with navigation and social links
2. **footer.html**: Site footer
3. **hero.html**: Animated hero section with typewriter effect

#### Configuration
- **_config.yml**: Central configuration for site metadata, navigation, and social links
- **Gemfile**: Ruby dependencies for Jekyll

### Pages
All pages have been converted to use Jekyll front matter and layouts:
- `index.html` - Homepage
- `pages/about.html` - About page
- `pages/contact.html` - Contact page
- `pages/projects.html` - Projects page
- `pages/page_two.html` - Example page
- `404.html` - Custom error page

## DRY Improvements

### Before Migration
Each page had ~100 lines of repeated code:
- Full HTML boilerplate
- Duplicate header with navigation
- Duplicate footer
- Duplicate social links
- Duplicate theme switcher

### After Migration
Pages now contain only:
- Front matter (5-10 lines)
- Page-specific content

**Example reduction**: A typical page went from ~200 lines to ~50 lines (75% reduction in code).

## Asset Management

All assets remain in their original locations:
- `/assets/css/` - Stylesheets
- `/assets/js/` - JavaScript files
- `/assets/images/` - Images and icons

Jekyll's `relative_url` filter is used throughout to ensure proper asset paths regardless of deployment environment.

## Building the Site

### Local Development
```bash
# Install dependencies
bundle install

# Build the site
bundle exec jekyll build

# Serve locally with auto-rebuild
bundle exec jekyll serve
```

### GitHub Pages Deployment
The site is automatically built and deployed via GitHub Actions when changes are pushed to the `main` branch. See `.github/workflows/jekyll.yml` for the deployment workflow.

## Configuration

### Navigation
Navigation items are defined in `_config.yml`:
```yaml
navigation:
  - title: Home
    url: /
  - title: About the Author
    url: /pages/about/
  # ...
```

### Social Links
Social media links are centralized in `_config.yml`:
```yaml
social:
  github: jharter1
  linkedin: jwharter
  blog: https://blog.hartr.net
  # ...
```

## Compatibility

### GitHub Pages
- ✅ Compatible with GitHub Pages native Jekyll support
- ✅ All permalinks work correctly
- ✅ 404 page functions properly
- ✅ Assets load from correct paths

### Features Preserved
- ✅ Responsive design
- ✅ Dark/light theme switching
- ✅ Typewriter animation
- ✅ Accessibility features (skip links, ARIA labels)
- ✅ Mobile navigation (hamburger menu)
- ✅ All page content and styling

## Maintenance Benefits

### Adding a New Page
**Before**: Copy entire HTML file, update navigation in all pages
**After**: Create file with front matter, navigation updates automatically

### Updating Header/Footer
**Before**: Edit 5+ files individually
**After**: Edit single include file

### Changing Site Configuration
**Before**: Find and replace across multiple files
**After**: Edit `_config.yml`

## Testing

All pages have been tested locally to ensure:
- ✅ Pages render correctly
- ✅ Navigation works
- ✅ Internal links function properly
- ✅ Theme switching works
- ✅ Animations function
- ✅ Responsive design maintained
- ✅ Accessibility features intact

## Future Enhancements

The Jekyll framework now enables:
- Data-driven content using `_data/` files
- Blog functionality using `_posts/`
- Collections for organizing content
- Custom plugins (if needed)
- Markdown pages for easier content authoring
- Template inheritance for specialized layouts
