# DRY Principles Implementation for HTML Pages

## Executive Summary

This document provides recommendations and an example implementation for reducing code duplication in HTML pages while maintaining compatibility with GitHub Pages hosting.

**Recommendation**: Use a static site generator (Jekyll preferred for GitHub Pages native support, or 11ty for flexibility) for the best long-term maintainability. A working client-side JavaScript solution is also provided as an alternative.

## Problem Statement

The HTML pages in this repository contain significant code duplication. Each page includes identical:
- `<head>` metadata and links (favicon, Font Awesome, styles.css)
- Header structure (logo, navigation, social links, theme switcher) - ~57 lines
- Footer structure - ~3 lines
- JavaScript includes

**Impact**: Changes to the header or footer require updating 5+ files, increasing maintenance burden and error risk.

## Constraints

This project is hosted on **GitHub Pages**, which provides:
- ✅ Static site hosting
- ✅ Native Jekyll support (no setup required)
- ❌ No custom server-side processing (PHP, Node.js backend, etc.)
- ❌ No server-side includes (SSI) for plain HTML
- ❌ No build process currently (by design choice)

## Solution Options

### Option 1: Static Site Generator (RECOMMENDED)

#### 1A: Jekyll (GitHub Pages Native Support)

**Pros:**
- ✅ Built into GitHub Pages - zero configuration
- ✅ No local build required - GitHub builds automatically
- ✅ True DRY with layouts and includes
- ✅ No JavaScript dependency for rendering
- ✅ No FOUC (Flash of Unstyled Content)
- ✅ Better SEO (server-rendered HTML)
- ✅ Industry standard for GitHub Pages sites

**Cons:**
- ⚠️ Requires renaming `.html` files to `.md` or `.html` with front matter
- ⚠️ Learning curve for Liquid templating
- ⚠️ Ruby-based (but not needed locally with GitHub Pages)

**Implementation:**
```
/_layouts/
  default.html    # Main layout with header/footer
/_includes/
  header.html     # Reusable header component
  footer.html     # Reusable footer component
/pages/
  about.md        # Content pages with front matter
_config.yml       # Jekyll configuration
```

**Effort**: ~2-4 hours to convert existing site

#### 1B: 11ty (Modern Alternative)

**Pros:**
- ✅ Modern, fast, flexible
- ✅ JavaScript-based (Node.js)
- ✅ Multiple template languages (Nunjucks, Liquid, etc.)
- ✅ True DRY with layouts
- ✅ No FOUC or JavaScript dependency

**Cons:**
- ⚠️ Requires local build process
- ⚠️ Need to commit built files to GitHub Pages
- ⚠️ Additional setup complexity

**Effort**: ~4-6 hours to set up and convert

### Option 2: Client-Side JavaScript Components (IMPLEMENTED)

**Pros:**
- ✅ No build process needed
- ✅ Works with current GitHub Pages setup
- ✅ Single source of truth for components
- ✅ Quick to implement

**Cons:**
- ❌ Flash of Unstyled Content (FOUC)
- ❌ Requires JavaScript enabled
- ❌ Slight SEO delay (though modern crawlers handle it)
- ❌ Header/footer don't render if JS fails
- ⚠️ Not industry-standard approach

**Effort**: ~1-2 hours (COMPLETE - see implementation below)

### Option 3: Accept Duplication with Best Practices

**Pros:**
- ✅ No changes needed
- ✅ Simple mental model
- ✅ Works everywhere, no dependencies
- ✅ No FOUC or rendering issues

**Cons:**
- ❌ Maintenance burden remains
- ❌ Error-prone updates across files
- ❌ Doesn't follow DRY principles

**Effort**: 0 hours (status quo)

## Recommendation

**For this project, use Jekyll** (Option 1A) because:

1. **Zero setup cost**: GitHub Pages builds Jekyll sites automatically
2. **Best practice**: Industry standard for static sites on GitHub Pages
3. **True DRY**: Real templates and includes, not workarounds
4. **Better UX**: No FOUC, no JavaScript dependency
5. **Future-proof**: Easier to add blog integration, collections, data files, etc.

## Client-Side JavaScript Implementation (Option 2)

We implemented DRY principles using **client-side JavaScript** to dynamically inject common HTML components.

### Architecture

```
assets/js/
├── components.js     # Shared header/footer generation (NEW)
└── script.js         # Existing functionality (theme, animations, etc.)
```

### How It Works

1. **components.js** contains functions that generate HTML for common components
2. Each HTML page includes a minimal structure with:
   - `<head>` with Font Awesome and styles.css
   - `<body>` with data attributes to configure the page
   - `<main>` with page-specific content
   - Script includes for components.js and script.js
3. **components.js** runs before `DOMContentLoaded` and injects header/footer HTML
4. **script.js** then initializes interactive functionality (theme toggle, menu, etc.)

### Benefits

✅ **Single source of truth**: Header/footer defined once in components.js
✅ **Easy maintenance**: Update header/footer in one place
✅ **No build process**: Works with GitHub Pages out of the box
✅ **Progressive enhancement**: Content still accessible if JavaScript fails
✅ **Maintains accessibility**: Same semantic HTML structure
✅ **Performance**: Minimal overhead (small JS file, cached by browser)

### Tradeoffs

⚠️ **Flash of unstyled content**: Header/footer appear after JS loads
⚠️ **JavaScript required**: Header/footer won't render if JS is disabled
⚠️ **SEO consideration**: Search engines render JS, but slightly delayed

#### Mitigation Strategies

