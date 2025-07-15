import React from 'react';
import { motion } from 'framer-motion';
import { getThemeColors } from './theme';

// Import personal images
import riolimaImage from './data/privatesection/riolima.png';

const PersonalSection = () => {
  const colors = getThemeColors();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.3 }
    }
  };

  return (
    <motion.div
      className="personal-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="personal-content">
        {/* Image Section */}
        <motion.div 
          className="personal-image-container"
          variants={imageVariants}
          style={{
            background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 50%, ${colors.primary}20 100%)`
          }}
        >
          <div className="image-wrapper">
            <img 
              src={riolimaImage} 
              alt="Riolima - My dogs" 
              className="personal-image"
            />
            <div className="image-overlay" style={{
              background: `linear-gradient(135deg, transparent 0%, ${colors.background}80 50%, ${colors.background} 100%)`
            }}></div>
          </div>
        </motion.div>

        {/* Personal Info */}
        <div className="personal-info">
          <motion.h2 
            variants={itemVariants}
            style={{ color: colors.secondary }}
          >
            About Me
          </motion.h2>
          
          <motion.div 
            className="personal-items"
            variants={itemVariants}
          >
            <motion.div
              className="personal-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 100%)`,
                border: `1px solid ${colors.border}`
              }}
            >
              <span style={{ color: colors.accent }}>🐕</span>
              <span>Does dog sport training with two dogs</span>
            </motion.div>
            
            <motion.div
              className="personal-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 100%)`,
                border: `1px solid ${colors.border}`
              }}
            >
              <span style={{ color: colors.accent }}>🍷</span>
              <span>Prefers Georgian sweet red wine or a cold IPA</span>
            </motion.div>
            
            <motion.div
              className="personal-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 100%)`,
                border: `1px solid ${colors.border}`
              }}
            >
              <span style={{ color: colors.accent }}>🏔️</span>
              <span>Enjoys outdoor activities like hiking</span>
            </motion.div>
            
            <motion.div
              className="personal-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 100%)`,
                border: `1px solid ${colors.border}`
              }}
            >
              <span style={{ color: colors.accent }}>📍</span>
              <span>Is relocating to Billund area</span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="personal-description"
            variants={itemVariants}
            style={{ color: colors.textSecondary }}
          >
            <p>
              When I'm not working with data and finance, you'll find me training my two dogs in various dog sports. 
              It's a perfect balance to my analytical work - requiring patience, communication, and building strong relationships. 
              Just like in business, success comes from understanding the individual needs and creating the right environment for growth.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalSection; 