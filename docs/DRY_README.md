# Making HTML Pages More DRY - Implementation Guide

This directory contains documentation and code examples for reducing code duplication in HTML pages while maintaining GitHub Pages compatibility.

## Quick Start

### Recommended Approach: Jekyll (Static Site Generator)

**Why Jekyll?**
- Native GitHub Pages support (builds automatically)
- True DRY with layouts and includes
- No JavaScript dependency or FOUC
- Industry standard for static sites

**Read:** [JEKYLL_EXAMPLE.md](./JEKYLL_EXAMPLE.md) for step-by-step conversion guide

### Alternative Approach: Client-Side JavaScript

**Why JavaScript Components?**
- No build process needed
- Quick implementation
- Works with current setup

**Code:** See `assets/js/components.js` for implementation

**Tradeoffs:** Flash of unstyled content (FOUC), requires JavaScript

## Documentation Files

1. **[DRY_IMPLEMENTATION.md](./DRY_IMPLEMENTATION.md)** - Complete analysis and recommendations
   - Problem statement
   - All solution options (Jekyll, 11ty, JavaScript, status quo)
   - Pros/cons comparison
   - Recommendation: Use Jekyll

2. **[JEKYLL_EXAMPLE.md](./JEKYLL_EXAMPLE.md)** - Practical conversion example
   - Before/after code comparison
   - Step-by-step Jekyll migration
   - Shows 46% code reduction
   - Eliminates all duplication

3. **[CLIENT_SIDE_APPROACH.md](./CLIENT_SIDE_APPROACH.md)** - Alternative JavaScript solution
   - How components.js works
   - Usage examples
   - Testing guide

## Summary of Findings

### Current Duplication
- Each HTML page contains ~60 lines of duplicate header/footer code
- Changes require updating 5+ files
- Error-prone and time-consuming

### Solution Options Evaluated

| Approach | Setup Time | Complexity | DRY Level | Recommendation |
|----------|------------|------------|-----------|----------------|
| **Jekyll** | 2-4 hours | Low-Medium | ✅✅✅ | ⭐ **BEST** |
| 11ty | 4-6 hours | Medium | ✅✅✅ | Good alternative |
| JavaScript | 1-2 hours | Low | ✅✅ | Quick fix |
| Status Quo | 0 hours | Low | ❌ | Not recommended |

### Recommended Action

**Convert to Jekyll** for:
- Zero-config deployment (GitHub builds automatically)
- True separation of content from presentation
- Better user experience (no FOUC, no JS dependency)
- Future flexibility (easy to add blog, collections, etc.)

## Quick Comparison

### Before (Plain HTML)
```html
<!-- 82 lines per page -->
<head>...</head>
<body>
    <header><!-- 57 lines --></header>
    <main><!-- 20 lines of content --></main>
    <footer><!-- 3 lines --></footer>
</body>
```

### After (Jekyll)
```html
<!-- 28 lines per page -->
---
layout: default
title: Page Title
---
<!-- 20 lines of content only -->
```

**Result:** 66% less code per page, zero duplication!

## Implementation Resources

- **Jekyll Official Docs:** https://jekyllrb.com/docs/
- **GitHub Pages + Jekyll:** https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll
- **Liquid Templating:** https://shopify.github.io/liquid/

## Questions?

See the detailed documentation files in this directory or open an issue on GitHub.

## Files in This Directory

```
docs/
├── README.md                    # This file
├── DRY_IMPLEMENTATION.md       # Complete analysis and recommendations
├── JEKYLL_EXAMPLE.md           # Step-by-step Jekyll conversion guide
└── CLIENT_SIDE_APPROACH.md     # Alternative JavaScript approach (to be created)
```

## Next Steps

1. Read [DRY_IMPLEMENTATION.md](./DRY_IMPLEMENTATION.md) for the full analysis
2. Review [JEKYLL_EXAMPLE.md](./JEKYLL_EXAMPLE.md) for conversion steps
3. Decide: Jekyll (recommended) or JavaScript (quick fix)
4. Implement and test
5. Document your choice in the main README

---

**Key Takeaway:** Sometimes the "right" tool (Jekyll) is better than a clever workaround (JavaScript), even if it requires some learning. The upfront time investment pays off in maintainability.
