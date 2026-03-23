# Jack Harter's Portfolio Website

[![Deploy Jekyll](https://github.com/jharter1/jharter1.github.io/workflows/Deploy%20Jekyll%20site%20to%20GitHub%20Pages/badge.svg)](https://github.com/jharter1/jharter1.github.io/actions)
[![Automated PR Review](https://img.shields.io/badge/PR%20Review-Automated-blue)](docs/AUTOMATED_PR_REVIEW.md)

Personal portfolio website for Jack Harter - DevOps and Linux Engineer. Visit the live site at [j.hartr.net](https://j.hartr.net).

## 🚀 Features

- **Jekyll Static Site Generator**: DRY architecture with reusable layouts and includes
- **Dynamic Theme System**: Light/dark mode toggle with system preference detection
- **Rotating Typewriter Effect**: Animated hero section showcasing multiple roles
- **Geometric Background Animation**: Theme-aware particle network effect
- **Responsive Design**: Mobile-first layout optimized for all screen sizes
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Custom 404 Page**: DevOps-themed terminal simulation
- **Automated PR Reviews**: GitHub Actions workflow for pull request feedback
- **Case Study Expandables**: Detailed project showcases with interactive elements

## 📋 Documentation

### For Developers
- **[Agents Guide](docs/agents.md)**: Comprehensive guide for coding agents and developers
- **[Jekyll Migration](docs/JEKYLL_MIGRATION.md)**: Details on the Jekyll migration process
- **[Automated PR Review](docs/AUTOMATED_PR_REVIEW.md)**: How automated PR reviews work

### For Contributors
- **[Pull Request Guidelines](docs/agents.md#pull-request-guidelines)**: How to contribute effectively
- **[Testing Checklist](docs/agents.md#testing-checklist)**: What to verify before submitting

## 🛠️ Technology Stack

- **Static Site Generator**: Jekyll 4.4+
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Hosting**: GitHub Pages with custom domain
- **CI/CD**: GitHub Actions
- **Version Control**: Git with feature branch workflow

## 🏃 Quick Start

### Prerequisites
- Ruby 3.2+
- Bundler

### Local Development

```bash
# Clone the repository
git clone https://github.com/jharter1/jharter1.github.io.git
cd jharter1.github.io

# Install dependencies
bundle install

# Build and serve locally
bundle exec jekyll serve

# Visit http://localhost:4000
```

## 🤖 Automated Workflows

### Jekyll Build & Deploy
Automatically builds and deploys the site to GitHub Pages when changes are pushed to `main`.

**File**: `.github/workflows/jekyll.yml`

### Automated PR Review
Provides automated feedback on all pull requests with best practices and recommendations.

**File**: `.github/workflows/copilot-pr-review.yml`  
**Documentation**: [docs/AUTOMATED_PR_REVIEW.md](docs/AUTOMATED_PR_REVIEW.md)

### Branch Cleanup
Automatically deletes merged feature branches to keep the repository clean.

**File**: `.github/workflows/cleanup-branches.yml`

## 📁 Project Structure

```
/
├── _layouts/            # Jekyll page layouts
│   ├── default.html     # Base layout with header/footer
│   └── home.html        # Homepage layout
├── _includes/           # Reusable components
│   ├── header.html      # Site header with navigation
│   ├── footer.html      # Site footer
│   └── hero.html        # Hero section with typewriter
├── assets/              # Static resources
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   └── images/         # Images and icons
├── pages/              # Content pages
│   ├── about.html      # About page
│   ├── contact.html    # Contact page
│   ├── projects.html   # Projects showcase
│   ├── resume.html     # Printable resume
│   └── uses.html       # Setup / uses page
├── docs/               # Documentation
├── .github/workflows/  # GitHub Actions workflows
├── _config.yml         # Jekyll configuration
├── Gemfile             # Ruby dependencies
├── index.html          # Homepage
├── 404.html            # Custom error page
└── CNAME               # Custom domain config
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the existing code style

3. **Test locally** using `bundle exec jekyll serve`

4. **Commit with conventional commit format**
   ```bash
   git commit -m "feat: add new feature"
   ```

5. **Submit a pull request** with a clear description

The automated PR review workflow will provide feedback on your submission.

## 🧪 Testing

Before submitting a PR, verify:

- [ ] All pages load without errors
- [ ] Navigation links work correctly
- [ ] Assets (CSS, JS, images) load properly
- [ ] Responsive design works on mobile/desktop
- [ ] Theme toggle functionality works
- [ ] Background animation renders smoothly
- [ ] Animation respects reduced-motion preference
- [ ] Accessibility features intact

## 📊 Key Features Deep Dive

### Theme System
The site supports light and dark themes with:
- System preference detection
- Persistent user preference
- Smooth transitions between themes
- Theme-aware colors for all components including animations

### Typewriter Effect
An engaging hero section that rotates through multiple professional titles:
- Smooth typing and deletion animations
- Configurable speed and timing
- Multiple phrases showcasing different roles
- Accessible with proper ARIA labels

### Geometric Background
A mesmerizing particle network animation:
- 120 particles with connecting lines
- Theme-aware colors
- Optimized performance with requestAnimationFrame
- Respects `prefers-reduced-motion` accessibility setting

## 📝 License

This project is open source and available for reference. Some content may be specific to Jack Harter's experience and should not be copied directly. See [LICENSE](docs/LICENSE) for details.

## 📬 Contact

- **Website**: [j.hartr.net](https://j.hartr.net)
- **Blog**: [blog.hartr.net](https://blog.hartr.net)
- **LinkedIn**: [jwharter](https://www.linkedin.com/in/jwharter)
- **GitHub**: [@jharter1](https://github.com/jharter1)

## 🙏 Acknowledgments

- Built with [Jekyll](https://jekyllrb.com/)
- Hosted on [GitHub Pages](https://pages.github.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Inspired by the DevOps community

---

*Last Updated: March 2026*
