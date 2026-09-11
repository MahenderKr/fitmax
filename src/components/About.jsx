import React from 'react';
import './About.css'; 
import rajiImage from '../assets/raji.jpeg'; // 1. IMPORT YOUR IMAGE HERE

function About() {
  const socials = [
    { name: 'Instagram', url: 'https://instagram.com', icon: '📸', handle: '@rajis.nourish.hub' },
    { name: 'LinkedIn', url: 'https://LinkedIn.com', icon: '💼', handle: "rajalakshmi-muthukrishnan-7969b3190" }
  ];

  const credentials = {
  education: [
    {
      degree: "M.Sc. in Dietetics and Applied Nutrition",
      institution: "Manipal University",
      year: "2022 - 2024",
    },
  ],
  experience: [
    {
      role: "Corporate Nutritionist",
      company: "TVS Motor Company",
      period: "Present",
    },
  ],
};

  return (
    <div className="about-container">
      {/* Hero Section with Image and Bio */}
      <section className="about-hero">

        <div className="profile-image-card">
          <div className="image-wrapper">
            {/* 2. USE THE IMPORTED IMAGE VARIABLE HERE */}
            <img 
              src={rajiImage} 
              alt="Raji - Nutritionist" 
              className="profile-img"
            />
          </div>
        </div>

        {/* Bio Content */}
        <div className="bio-content">
          <h2>About Me</h2>
          <p className="subtitle">Hi, I'm Raji — your guide to holistic wellness and vibrant living.</p>
          <p className="bio-text">
            Welcome! I am Raji, your nutrition guide at Nourish Hub. With a deep passion for science-backed 
            nutrition, I help individuals take control of their health through custom nutrition planning, 
            lifestyle adaptations, and comprehensive lab analyses.
          </p>

          {/* Social Links Cards */}
          <div className="social-links-grid">
            {socials.map((social) => (
              <a 
                key={social.name} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-card"
              >
                <span className="social-icon">{social.icon}</span>
                <div className="social-info">
                  <span className="social-platform">{social.name}</span>
                  <span className="social-handle">{social.handle}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Grid for Education & Experience */}
      <section className="credentials-section">
        <div className="credentials-grid">

          {/* Education Box */}
          <div className="credential-block">
            <h3>🎓 Education</h3>
            <div className="timeline">
              {credentials.education.map((edu, index) => (
                <div key={index} className="timeline-item">
                  <span className="timeline-date">{edu.year}</span>
                  <h4>{edu.degree}</h4>
                  <p>{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Box */}
          <div className="credential-block">
            <h3>💼 Professional Experience</h3>
            <div className="timeline">
              {credentials.experience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <span className="timeline-date">{exp.period}</span>
                  <h4>{exp.role}</h4>
                  <p>{exp.company}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default About;