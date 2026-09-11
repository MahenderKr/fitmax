// Contact.jsx
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './BookAppointment.css'; // Import the CSS for styling

function BookAppointment() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    appointment_date: '',
    appointment_time: '',
    service_type: 'Diabetic Consulting',
    user_message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    // Your live EmailJS Service and Template IDs applied directly:
    const SERVICE_ID = 'service_c3lg9rc';
    const TEMPLATE_ID = 'template_7tpg4ab';
    
    // ⚠️ PASTE YOUR PUBLIC KEY FROM EMAILJS ACCOUNT SETTINGS HERE:
    const PUBLIC_KEY = '2NTor316MjdjyeqoR'; 

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatusMessage({
          type: 'success',
          text: '🎉 Appointment requested successfully! Check your email for confirmation.'
        });
        // Reset form inputs
        setFormData({
          user_name: '',
          user_email: '',
          user_phone: '',
          appointment_date: '',
          appointment_time: '',
          service_type: 'Diabetic Consulting',
          user_message: ''
        });
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setStatusMessage({
          type: 'error',
          text: '❌ Something went wrong. Please try again or email us directly.'
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <div className="booking-container">
      <div className="booking-card">
        <h2>Book a Consultation Session</h2>
        <p className="booking-subtitle">Fill out the form below, and I will get back to you shortly to confirm your slot.</p>

        {statusMessage.text && (
          <div className={`status-alert ${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        )}

        <form ref={formRef} onSubmit={handleFormSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="user_name">Full Name *</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              required
              value={formData.user_name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="user_email">Email Address *</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                value={formData.user_email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="user_phone">Phone Number *</label>
              <input
                type="tel"
                id="user_phone"
                name="user_phone"
                required
                value={formData.user_phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="service_type">Select Service *</label>
            <select
              id="service_type"
              name="service_type"
              value={formData.service_type}
              onChange={handleChange}
            >
              <option value="Diabetic Consulting">Diabetic Management 🍏</option>           
              <option value="Blood Report Analysis">Long Term Weight Management 🔬</option>
              <option value="1-on-1 Live Consulting">PCOS/Women's Nutrition 💻</option>
              <option value="1-on-1 Live Consulting">Thyroid & Hormonal Health 💻</option>
              <option value="1-on-1 Live Consulting">Gut & Digestive Health 💻</option>
             <option value="1-on-1 Live Consulting">Holistic Wellness 💻</option>
               <option value="Sexual Health Consulting">Sexual Health Consulting 🌱</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="appointment_date">Preferred Date *</label>
              <input
                type="date"
                id="appointment_date"
                name="appointment_date"
                required
                min={new Date().toISOString().split('T')[0]} // Fixed split array element pointer
                value={formData.appointment_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="appointment_time">Preferred Time *</label>
              <input
                type="time"
                id="appointment_time"
                name="appointment_time"
                required
                value={formData.appointment_time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="user_message">Additional Notes or Health Goals (Optional)</label>
            <textarea
              id="user_message"
              name="user_message"
              rows="4"
              value={formData.user_message}
              onChange={handleChange}
              placeholder="Tell me a bit about what you want to focus on..."
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Sending Request...' : 'Request Appointment'}
          </button>
        </form>
      </div>
    </div>
  );

}

export default BookAppointment;