- **FOUC**: Could add a loading spinner or keep minimal static header
- **No-JS fallback**: Could add `<noscript>` tags with static header/footer
- **SEO**: Modern search engines render JavaScript; GitHub Pages is for portfolio, not SEO-critical

## Alternative Approaches Considered

### 1. Static Site Generator (e.g., Jekyll, Hugo, 11ty)
- ❌ Adds build complexity
- ❌ Requires Node.js/Ruby installation
- ❌ Not needed for this simple site
- ✅ Would eliminate FOUC and JS dependency

### 2. Server-Side Includes (SSI)
- ❌ Not supported by GitHub Pages
- ❌ Would require different hosting

### 3. Template Literals in HTML
- ❌ Not possible without build process
- ❌ HTML doesn't support includes natively

### 4. Web Components
- ⚠️ More modern but similar tradeoffs to our approach
- ⚠️ More complex implementation
- ⚠️ Browser support considerations

## Implementation Details

### Usage in HTML Pages

**Root-level pages** (index.html, 404.html):
```html
<body data-root-page="true" data-current-page="home">
    <!-- Header and footer injected here by components.js -->
    <main id="main-content">
        <!-- Page-specific content -->
    </main>
    <script src="assets/js/components.js"></script>
    <script src="assets/js/script.js"></script>
</body>
```

**Subdirectory pages** (pages/*.html):
```html
<body data-root-page="false" data-current-page="about">
    <!-- Header and footer injected here by components.js -->
    <main id="main-content">
        <!-- Page-specific content -->
    </main>
    <script src="../assets/js/components.js"></script>
    <script src="../assets/js/script.js"></script>
</body>
```

### Path Handling

The `generateHeader()` function automatically adjusts paths based on the `isRootPage` parameter:
- Root pages link to `pages/about.html`
- Subdirectory pages link to `about.html` and use `../assets/`

### Current Page Highlighting

The `data-current-page` attribute allows the header to highlight the current page in navigation.

## Testing

To test the implementation:

1. **Local testing**: Open pages in browser directly from file system
2. **GitHub Pages testing**: Deploy to GitHub Pages and test all navigation
3. **Accessibility**: Verify screen readers still work correctly
4. **Responsive**: Test mobile hamburger menu still functions
5. **Theme toggle**: Verify theme switcher works on all pages

## Future Enhancements

If needed, we could:
1. Add `<noscript>` fallback with static header/footer
2. Implement a build process for true SSG approach
3. Add loading indicators to improve perceived performance
4. Move more common HTML patterns into components (e.g., hero sections)

## Migration Guide: Converting to Jekyll

If you choose to use Jekyll (recommended), here's how to convert:

### 1. Create Jekyll Structure

```bash
# Create layouts directory
mkdir -p _layouts _includes

# Create _config.yml
cat > _config.yml << 'EOF'
title: Jack Harter - DevOps Portfolio
description: DevOps and Linux Engineer
url: https://jharter1.github.io
theme: null  # Using custom CSS

# Build settings
markdown: kramdown
highlighter: rouge

# Exclude from build
exclude:
  - README.md
  - docs/
EOF
```

### 2. Create Layout Template

Create `_layouts/default.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ page.title }} | {{ site.title }}</title>
    <link rel="shortcut icon" type="image/svg" href="{{ '/assets/images/favicon.svg' | relative_url }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="{{ '/assets/css/styles.css' | relative_url }}">
</head>
<body>
    {% include header.html %}
    
    <main id="main-content">
        {{ content }}
    </main>
    
    {% include footer.html %}
    <script src="{{ '/assets/js/script.js' | relative_url }}"></script>
</body>
</html>
```

### 3. Create Header Include

Move header HTML to `_includes/header.html`:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<header>
    <!-- [Copy header HTML from current pages] -->
</header>
```

### 4. Create Footer Include

Move footer HTML to `_includes/footer.html`:
```html
<footer>
    <p>Loading...</p>
</footer>
```

### 5. Convert Pages

Add front matter to each page:

**index.html:**
```yaml
---
layout: default
title: Home
current_page: home
---
<!-- Page content only, no header/footer -->
```

**pages/about.html:**
```yaml
---
layout: default
title: About the Author
current_page: about
---
<!-- Page content only -->
```

### 6. Test Locally (Optional)

```bash
# Install Jekyll (optional for local testing)
gem install bundler jekyll

# Create Gemfile
bundle init
bundle add jekyll

# Serve locally
bundle exec jekyll serve
```

### 7. Deploy to GitHub Pages

Simply push to GitHub - it will build automatically!

```bash
git add .
git commit -m "Convert to Jekyll for DRY HTML"
git push origin main
```

**Estimated time**: 2-4 hours for full conversion

## Client-Side JavaScript Implementation (Alternative)

The repository includes a working client-side JavaScript implementation in `assets/js/components.js`. This is a fallback option if you don't want to use Jekyll.

### Pros & Cons

**Pros:**
- Quick to implement (already done)
- No build process
- Works with current setup

**Cons:**
- Flash of unstyled content
- Requires JavaScript
- Not best practice

### Usage

See the code in `assets/js/components.js` and example usage in test files.

## Conclusion

**Recommended Action**: Convert to Jekyll for the best long-term solution. The provided client-side JavaScript implementation can serve as a temporary solution or for understanding the problem space.

**Why Jekyll wins:**
- Native GitHub Pages support (zero config)
- True DRY principles (layouts + includes)
- No FOUC or JavaScript dependency
- Industry standard practice
- Better for future enhancements (blog, collections, etc.)

**Key insight**: Sometimes the "right" tool (Jekyll) is better than a clever workaround (client-side JS), even if it requires some upfront learning.
