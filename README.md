# ∴ The Seeker's Portal ∴

A cutting-edge portfolio website with integrated cybersecurity blog functionality. Features a mystical, cyberpunk aesthetic with interactive elements and a comprehensive content management system.

## 🚀 Features

### Portfolio Sections
- **Hero Section**: Animated typing text with floating orbs
- **About (The Wanderer)**: Interactive floating elements
- **Projects (Artifacts)**: Showcase of technical projects
- **Contact (Transmissions)**: Interactive puzzle to reveal contact info
- **Blog (Cyber Insights)**: Cybersecurity and privacy articles

### Blog System
- **Article Categories**: Cybersecurity, Privacy, Tools
- **Content Management**: Local storage-based article system
- **Markdown Support**: Write articles in markdown format
- **Search & Filter**: Filter articles by category
- **Responsive Design**: Mobile-friendly blog layout

### Admin Features
- **Secret Admin Access**: Click the nav orb 5 times to unlock admin mode
- **Article Publishing**: Create new articles with title, category, summary, and content
- **Article Management**: View and delete published articles
- **Local Storage**: All articles stored in browser's local storage

## 🎨 Design Features

- **Cyberpunk Aesthetic**: Neon colors, glowing effects, geometric symbols
- **Interactive Animations**: P5.js particle background, hover effects
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Custom Scrollbar**: Themed scrollbar matching the overall design
- **Easter Eggs**: Hidden interactions and secret access methods

## 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Animations**: Anime.js for smooth transitions
- **Graphics**: P5.js for interactive background
- **Fonts**: Google Fonts (Space Mono, Orbitron)
- **Icons**: Unicode symbols for mystical aesthetic
- **Storage**: Browser localStorage for article persistence

## 🔧 Setup & Usage

1. **Basic Setup**: Simply open `index.html` in a modern web browser
2. **Blog Access**: Navigate to the ◈ symbol in the navigation or visit `blog.html`
3. **Admin Access**: 
   - Click the navigation orb (top right) 5 times
   - Navigate to the ⚡ symbol that appears
   - Create and manage articles

## 📝 Creating Articles

### Admin Panel Access
1. Click the nav orb 5 times to enable admin mode
2. Click the ⚡ symbol to access the admin panel
3. Fill out the article form:
   - **Title**: Article headline
   - **Category**: Cybersecurity, Privacy, or Tools
   - **Summary**: Brief description for the card view
   - **Content**: Full article content (supports Markdown)

### Markdown Support
The blog supports basic Markdown formatting:
- `# Heading 1`
- `## Heading 2` 
- `### Heading 3`
- `**bold text**`
- `*italic text*`
- `` `code` ``

## 🎯 Customization

### Colors (CSS Variables)
```css
:root {
  --primary-color: #00f5ff;    /* Cyan blue */
  --secondary-color: #ff6b9d;  /* Pink */
  --accent-color: #ffd23f;     /* Yellow */
  --dark-bg: #0a0a0f;         /* Dark background */
  --mid-bg: #1a1a2e;          /* Mid background */
  --light-text: #e0e0e0;      /* Light text */
}
```

### Adding New Sections
1. Add navigation symbol to `.nav__symbols`
2. Create corresponding section in HTML
3. Add event listeners in JavaScript
4. Style with CSS classes following existing patterns

## 🔒 Security Considerations

- **Local Storage**: Articles are stored in browser's localStorage
- **No Backend**: Fully client-side application
- **Data Persistence**: Articles persist across browser sessions
- **Privacy**: No external data collection or tracking

## 📱 Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Support**: Responsive design for iOS and Android
- **JavaScript**: ES6+ features required
- **Canvas Support**: Required for background animations

## 🎮 Interactive Elements

### Navigation Orb
- **5 Clicks**: Unlocks admin mode
- **Visual Feedback**: Glow and scale animations
- **Secret Access**: Gateway to content management

### Contact Puzzle
- **Sequence**: Click puzzle pieces to spell "GITHUB@ME"
- **Reward**: Easter egg message with contact hint
- **Reset**: Incorrect sequence resets automatically

### Project Orbs
- **Hover Effects**: Scale and rotation animations
- **Color Coding**: Each orb represents different project categories
- **Interactive**: Click for special effects

## 🌟 Future Enhancements

- **Search Functionality**: Full-text search across articles
- **Export Features**: Download articles as PDF or markdown
- **Comment System**: Add discussion capabilities
- **Analytics**: Track article views and engagement
- **Themes**: Multiple color schemes and layouts
- **Backend Integration**: Connect to a proper CMS or database

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements:
- Bug fixes and performance optimizations
- New interactive elements or animations
- Additional blog features
- Mobile experience improvements
- Accessibility enhancements

---

*Built with ❤️ for the cybersecurity community and digital privacy advocates.*