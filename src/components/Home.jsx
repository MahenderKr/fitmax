import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const services = [
    { id: 1, title: 'Diabetic Consulting', description: 'Personalized meal planning...', icon: '🍏' },
    { id: 2, title: 'Sexual Health Consulting', description: 'Nutritional strategies...', icon: '🌱' },
    { id: 3, title: 'Blood Report Analysis', description: 'In-depth feedback...', icon: '🔬', path: '/blood-report' },
    { id: 4, title: '1-on-1 Live Consulting', description: 'Direct, real-time...', icon: '💻' }
  ];

  const navigate = useNavigate();

  const handleCardClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Transform Your Health Through Nutrition</h1>
          <p>Expert guidance tailored to your body, your lab results, and your lifestyle.</p>
        </div>
      </header>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="section-header">
          <h2>My Services</h2>
          <p>Comprehensive consulting to help you achieve your wellness goals.</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`service-card ${service.path ? 'clickable' : ''}`}
              onClick={() => handleCardClick(service.path)}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;