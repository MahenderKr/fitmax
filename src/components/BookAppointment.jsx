// BookAppointment.jsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./BookAppointment.css";

function BookAppointment() {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    type: "",
    text: "",
  });

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    appointment_date: "",
    appointment_time: "",
    service_type: "Diabetic Management",
    user_message: "",
  });

  const appointmentSlots = [
    { value: "10:00", label: "10:00 AM" },
    { value: "10:30", label: "10:30 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "11:30", label: "11:30 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "12:30", label: "12:30 PM" },

    { value: "14:00", label: "2:00 PM" },
    { value: "14:30", label: "2:30 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "15:30", label: "3:30 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "16:30", label: "4:30 PM" },
    { value: "17:00", label: "5:00 PM" },
    { value: "17:30", label: "5:30 PM" },
    { value: "18:00", label: "6:00 PM" },
    { value: "18:30", label: "6:30 PM" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setStatusMessage({
      type: "",
      text: "",
    });

    const SERVICE_ID = "service_c3lg9rc";
    const TEMPLATE_ID = "template_7tpg4ab";
    const PUBLIC_KEY = "2NTor316MjdjyeqoR";

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      setStatusMessage({
        type: "success",
        text: "🎉 Appointment requested successfully! Check your email for confirmation.",
      });

      setFormData({
        user_name: "",
        user_email: "",
        user_phone: "",
        appointment_date: "",
        appointment_time: "",
        service_type: "Diabetic Management",
        user_message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);

      setStatusMessage({
        type: "error",
        text: "❌ Something went wrong. Please try again or email us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="booking-container">
      <div className="booking-card">
        <h2>Book a Consultation Session</h2>

        <p className="booking-subtitle">
          Fill out the form below, and I will get back to you shortly to
          confirm your slot.
        </p>

        {statusMessage.text && (
          <div className={`status-alert ${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className="booking-form"
        >
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
              required
              value={formData.service_type}
              onChange={handleChange}
            >
              <option value="Diabetic Management">
                Diabetic Management 🍏
              </option>

              <option value="Weight Management">
                Weight Management ⚖️
              </option>

              <option value="Blood Report Analysis">
                Blood Report Analysis 🔬
              </option>

              <option value="1-on-1 Live Consulting">
                1-on-1 Live Consulting 💻
              </option>

              <option value="PCOS/Women's Nutrition">
                PCOS/Women's Nutrition 🌸
              </option>

              <option value="Thyroid & Hormonal Health">
                Thyroid & Hormonal Health 🦋
              </option>

              <option value="Gut & Digestive Health">
                Gut & Digestive Health 🌿
              </option>

              <option value="Holistic Wellness">
                Holistic Wellness ✨
              </option>

              <option value="Skin & Hair Health">
                Skin & Hair Health 💧
              </option>

              <option value="Sexual Health">
                Sexual Health ❤️
              </option>
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
                min={today}
                value={formData.appointment_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="appointment_time">
                Preferred Time Slot *
              </label>

              <select
                id="appointment_time"
                name="appointment_time"
                required
                value={formData.appointment_time}
                onChange={handleChange}
              >
                <option value="">Select a time slot</option>

                <optgroup label="Morning Slots">
                  {appointmentSlots
                    .filter((slot) => slot.value < "13:00")
                    .map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                </optgroup>

                <optgroup label="Afternoon & Evening Slots">
                  {appointmentSlots
                    .filter((slot) => slot.value >= "14:00")
                    .map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                </optgroup>
              </select>

              <small className="slot-note">
                Available from 10:00 AM to 7:00 PM. Break: 1:00 PM–2:00 PM.
              </small>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="user_message">
              Additional Notes or Health Goals (Optional)
            </label>

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
            {loading ? "Sending Request..." : "Request Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;