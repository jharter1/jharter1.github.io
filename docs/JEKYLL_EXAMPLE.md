# Example: Converting Contact Page to Jekyll

This example shows exactly how to convert the contact page from plain HTML to Jekyll with DRY principles.

## Current State (Plain HTML)

**pages/contact.html** (82 lines):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jack Harter - Contact Information</title>
    <link rel="shortcut icon" type="image/svg" href="../assets/images/favicon.svg">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header>
        <!-- 50+ lines of header HTML -->
    </header>
    <main id="main-content">
        <!-- Page-specific content (20 lines) -->
    </main>
    <footer>
        <p>Loading...</p>
    </footer>
    <script src="../assets/js/script.js"></script>
</body>
</html>
```

## After Jekyll Conversion

### Structure

```
_layouts/
  default.html           # Main layout (50 lines)
_includes/
  header.html           # Header component (57 lines)
  footer.html           # Footer component (3 lines)
pages/
  contact.html          # Page content only (28 lines)
```

### _layouts/default.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ page.title }} | Jack Harter</title>
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

### _includes/header.html

```html
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
            <li><a href="{{ '/' | relative_url }}"{% if page.current_page == 'home' %} class="current-page"{% endif %}>Home</a></li>
            <li><a href="{{ '/pages/about.html' | relative_url }}"{% if page.current_page == 'about' %} class="current-page"{% endif %}>About the Author</a></li>
            <li><a href="{{ '/pages/projects.html' | relative_url }}"{% if page.current_page == 'projects' %} class="current-page"{% endif %}>Projects</a></li>
            <li><a href="{{ '/pages/contact.html' | relative_url }}"{% if page.current_page == 'contact' %} class="current-page"{% endif %}>Contact</a></li>
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
```

### _includes/footer.html

```html
<footer>
    <p>Loading...</p>
</footer>
```

### pages/contact.html (Jekyll version)

```html
---
layout: default
title: Contact Information
current_page: contact
---

<section class="hero animated-hero" aria-labelledby="hero-title">
    <h1 id="hero-title"></h1>
    <h3 id="hero-subtitle" class="hero-content-hidden"></h3>
    <a href="about.html" id="hero-cta" class="hero-cta hero-content-hidden"></a>
</section>
<div class="card fade-in-section card-hidden">
    <h2>Email</h2>
    <p>Send me an email at <a href="mailto:jack.harter.8@gmail.com">Jack's email, please do not spam.</a></p>
</div>
<div class="card fade-in-section card-hidden">
    <h2>LinkTree</h2>
    <p>Check out my LinkTree for links to my social media profiles and other websites: <a href="https://linktr.ee/jackharter">Jack's LinkTree</a></p>
</div>
<div class="card fade-in-section card-hidden">
    <h2>LinkedIn</h2>
    <p>Connect with me on LinkedIn: <a href="https://www.linkedin.com/in/jwharter">Jack's LinkedIn</a></p>
</div>
```

## Comparison

### Before (Plain HTML)
- **contact.html**: 82 lines
- **about.html**: 82 lines (60 duplicated)
- **projects.html**: 82 lines (60 duplicated)
- **index.html**: 82 lines (60 duplicated)
- **404.html**: 82 lines (60 duplicated)
- **TOTAL**: ~410 lines, ~300 duplicated

### After (Jekyll)
- **_layouts/default.html**: 20 lines
- **_includes/header.html**: 57 lines
- **_includes/footer.html**: 3 lines
- **pages/contact.html**: 28 lines (content only)
- **pages/about.html**: 28 lines (content only)
- **pages/projects.html**: 28 lines (content only)
- **index.html**: 28 lines (content only)
- **404.html**: 28 lines (content only)
- **TOTAL**: ~220 lines, ~0 duplicated

**Savings**: ~190 lines removed (46% reduction), zero duplication!

## Benefits Demonstrated

1. **Single Source of Truth**: Header/footer defined once
2. **Easy Updates**: Change header in one place, applies to all pages
3. **Cleaner Code**: Each page contains only its unique content
4. **Maintainability**: Adding new pages is trivial (just add front matter)
5. **Type Safety**: Typos in layout names cause build errors (caught early)

## How to Implement

1. Create the directory structure
2. Move header/footer HTML to includes
3. Create the layout file
4. Add front matter to each page
5. Remove header/footer HTML from each page
6. Push to GitHub (it builds automatically!)

**Time required**: ~2 hours for the whole site
