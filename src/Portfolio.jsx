import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { getThemeColors } from './theme';
import CompanyLogos from './CompanyLogos';
import PersonalSection from './PersonalSection';
import InteractiveGlobe from './components/InteractiveGlobe';
import { companyData } from './data/companyData';
import profileImage from './data/privatesection/1659513793685.jpeg';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [selectedCompany, setSelectedCompany] = useState('dataminds');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const colors = getThemeColors('elegant');
  const { scrollY } = useScroll();

  // Parallax effects
  const headerY = useTransform(scrollY, [0, 300], [0, -100]);
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);
  const profileScale = useTransform(scrollY, [0, 300], [1, 0.9]);

  // Smooth spring animations
  const smoothHeaderY = useSpring(headerY, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(headerOpacity, { stiffness: 100, damping: 30 });

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.02,
      y: -8,
      rotateX: 2,
      rotateY: 2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Enhanced gradient styles
  const getCardGradient = () => {
    return `linear-gradient(135deg, ${colors.surface} 0%, ${colors.primary}15 50%, ${colors.secondary}10 100%)`;
  };

  const getButtonGradient = () => {
    return `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
  };

  const getAccentGradient = () => {
    return `linear-gradient(135deg, ${colors.accent} 0%, ${colors.highlight} 100%)`;
  };

  const getGlassGradient = () => {
    return `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)`;
  };

  const sections = [
    { id: 'intro', label: 'Introduction' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'personal', label: 'Personal' }
  ];

  const handleCompanySelect = (companyId) => {
    setSelectedCompany(companyId);
  };

  const skillCategories = [
    {
      category: 'FINANCIAL & BUSINESS',
      skills: ['Budgeting & Forecasting', 'Financial Analysis', 'KPI Reporting', 'Cost & Variance Analysis', 'ERP Systems', 'Stakeholder Collaboration']
    },
    {
      category: 'DATA & ANALYTICS',
      skills: ['Fabric', 'Power BI', 'DAX', 'Tabular Editor', 'M / PowerQuery', 'Data Warehousing', 'ETL', 'SQL / NoSQL', 'Spark', 'Lakehouse', 'SAS']
    },
    {
      category: 'PROGRAMMING & DEVELOPMENT',
      skills: ['Python', 'C#', 'YAML', 'RESTful APIs', 'Microservices Architecture', '.NET Framework']
    },
    {
      category: 'MESSAGING & INTEGRATION',
      skills: ['RabbitMQ', 'FastStream', 'Service Communication Patterns']
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ color: colors.text }}
      className="portfolio-container"
    >
      {/* Enhanced Header with Parallax */}
      <motion.div 
        className="portfolio-header"
        style={{ y: smoothHeaderY, opacity: smoothOpacity }}
      >
        <div className="header-content">
          <div className="profile-section">
            <motion.div 
              className="profile-image-container"
              style={{ scale: profileScale }}
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: mousePosition.x * 5,
                rotateX: mousePosition.y * 5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="profile-image-wrapper">
                <img 
                  src={profileImage} 
                  alt="Mathias Porse" 
                  className="profile-image"
                  style={{
                    width: '220px',
                    height: '220px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `3px solid ${colors.primary}`,
                    boxShadow: `0 20px 60px ${colors.shadow}`,
                    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
                  }}
                />
                <div className="profile-glow" style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '-10px',
                  right: '-10px',
                  bottom: '-10px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                  zIndex: -1
                }} />
              </div>
            </motion.div>
            
            <motion.div className="name-section">
              <motion.h1 
                className="main-title"
                style={{ 
                  fontSize: '4rem',
                  fontWeight: '200',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  margin: '0',
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                  lineHeight: '1.1'
                }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                Mathias Porse
              </motion.h1>
              <motion.p 
                className="subtitle"
                style={{ 
                  color: colors.textSecondary,
                  fontSize: '1.3rem',
                  fontWeight: '300',
                  letterSpacing: '0.08em',
                  margin: '15px 0 25px 0',
                  lineHeight: '1.4'
                }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Finance-driven data candidate with a unique mix of controlling, reporting, and technical skills
              </motion.p>
            </motion.div>
          </div>

          {/* Enhanced Contact and Social Links Box */}
          <motion.div 
            className="contact-social-box"
            style={{
              background: getGlassGradient(),
              border: `1px solid rgba(255, 255, 255, 0.2)`,
              borderRadius: '25px',
              padding: '35px',
              boxShadow: `0 20px 60px ${colors.shadow}`,
              backdropFilter: 'blur(20px)',
              marginTop: '40px',
              position: 'relative',
              overflow: 'hidden'
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
          >
            {/* Animated background elements */}
            <div className="glass-bg-elements">
              <div className="bg-circle" style={{ 
                background: `radial-gradient(circle, ${colors.primary}10 0%, transparent 70%)`,
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                filter: 'blur(30px)'
              }} />
              <div className="bg-circle" style={{ 
                background: `radial-gradient(circle, ${colors.secondary}10 0%, transparent 70%)`,
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                filter: 'blur(25px)'
              }} />
            </div>

            <div className="contact-info">
              <motion.div 
                className="contact-item"
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span style={{ color: colors.accent, marginRight: '12px', fontSize: '1.2rem' }}>📧</span>
                <span style={{ color: colors.text, fontWeight: '500' }}>mathiasporse@gmail.com</span>
              </motion.div>
              <motion.div 
                className="contact-item"
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span style={{ color: colors.accent, marginRight: '12px', fontSize: '1.2rem' }}>📱</span>
                <span style={{ color: colors.text, fontWeight: '500' }}>+45 60 14 17 65</span>
              </motion.div>
            </div>
            
            <div className="social-links">
              <motion.h4 
                style={{ 
                  color: colors.secondary, 
                  marginBottom: '20px', 
                  fontSize: '1.1rem', 
                  fontWeight: '600',
                  letterSpacing: '0.05em'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                Connect with me
              </motion.h4>
              <div className="social-buttons">
                <motion.a
                  href="https://github.com/mapooooo/me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button"
                  style={{
                    background: getButtonGradient(),
                    color: colors.highlight,
                    padding: '15px 25px',
                    borderRadius: '15px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: `1px solid rgba(255, 255, 255, 0.2)`,
                    boxShadow: `0 8px 25px ${colors.shadow}`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                  <div className="button-glow" style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.5s'
                  }} />
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/in/mathias-porse-17705781/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button"
                  style={{
                    background: getButtonGradient(),
                    color: colors.highlight,
                    padding: '15px 25px',
                    borderRadius: '15px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: `1px solid rgba(255, 255, 255, 0.2)`,
                    boxShadow: `0 8px 25px ${colors.shadow}`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                  <div className="button-glow" style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.5s'
                  }} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Navigation */}
      <motion.nav variants={itemVariants} className="portfolio-nav">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
            style={{
              background: activeSection === section.id ? getButtonGradient() : 'rgba(255, 255, 255, 0.05)',
              color: activeSection === section.id ? colors.highlight : colors.textSecondary,
              border: `1px solid ${activeSection === section.id ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
              backdropFilter: 'blur(15px)'
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              rotateX: 2,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {section.label}
          </motion.button>
        ))}
      </motion.nav>

      {/* Enhanced Content Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 30, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -30, rotateX: 5 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {activeSection === 'intro' && (
            <motion.div variants={itemVariants} className="intro-section">
              <motion.div
                className="background-card"
                style={{
                  background: getGlassGradient(),
                  border: `1px solid rgba(255, 255, 255, 0.2)`,
                  boxShadow: `0 20px 60px ${colors.shadow}`,
                  backdropFilter: 'blur(20px)'
                }}
                variants={cardVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
              >
                <h2 style={{ color: colors.secondary }}>Background</h2>
                <p>
                  I design automated reporting solutions, financial models, and BI platforms that help 
                  organizations gain clarity across departments. With hands-on experience supporting CFOs 
                  and collaborating across finance, HR, and operations. Equally confident in Excel, ERP 
                  systems, and cloud-based data stacks.
                </p>
              </motion.div>

              <motion.div
                className="education-card"
                style={{
                  background: getGlassGradient(),
                  border: `1px solid rgba(255, 255, 255, 0.2)`,
                  boxShadow: `0 20px 60px ${colors.shadow}`,
                  backdropFilter: 'blur(20px)'
                }}
                variants={cardVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <h2 style={{ color: colors.secondary }}>Education</h2>
                <h3 style={{ color: colors.accent }}>AP FINANCIAL MANAGEMENT</h3>
                <p style={{ color: colors.textSecondary }}>Aarhus | Business Academy Aarhus 2019 - 2021</p>
                <ul>
                  <li>Transferred from University IT program, combining technical foundation with financial expertise</li>
                  <li>Focus on financial management and business administration</li>
                  <li>Relevant coursework: Financial analysis, Business economics, Statistics</li>
                </ul>
              </motion.div>
            </motion.div>
          )}

          {activeSection === 'experience' && (
            <motion.div 
              className="experience-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.h2 
                style={{ 
                  color: colors.secondary, 
                  textAlign: 'center', 
                  marginBottom: '40px',
                  fontSize: '2.5rem',
                  fontWeight: '300',
                  letterSpacing: '0.1em'
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Professional Experience
              </motion.h2>
              
              {/* Company Logos */}
              <CompanyLogos 
                onCompanySelect={handleCompanySelect}
                selectedCompany={selectedCompany}
              />
              
                            {/* Selected Company Details with Globe */}
              {selectedCompany && companyData[selectedCompany] && (
                <motion.div
                  key={selectedCompany}
                  className="experience-card"
                  style={{
                    background: getGlassGradient(),
                    border: `1px solid rgba(255, 255, 255, 0.2)`,
                    boxShadow: `0 20px 60px ${colors.shadow}`,
                    backdropFilter: 'blur(20px)',
                    padding: '40px',
                    borderRadius: '25px',
                    marginTop: '30px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '30px',
                    alignItems: 'start'
                  }}
                  whileHover={{ scale: 1.02, y: -8, rotateX: 3, rotateY: 2 }}
                  initial={{ opacity: 0, y: 30, rotateX: -5 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Left side - Company details */}
                  <div className="company-details">
                    <div className="experience-header">
                      <h3 style={{ color: colors.primary }}>{companyData[selectedCompany].name}</h3>
                      <span style={{ color: colors.accent }}>{companyData[selectedCompany].role}</span>
                    </div>
                    <div className="experience-meta">
                      <span style={{ color: colors.textSecondary }}>{companyData[selectedCompany].period}</span>
                      <span style={{ color: colors.textSecondary }}>{companyData[selectedCompany].location}</span>
                    </div>
                    <div className="experience-description" style={{ color: colors.textSecondary, marginBottom: '25px', lineHeight: '1.7' }}>
                      {companyData[selectedCompany].description}
                    </div>
                    <div>
                      <h4 style={{ color: colors.secondary, marginBottom: '20px', fontSize: '1.3rem', fontWeight: '600' }}>Key Highlights:</h4>
                      <ul>
                        {companyData[selectedCompany].highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                            style={{ marginBottom: '12px', lineHeight: '1.6' }}
                          >
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right side - Interactive Globe */}
                  <div className="globe-container">
                    <h4 style={{ color: colors.secondary, marginBottom: '15px', fontSize: '1.1rem', fontWeight: '600', textAlign: 'center' }}>
                      Project Locations
                    </h4>
                    <InteractiveGlobe selectedCompany={selectedCompany} colors={colors} />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeSection === 'skills' && (
            <motion.div variants={itemVariants} className="skills-section">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.category}
                  className="skill-category"
                  style={{
                    background: getGlassGradient(),
                    border: `1px solid rgba(255, 255, 255, 0.2)`,
                    boxShadow: `0 20px 60px ${colors.shadow}`,
                    backdropFilter: 'blur(20px)'
                  }}
                  variants={cardVariants}
                  whileHover="hover"
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 style={{ color: colors.secondary }}>{category.category}</h3>
                  <div className="skills-grid">
                    {category.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        className="skill-tag"
                        style={{
                          background: getButtonGradient(),
                          color: colors.highlight,
                          border: `1px solid rgba(255, 255, 255, 0.2)`,
                          fontWeight: '600'
                        }}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + i * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        whileHover={{ scale: 1.05, y: -3, rotateX: 2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeSection === 'personal' && (
            <PersonalSection />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Portfolio; 