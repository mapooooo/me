import React, { useEffect, useRef, useState, useCallback } from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence } from "framer-motion";

const InteractiveGlobe = ({ selectedCompany, colors }) => {
  const canvasRef = useRef();
  const globeRef = useRef();
  const animationRef = useRef();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isGlobeReady, setIsGlobeReady] = useState(false);

  // Project data for each company
  const companyProjects = {
    dataminds: [
      { lat: 56.2639, lng: 9.5018, country: "Denmark", count: 45, project: "Financial Analytics Platform", company: "Dataminds", image: "🇩🇰" },
      { lat: 25.2048, lng: 55.2708, country: "Saudi Arabia", count: 25, project: "MENA Region Dashboard", company: "Dataminds", image: "🇸🇦" },
      { lat: 24.7136, lng: 46.6753, country: "Riyadh", count: 15, project: "Saudi Market Analysis", company: "Dataminds", image: "🏛️" },
      { lat: 55.6761, lng: 12.5683, country: "Copenhagen", count: 30, project: "Nordic Finance Tools", company: "Dataminds", image: "🏙️" },
    ],
    ifact: [
      { lat: 56.2639, lng: 9.5018, country: "Denmark", count: 35, project: "Danish Market Solutions", company: "Ifact", image: "🇩🇰" },
      { lat: 55.6761, lng: 12.5683, country: "Copenhagen", count: 25, project: "Local Finance Platform", company: "Ifact", image: "🏙️" },
      { lat: 57.7089, lng: 11.9746, country: "Gothenburg", count: 10, project: "Swedish Integration", company: "Ifact", image: "🇸🇪" },
    ],
    sindico: [
      { lat: 56.2639, lng: 9.5018, country: "Denmark", count: 40, project: "Danish Operations", company: "Sindico", image: "🇩🇰" },
      { lat: 35.8617, lng: 104.1954, country: "China", count: 8, project: "Asian Market Entry", company: "Sindico", image: "🇨🇳" },
      { lat: 35.6762, lng: 139.6503, country: "Japan", count: 6, project: "Japanese Partnership", company: "Sindico", image: "🇯🇵" },
      { lat: 1.3521, lng: 103.8198, country: "Singapore", count: 5, project: "SEA Expansion", company: "Sindico", image: "🇸🇬" },
    ],
    riskville: [
      { lat: 48.3794, lng: 31.1656, country: "Ukraine", count: 20, project: "Ukrainian Risk Assessment", company: "Riskville", image: "🇺🇦" },
      { lat: 55.1694, lng: 23.8813, country: "Lithuania", count: 12, project: "Baltic Region Analysis", company: "Riskville", image: "🇱🇹" },
      { lat: 53.3498, lng: -6.2603, country: "Ireland", count: 15, project: "Irish Market Study", company: "Riskville", image: "🇮🇪" },
      { lat: 1.2921, lng: 36.8219, country: "Kenya", count: 8, project: "East Africa Expansion", company: "Riskville", image: "🇰🇪" },
      { lat: 9.0820, lng: 8.6753, country: "Nigeria", count: 6, project: "West Africa Operations", company: "Riskville", image: "🇳🇬" },
    ]
  };

  const currentProjects = companyProjects[selectedCompany] || [];

  // Enhanced coordinate conversion using spherical-to-cartesian principles
  const locationToAngles = useCallback((lat, lng) => {
    // Convert to radians
    const latRad = lat * (Math.PI / 180);
    const lngRad = lng * (Math.PI / 180);
    
    // Convert to spherical coordinates for the globe
    // phi: longitude (around the equator)
    // theta: latitude (from pole to pole)
    const phi = Math.PI - (lngRad - Math.PI / 2);
    const theta = latRad;
    
    return [phi, theta];
  }, []);

  // Convert project data to markers format with enhanced positioning
  const markers = currentProjects.map(project => ({
    location: [project.lat, project.lng],
    size: 0.12,
    project: project
  }));

  // Smooth rotation function
  const smoothRotateTo = useCallback((targetPhi, targetTheta) => {
    if (!globeRef.current) return;

    let currentPhi = globeRef.current.phi || 0;
    let currentTheta = globeRef.current.theta || 0.3;
    const doublePi = Math.PI * 2;
    
    const animate = () => {
      // Calculate the shortest angular distance
      let deltaPhi = targetPhi - currentPhi;
      if (deltaPhi > Math.PI) deltaPhi -= doublePi;
      if (deltaPhi < -Math.PI) deltaPhi += doublePi;
      
      // Smooth interpolation with easing
      const easing = 0.04; // Slower easing for smoother animation
      currentPhi += deltaPhi * easing;
      currentTheta = currentTheta * (1 - easing) + targetTheta * easing;
      
      // Normalize phi to [0, 2π]
      currentPhi = ((currentPhi % doublePi) + doublePi) % doublePi;
      
      // Update globe state
      globeRef.current.phi = currentPhi;
      globeRef.current.theta = currentTheta;
      
      // Continue animation if not close enough
      if (Math.abs(deltaPhi) > 0.01 || Math.abs(targetTheta - currentTheta) > 0.01) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animate();
  }, []);

  useEffect(() => {
    let width = 0;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    
    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers: markers,
      onRender: (state) => {
        // Store current state for external access
        globeRef.current = state;
        
        // Only update if we have stored values
        if (globeRef.current.phi !== undefined) {
          state.phi = globeRef.current.phi;
          state.theta = globeRef.current.theta;
        }
        
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    // Set initial state
    globeRef.current = { phi: 0, theta: 0.3 };

    // Fade in the canvas after a short delay
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
        setIsGlobeReady(true);
      }
    }, 100);

    return () => { 
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [selectedCompany, markers]);

  // Handle location selection
  const handleLocationClick = useCallback((project) => {
    const [targetPhi, targetTheta] = locationToAngles(project.lat, project.lng);
    smoothRotateTo(targetPhi, targetTheta);
    setSelectedPoint(project);
  }, [locationToAngles, smoothRotateTo]);

  return (
    <div style={{ width: "100%" }}>
      <motion.div 
        style={{ 
          position: "relative", 
          width: "100%", 
          height: "350px",
          borderRadius: "15px",
          overflow: "hidden",
          background: "radial-gradient(ellipse at center, rgba(10, 10, 26, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)",
          border: `1px solid rgba(255, 255, 255, 0.15)`,
          backdropFilter: "blur(15px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div style={{
          width: "300px",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "100%",
              contain: "layout paint size",
              opacity: 0,
              transition: "opacity 1s ease",
            }}
          />
        </div>

        {/* Company indicator */}
        <motion.div 
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            color: colors.highlight,
            padding: "8px 15px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            border: `1px solid rgba(255, 255, 255, 0.2)`,
            backdropFilter: "blur(10px)"
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {selectedCompany.charAt(0).toUpperCase() + selectedCompany.slice(1)}
        </motion.div>

        {/* Location buttons */}
        <div style={{
          position: "absolute",
          bottom: 15,
          left: 15,
          right: 15,
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: "center"
        }}>
          {currentProjects.map((project, index) => (
            <motion.button
              key={index}
              onClick={() => handleLocationClick(project)}
              style={{
                background: "rgba(155, 155, 155, 0.2)",
                borderRadius: "9px",
                padding: "4px 8px",
                cursor: "pointer",
                border: "none",
                color: "white",
                fontSize: "10px",
                fontWeight: "500",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
              whileHover={{ scale: 1.05, background: "rgba(155, 155, 155, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              📍 {project.country}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Detailed Project Information Box */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            style={{
              marginTop: "20px",
              background: "linear-gradient(135deg, #034c36 0%, #003332 100%)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "16px",
              padding: "24px",
              color: "#fff",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              position: "relative",
              overflow: "hidden"
            }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Close button */}
            <motion.button
              onClick={() => setSelectedPoint(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)"
              }}
              whileHover={{ scale: 1.1, background: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              ×
            </motion.button>

            {/* Header with flag and location */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "32px", marginRight: "16px" }}>{selectedPoint.image}</span>
              <div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: "24px", 
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #fff 0%, #e0e0e0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
                  {selectedPoint.country}
                </h3>
                <p style={{ 
                  margin: "4px 0 0 0", 
                  fontSize: "14px", 
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: "500"
                }}>
                  {selectedPoint.company} • {selectedPoint.count} Projects
                </p>
              </div>
            </div>

            {/* Project details */}
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ 
                margin: "0 0 12px 0", 
                fontSize: "18px", 
                color: "#fff",
                fontWeight: "600"
              }}>
                Project Focus: {selectedPoint.project}
              </h4>
              
              {/* Dummy content - you can replace this with real project details */}
              <div style={{ 
                background: "rgba(255, 255, 255, 0.05)", 
                borderRadius: "12px", 
                padding: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <p style={{ 
                  margin: "0 0 12px 0", 
                  fontSize: "14px", 
                  lineHeight: "1.6",
                  color: "rgba(255, 255, 255, 0.9)"
                }}>
                  This project represents our strategic expansion into the {selectedPoint.country} market, 
                  focusing on {selectedPoint.project.toLowerCase()}. We've established strong local partnerships 
                  and implemented cutting-edge solutions tailored to regional requirements.
                </p>
                
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ 
                    background: "rgba(255, 255, 255, 0.1)", 
                    padding: "8px 12px", 
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.8)"
                  }}>
                    🚀 Active Development
                  </div>
                  <div style={{ 
                    background: "rgba(255, 255, 255, 0.1)", 
                    padding: "8px 12px", 
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.8)"
                  }}>
                    📊 Analytics Platform
                  </div>
                  <div style={{ 
                    background: "rgba(255, 255, 255, 0.1)", 
                    padding: "8px 12px", 
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.8)"
                  }}>
                    🌍 Local Integration
                  </div>
                </div>
              </div>
            </div>

            {/* Key metrics */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", 
              gap: "12px",
              marginTop: "20px"
            }}>
              <div style={{ 
                background: "rgba(255, 255, 255, 0.08)", 
                padding: "12px", 
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <div style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>
                  {selectedPoint.count}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
                  Active Projects
                </div>
              </div>
              <div style={{ 
                background: "rgba(255, 255, 255, 0.08)", 
                padding: "12px", 
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <div style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>
                  12
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
                  Team Members
                </div>
              </div>
              <div style={{ 
                background: "rgba(255, 255, 255, 0.08)", 
                padding: "12px", 
                borderRadius: "10px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <div style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>
                  98%
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
                  Success Rate
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveGlobe; 