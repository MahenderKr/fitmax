import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
 const services = [
  {
    id: 1,
    title: "Diabetic Management",
    description:
      "Personalized nutrition and lifestyle guidance to help manage blood sugar, improve energy, and support better diabetes control.",
    icon: "🍏",
  },
  {
    id: 2,
    title: "Weight Management",
    description:
      "Sustainable nutrition strategies designed to support healthy weight loss or weight gain without extreme diets or restrictions.",
    icon: "🌱",
  },
  {
    id: 3,
    title: "Self-Blood Report Analysis",
    description:
      "Detailed interpretation of your blood reports with practical nutrition recommendations to support your overall health.",
    icon: "🔬",
    path: "/blood-report",
  },
  {
    id: 4,
    title: "1-on-1 Live Consulting",
    description:
      "Personalized, real-time guidance to discuss your health goals, clarify concerns, and create an actionable nutrition plan.",
    icon: "💻",
  },
  {
    id: 5,
    title: "PCOS/Women's Nutrition",
    description:
      "Tailored nutrition and lifestyle support to help manage PCOS symptoms, improve hormonal balance, and support women's health.",
    icon: "🌸",
  },
  {
    id: 6,
    title: "Thyroid & Hormonal Health",
    description:
      "Personalized dietary guidance to support thyroid function, hormonal balance, metabolism, and everyday well-being.",
    icon: "⚖️",
  },
  {
    id: 7,
    title: "Gut & Digestive Health",
    description:
      "Nutrition strategies to support digestion and help manage bloating, constipation, acidity, IBS symptoms, and gut discomfort.",
    icon: "🌿",
  },
  {
    id: 8,
    title: "Holistic Wellness",
    description:
      "A complete wellness approach combining nutrition, lifestyle habits, sleep, stress management, and healthy daily routines.",
    icon: "✨",
  },
  {
    id: 9,
    title: "Skin & Hair Health",
    description:
      "Nutritional support focused on healthy skin, stronger hair, and identifying diet and lifestyle factors that affect appearance.",
    icon: "💧",
  },
  {
    id: 10,
    title: "Sexual Health",
    description:
      "Confidential nutrition and lifestyle guidance to support hormonal health, energy, vitality, and overall sexual well-being.",
    icon: "❤️",
  },
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