import React from 'react';
import { getThemeColors } from './theme';
import './ThemeContainer.css';

const ThemeContainer = ({ children }) => {
  const colors = getThemeColors('elegant');

  // Gradient definitions based on elegant theme
  const gradients = {
    background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 50%, ${colors.primary} 100%)`,
    card: `linear-gradient(145deg, ${colors.surface} 0%, ${colors.primary}20 100%)`,
    button: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    accent: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.highlight} 100%)`
  };

  const containerStyle = {
    background: gradients.background,
    color: colors.text,
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.5s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div style={containerStyle}>
      {/* Animated background elements */}
      <div className="bg-animation">
        <div className="bg-circle" style={{ background: gradients.accent }}></div>
        <div className="bg-circle" style={{ background: gradients.button }}></div>
        <div className="bg-circle" style={{ background: gradients.accent }}></div>
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

export default ThemeContainer; 