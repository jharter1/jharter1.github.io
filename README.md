# jharter1.github.io

Personal DevOps portfolio website for Jack Harter, showcasing projects, skills, and recent activity in the cloud-native and infrastructure automation space.

🔗 **Live Site**: [jharter1.github.io](https://jharter1.github.io)

## Features

### 🎨 Modern Design
- Responsive mobile-first design
- Dark/light theme toggle with system preference detection
- Smooth animations and transitions
- Accessible WCAG-compliant interface

### 📊 Real-Time GitHub Activity Feed
The homepage displays your recent GitHub activity automatically:
- **Recent commits, PRs, and issues** from your public repositories
- **Activity filtering** by type (All, Commits, PRs, Issues)
- **Smart caching** for performance (1-hour cache duration)
- **Manual refresh** button to update on demand
- **Error handling** with retry functionality for ad blockers or network issues

**Note**: LinkedIn activity integration is not available due to API limitations. LinkedIn requires OAuth authentication and formal API approval, which is not feasible for static GitHub Pages sites.

### ⚡ Dynamic Content
- Animated hero section with rotating typewriter effect
- Fade-in animations on scroll
- Geometric background animation (respects reduced motion preferences)
- Interactive project cards and skill filters

### 🔧 Tech Stack
- **Generator**: Jekyll 4.4+ for static site generation
- **Hosting**: GitHub Pages with custom domain
- **Languages**: HTML5, CSS3, Vanilla JavaScript (no frameworks)
- **CI/CD**: GitHub Actions for automated deployment
- **Icons**: Font Awesome 6.x

## Local Development

### Prerequisites
- Ruby 3.2+
- Bundler gem

### Setup
```bash
# Clone the repository
git clone https://github.com/jharter1/jharter1.github.io.git
cd jharter1.github.io

# Install dependencies
bundle install

# Run local development server
bundle exec jekyll serve

# Site will be available at http://localhost:4000
```

### Building for Production
```bash
bundle exec jekyll build
```

The built site will be in the `_site/` directory.

## Project Structure

```
.
├── _config.yml          # Jekyll configuration and site metadata
├── _includes/           # Reusable HTML components
│   ├── header.html      # Site header with navigation
│   ├── footer.html      # Site footer
│   └── hero.html        # Animated hero section
├── _layouts/            # Page templates
│   ├── default.html     # Base layout
│   └── home.html        # Homepage layout
├── assets/
│   ├── css/
│   │   └── styles.css   # Main stylesheet
│   ├── js/
│   │   └── script.js    # Application JavaScript
│   └── images/          # Image assets
├── pages/               # Site pages (About, Projects, Contact, etc.)
├── docs/                # Developer documentation
│   ├── ACTIVITY_FEED.md # Activity feed feature documentation
│   ├── agents.md        # Coding agents guide
│   └── JEKYLL_MIGRATION.md # Jekyll migration notes
├── index.html           # Homepage
└── 404.html             # Custom 404 page
```

## Activity Feed Feature

The activity feed is a key feature that automatically displays your recent GitHub activity on the homepage.

### How It Works
1. **Fetches** from GitHub's public Atom feed (`https://github.com/USERNAME.atom`)
2. **Caches** results in browser localStorage for 1 hour
3. **Renders** activity items with filtering options
4. **Handles errors** gracefully with fallback states

### Configuration
Edit the initialization in `assets/js/script.js`:

```javascript
const activityFeed = new ActivityFeed({
    username: 'jharter1',        // Your GitHub username
    maxItems: 8,                  // Max activities to display
    cacheDuration: 3600000,       // Cache duration (1 hour)
    containerId: 'currently-card' // Target container ID
});
```

### Troubleshooting
- **Feed not loading**: Check browser console for errors
- **Ad blocker issues**: Some ad blockers block GitHub requests; use the Retry button
- **Cache issues**: Clear browser cache or use the refresh button

See [docs/ACTIVITY_FEED.md](docs/ACTIVITY_FEED.md) for complete documentation.

## Deployment

The site automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

### Workflow
1. Push changes to `main` branch
2. GitHub Actions runs Jekyll build
3. Built site is deployed to GitHub Pages
4. Live site updates within minutes

See [.github/workflows/jekyll.yml](.github/workflows/jekyll.yml) for workflow configuration.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a personal portfolio site, but suggestions and bug reports are welcome via GitHub Issues.

## License

© 2025 Jack Harter. All rights reserved.

## Contact

- **GitHub**: [@jharter1](https://github.com/jharter1)
- **LinkedIn**: [jwharter](https://www.linkedin.com/in/jwharter)
- **Blog**: [blog.hartr.net](https://blog.hartr.net)
- **Website**: [jharter1.github.io](https://jharter1.github.io)

---

Built with ❤️ using Jekyll and GitHub Pages
