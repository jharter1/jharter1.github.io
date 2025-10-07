# Client-Side JavaScript Approach (Alternative Solution)

This document describes the client-side JavaScript implementation for reducing HTML duplication. This is an **alternative to Jekyll** and comes with tradeoffs.

## ⚠️ Important Notice

**This is a workaround, not best practice.** For production use, we strongly recommend using Jekyll (see [DRY_IMPLEMENTATION.md](./DRY_IMPLEMENTATION.md) for rationale).

Use this approach if:
- You need a quick temporary solution
- You absolutely cannot use Jekyll or a build process
- You understand and accept the tradeoffs

## How It Works

The solution uses JavaScript to dynamically inject header and footer HTML into each page at runtime.

### Architecture

```
1. Browser loads HTML page
2. HTML contains minimal structure + content
3. components.js runs and injects header/footer
4. script.js initializes interactive features
5. Page is fully functional
```

### Files

- **assets/js/components.js** - Header/footer generation module (NEW)
- **assets/js/script.js** - Existing page functionality (UNCHANGED)

## Implementation

### 1. The Components Module (components.js)

Located at `assets/js/components.js`, this module:
- Contains HTML templates for header and footer
- Handles path differences between root and subdirectory pages
- Injects HTML into the DOM before DOMContentLoaded
- Highlights the current page in navigation

### 2. Updated HTML Structure

**Before:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- meta tags, links -->
</head>
<body>
    <!-- 57 lines of header HTML -->
    <main id="main-content">
        <!-- page content -->
    </main>
    <!-- 3 lines of footer HTML -->
    <script src="assets/js/script.js"></script>
</body>
</html>
```

**After:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- meta tags, links -->
</head>
<body data-root-page="true" data-current-page="home">
    <!-- Header injected here by components.js -->
    <main id="main-content">
        <!-- page content -->
    </main>
    <!-- Footer injected here by components.js -->
    <script src="assets/js/components.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>
```

### 3. Configuration Attributes

Add these to the `<body>` tag:

- **data-root-page**: "true" for index.html, 404.html | "false" for pages/*.html
- **data-current-page**: "home" | "about" | "projects" | "contact"

These attributes tell components.js:
- How to generate correct paths (../ for subdirectories)
- Which navigation link to highlight

## Usage Examples

### Root Page (index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jack Harter - Home</title>
    <link rel="shortcut icon" type="image/svg" href="assets/images/favicon.svg">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body data-root-page="true" data-current-page="home">
    <main id="main-content">
        <!-- Your home page content -->
    </main>
    <script src="assets/js/components.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>
```

### Subdirectory Page (pages/about.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jack Harter - About</title>
    <link rel="shortcut icon" type="image/svg" href="../assets/images/favicon.svg">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body data-root-page="false" data-current-page="about">
    <main id="main-content">
        <!-- Your about page content -->
    </main>
    <script src="../assets/js/components.js"></script>
    <script src="../assets/js/script.js"></script>
</body>
</html>
```

## Benefits

✅ **Single Source of Truth**: Header/footer in one place (components.js)
✅ **Easy Maintenance**: Update once, applies everywhere
✅ **No Build Process**: Works directly with GitHub Pages
✅ **Quick Implementation**: ~1-2 hours
✅ **Backward Compatible**: Can revert easily if needed

## Tradeoffs & Limitations

❌ **Flash of Unstyled Content (FOUC)**: Header/footer appear after page load
❌ **JavaScript Required**: Won't work if JS is disabled (~0.2% of users)
❌ **SEO Delay**: Search engines must execute JS to see full content
❌ **Not Best Practice**: Industry prefers server-rendered or build-time generation
⚠️ **Load Order Matters**: components.js must load before script.js

## Mitigations

### 1. Reduce FOUC

Add CSS to hide body until components load:

```css
/* Add to styles.css */
body:not(.components-loaded) {
    opacity: 0;
}

