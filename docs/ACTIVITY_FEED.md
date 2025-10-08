# Activity Feed Feature

## Overview
The Activity Feed feature displays real-time GitHub activity on the homepage's "Currently" card, showcasing recent commits, pull requests, issues, and other GitHub activities.

## How It Works

### Data Source
- Fetches from GitHub's public Atom feed: `https://github.com/jharter1.atom`
- No authentication required (public feed)
- Updated in real-time as GitHub activities occur

### Caching Strategy
- **Storage**: Browser localStorage
- **Cache Duration**: 1 hour (3600000 ms)
- **Cache Key**: `github_activity_cache`
- **Fallback**: Uses expired cache if API is unavailable

### Configuration
The ActivityFeed class can be configured in `assets/js/script.js`:

```javascript
const activityFeed = new ActivityFeed({
    username: 'jharter1',        // GitHub username
    maxItems: 8,                  // Maximum items to display
    cacheDuration: 3600000,       // Cache duration in milliseconds (1 hour)
    containerId: 'currently-card' // DOM element ID to render into
});
```

## Features

### Activity Types Displayed
- **Commits**: Push events to repositories
- **Pull Requests**: Opened, merged, or closed PRs
- **Issues**: Opened or closed issues
- **Starring**: Starred repositories
- **Repository Creation**: New repositories created
- **Forks**: Forked repositories
- **Branches**: New branch creation

### Filtering
Users can filter activities by:
- **All**: Show all activity types
- **Commits**: Show only push/commit events
- **PRs**: Show only pull request activities
- **Issues**: Show only issue-related activities

### Error Handling
The feed gracefully handles errors:
1. **API Unavailable**: Falls back to cached data (even if expired)
2. **No Cache Available**: Displays static fallback content with link to GitHub profile
3. **CORS Issues**: Handles cross-origin restrictions gracefully
4. **Parse Errors**: Logs errors and shows fallback content

## UI Components

### Activity Item Structure
Each activity displays:
- GitHub icon with activity-type badge
- Activity title (linked to GitHub)
- Time ago (e.g., "2h ago", "3d ago")
- Hover effects for better UX

### Responsive Design
- Desktop: Full-width activity items with detailed information
- Mobile: Compact view with optimized spacing and touch-friendly filters

## Performance Considerations

### Lazy Initialization
The feed initializes 1 second after page load to avoid blocking initial page render:

```javascript
setTimeout(() => {
    activityFeed.init();
}, 1000);
```

### Caching Benefits
- Reduces API calls (max once per hour per user)
- Faster page loads for returning visitors
- Continues working offline (with cached data)

### DOM Updates
- Activity items rendered once, not continuously updated
- Filter changes use CSS display properties (no re-render)
- Minimal JavaScript execution after initial load

## Privacy & Security

### Data Handling
- **Client-side only**: No server-side storage or processing
- **Public data only**: Only fetches publicly available GitHub activity
- **No tracking**: No user analytics or tracking implemented
- **No authentication**: No API keys or tokens required

### XSS Protection
All user-generated content is escaped using the `escapeHtml()` method:

```javascript
escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

## Browser Compatibility
- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **JavaScript**: ES6+ features (async/await, arrow functions, template literals)
- **APIs used**:
  - Fetch API
  - DOMParser (for XML parsing)
  - localStorage
  - Intersection Observer (for scroll animations, with fallback)

## Maintenance

### Updating Configuration
To change settings, edit the initialization in `assets/js/script.js`:
- Increase/decrease `maxItems` to show more/fewer activities
- Adjust `cacheDuration` for different cache expiry times
- Change `username` if the GitHub account changes

### Styling Customization
Activity feed styles are in `assets/css/styles.css` under:
- `.activity-feed-header`
- `.activity-filters`
- `.activity-timeline`
- `.activity-item`
- `.activity-icon`

### Disabling the Feature
To disable the activity feed:
1. Remove or comment out the initialization code in `assets/js/script.js`
2. The "Currently" card will revert to static content
3. Optionally remove the ActivityFeed class and CSS styles

## Troubleshooting

### Feed Not Loading
1. Check browser console for errors
2. Verify GitHub feed is accessible: `https://github.com/jharter1.atom`
3. Check localStorage is enabled in browser
4. Clear cache and reload

### Items Not Filtering
1. Ensure JavaScript is enabled
2. Check console for errors
3. Verify filter buttons have correct `data-filter` attributes

### Cache Not Working
1. Check browser localStorage permissions
2. Verify cache key in localStorage (F12 > Application > Local Storage)
3. Clear cache manually if corrupted: `localStorage.removeItem('github_activity_cache')`

## Future Enhancements
Potential improvements not currently implemented:
- LinkedIn integration (requires API approval)
- Twitter/X feed integration
- Contribution calendar visualization
- Achievement badges for milestones
- Real-time WebSocket updates
- Activity search/filtering by date range
- Export activity history
