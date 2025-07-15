import React from 'react';
import { motion } from 'framer-motion';
import { getThemeColors } from './theme';

// Import company logos
import datamindsLogo from './data/references/dataminds.svg';
import ifactLogo from './data/references/ifact.png';
import riskvilleLogo from './data/references/riskville.svg';
import sindicoLogo from './data/references/sindico.svg';

const CompanyLogos = ({ onCompanySelect, selectedCompany }) => {
  const colors = getThemeColors();
  
  const companies = [
    { id: 'dataminds', name: 'DATAMINDS', logo: datamindsLogo, period: '2024 - Now' },
    { id: 'ifact', name: 'IFACT', logo: ifactLogo, period: '2023 - 2024' },
    { id: 'sindico', name: 'SINDICO', logo: sindicoLogo, period: '2022 - 2023' },
    { id: 'riskville', name: 'RISKVILLE', logo: riskvilleLogo, period: '2020 - 2022' }
  ];

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { scale: 1.05, y: -5 },
    selected: { scale: 1.1, y: -8 }
  };

  return (
    <div className="company-logos-container">

      <div className="logos-grid">
        {companies.map((company, index) => (
          <motion.div
            key={company.id}
            className={`company-logo-wrapper ${selectedCompany === company.id ? 'selected' : ''}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: selectedCompany === company.id ? 1.1 : 1, 
              opacity: 1,
              y: selectedCompany === company.id ? -8 : 0
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => onCompanySelect(company.id)}
            style={{
              background: selectedCompany === company.id 
                ? `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.secondary}20 100%)`
                : 'transparent',
              border: `2px solid ${selectedCompany === company.id ? colors.accent : colors.border}`,
              boxShadow: selectedCompany === company.id 
                ? `0 8px 32px ${colors.shadow}`
                : `0 4px 16px ${colors.shadow}`
            }}
          >
            <div className="logo-container">
              <img 
                src={company.logo} 
                alt={`${company.name} logo`}
                className="company-logo"
                style={{
                  filter: selectedCompany === company.id ? 'brightness(1.2)' : 'brightness(1)'
                }}
                onError={(e) => {
                  console.log(`Failed to load logo for ${company.name}`);
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="company-info">
              <span className="company-name" style={{ color: colors.text }}>
                {company.name}
              </span>
              <span className="company-period" style={{ color: colors.textSecondary }}>
                {company.period}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CompanyLogos; 