body.components-loaded {
    opacity: 1;
    transition: opacity 0.2s;
}
```

Then in components.js, add:
```javascript
document.body.classList.add('components-loaded');
```

### 2. Add No-JavaScript Fallback

```html
<noscript>
    <style>
        body { opacity: 1 !important; }
    </style>
    <div style="padding: 20px; background: #ffeb3b; text-align: center;">
        This site requires JavaScript for full functionality.
        <a href="pages/about.html">About</a> | 
        <a href="pages/contact.html">Contact</a>
    </div>
</noscript>
```

### 3. Inline Critical CSS

Keep critical above-the-fold CSS inline in `<head>` to improve perceived load time.

## Testing

### Browser Testing

1. **Local Testing**: Open HTML files directly in browser
2. **Verify Components**: Check that header and footer appear
3. **Test Navigation**: Click links to ensure paths work
4. **Current Page**: Verify correct nav item is highlighted
5. **Interactive Features**: Test hamburger menu, theme toggle

### Automated Testing

```bash
# Check JavaScript syntax
node -c assets/js/components.js

# Run in browser console
console.log('Header exists:', !!document.querySelector('header'));
console.log('Footer exists:', !!document.querySelector('footer'));
console.log('Navigation works:', !!document.querySelector('nav ul li a'));
```

### Cross-Browser Testing

Test in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Maintenance

### Updating Header

Edit `generateHeader()` function in `assets/js/components.js`:

```javascript
function generateHeader(isRootPage, currentPage) {
    // Modify HTML here
    return `<header>...</header>`;
}
```

### Adding New Navigation Link

Add to the `<nav><ul>` section:

```javascript
<li><a href="${pagesPrefix}newpage.html"${currentPage === 'newpage' ? ' class="current-page"' : ''}>New Page</a></li>
```

### Updating Footer

Edit `generateFooter()` function in `assets/js/components.js`:

```javascript
function generateFooter() {
    return `<footer>...</footer>`;
}
```

## Migration Path

If you later decide to switch to Jekyll:

1. The content in each HTML page is already separated
2. Just add Jekyll front matter to each page
3. Move header/footer from components.js to Jekyll includes
4. Remove components.js references
5. Deploy

**Time to migrate**: ~1 hour (because content is already isolated)

## Performance

### Load Time Impact

- **components.js size**: ~5KB (minified)
- **Execution time**: <10ms on modern browsers
- **Network overhead**: Cached after first load
- **Perceived impact**: Minimal with FOUC mitigation

### Optimization Tips

1. **Minify components.js** for production
2. **Add cache headers** (GitHub Pages does this automatically)
3. **Consider inline small components** for critical above-fold content
4. **Use lazy loading** for non-critical JavaScript

## Comparison with Jekyll

| Feature | JavaScript Approach | Jekyll Approach |
|---------|-------------------|-----------------|
| Setup Time | 1-2 hours | 2-4 hours |
| Build Process | None | GitHub handles it |
| FOUC | Yes, minor | No |
| SEO | Slight delay | Immediate |
| JavaScript Required | Yes | No |
| Maintenance | Easy (one file) | Easy (includes) |
| Scalability | Good | Excellent |
| Best Practice | No | Yes |

## Conclusion

The client-side JavaScript approach works and achieves DRY principles, but **Jekyll is still recommended** for production use.

Use this approach only if:
- You need a quick temporary solution
- You have specific constraints preventing Jekyll adoption
- You plan to migrate to a proper SSG later

**Remember**: The goal is maintainable code. Sometimes the "right" tool is worth the learning curve.

## Resources

- **components.js source**: `assets/js/components.js`
- **Jekyll comparison**: [DRY_IMPLEMENTATION.md](./DRY_IMPLEMENTATION.md)
- **Example conversion**: [JEKYLL_EXAMPLE.md](./JEKYLL_EXAMPLE.md)

## Support

For questions or issues with this approach, open an issue on GitHub with:
- Browser and version
- Page URL where issue occurs
- Console error messages (F12 → Console tab)
- Expected vs actual behavior
