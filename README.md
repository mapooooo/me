# Mathias Porse - Portfolio

A dynamic React portfolio showcasing Mathias Porse's professional background, skills, and experience with beautiful animations and customizable themes.

## Features

- 🎨 **Custom Color Themes**: Professional themes based on Mathias's color palette
- ✨ **Framer Motion Animations**: Smooth, engaging animations throughout
- 📱 **Responsive Design**: Perfect on desktop, tablet, and mobile
- 🎯 **Interactive Sections**: Introduction, Experience, Skills, and Personal info
- 🔧 **Easy Customization**: Modify themes and content easily

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## How to Use

### Basic Usage

```jsx
import ThemeContainer from './ThemeContainer';

function MyApp() {
  return (
    <ThemeContainer>
      <h1>Your content here</h1>
      <p>This will automatically use the selected theme colors.</p>
    </ThemeContainer>
  );
}
```

### Customizing Themes

Edit the `src/theme.js` file to add or modify color schemes:

```javascript
export const themes = {
  myCustomTheme: {
    name: 'My Custom Theme',
    colors: {
      primary: '#your-primary-color',
      secondary: '#your-secondary-color',
      background: '#your-background-color',
      text: '#your-text-color',
      // ... add more colors as needed
    }
  }
};
```

## Available Themes

- **Portfolio Theme**: Primary purple and pink tones
- **Professional Theme**: Blue-focused professional look
- **Creative Theme**: Vibrant red and pink creative style
- **Elegant Theme**: Sophisticated purple and blue combination

## Project Structure

```
src/
├── theme.js              # Theme configuration file
├── ThemeContainer.jsx    # Main theme container component
├── ThemeContainer.css    # Styles for the container
├── Portfolio.jsx         # Main portfolio component
├── Portfolio.css         # Portfolio styles
├── App.jsx              # Main application component
├── App.css              # Application styles
└── index.js             # Application entry point
```

## Customization

### Adding New Colors

1. Open `src/theme.js`
2. Add your new color to each theme's colors object
3. The color will automatically appear in the color palette display

### Modifying Existing Themes

1. Open `src/theme.js`
2. Find the theme you want to modify
3. Update the color values in the colors object
4. Save the file to see changes immediately

### Creating New Themes

1. Open `src/theme.js`
2. Add a new theme object to the `themes` export
3. Include all required color properties
4. The new theme will appear in the theme selector

## Available Color Properties

- `primary`: Main brand color
- `secondary`: Secondary brand color
- `success`: Success/positive actions
- `danger`: Error/destructive actions
- `warning`: Warning/caution actions
- `info`: Informational content
- `background`: Main background color
- `surface`: Card/component background
- `text`: Primary text color
- `textSecondary`: Secondary text color
- `border`: Border color
- `shadow`: Shadow color for depth

## Scripts

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App (not recommended)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this in your own projects!
