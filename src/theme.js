// Theme configuration file with Mathias's custom color palette
// Based on color_notes.txt - professional portfolio themes

export const themes = {
  portfolio: {
    name: 'Portfolio Theme',
    colors: {
      primary: '#6700a3',
      secondary: '#e02f75',
      accent: '#ff5a57',
      highlight: '#fccbf0',
      background: '#050c38',
      surface: '#1b2062',
      text: '#f2e6ee',
      textSecondary: '#bdcdcf',
      border: '#977dff',
      shadow: 'rgba(103, 0, 163, 0.2)',
      success: '#034c36',
      warning: '#ffccf2',
      info: '#0033ff',
      danger: '#e02f75'
    }
  },
  professional: {
    name: 'Professional Theme',
    colors: {
      primary: '#0033ff',
      secondary: '#0600ab',
      accent: '#00033d',
      highlight: '#977dff',
      background: '#050c38',
      surface: '#1b2062',
      text: '#f2e6ee',
      textSecondary: '#bdcdcf',
      border: '#034c36',
      shadow: 'rgba(0, 51, 255, 0.15)',
      success: '#034c36',
      warning: '#ff5a57',
      info: '#0033ff',
      danger: '#e02f75'
    }
  },
  creative: {
    name: 'Creative Theme',
    colors: {
      primary: '#ff5a57',
      secondary: '#fccbf0',
      accent: '#6700a3',
      highlight: '#ffccf2',
      background: '#050c38',
      surface: '#1b2062',
      text: '#f2e6ee',
      textSecondary: '#bdcdcf',
      border: '#977dff',
      shadow: 'rgba(255, 90, 87, 0.2)',
      success: '#034c36',
      warning: '#ffccf2',
      info: '#0033ff',
      danger: '#e02f75'
    }
  },
  elegant: {
    name: 'Elegant Theme',
    colors: {
      primary: '#977dff',
      secondary: '#0033ff',
      accent: '#0600ab',
      highlight: '#f2e6ee',
      background: '#050c38',
      surface: '#1b2062',
      text: '#f2e6ee',
      textSecondary: '#bdcdcf',
      border: '#034c36',
      shadow: 'rgba(151, 125, 255, 0.15)',
      success: '#034c36',
      warning: '#ff5a57',
      info: '#0033ff',
      danger: '#e02f75'
    }
  }
};

// Default theme
export const defaultTheme = 'portfolio';

// Helper function to get theme colors
export const getThemeColors = (themeName = defaultTheme) => {
  return themes[themeName]?.colors || themes[defaultTheme].colors;
};

// Helper function to get all available themes
export const getAvailableThemes = () => {
  return Object.keys(themes);
}; 