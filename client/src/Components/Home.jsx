// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Blackhole for your voice</h1>
          <p className="hero-subtitle">Anonymous, secure, and trusted whistleblowing for employees and clients.</p>
          <Link to="/report">
            <button className="hero-button">Get Started</button>
          </Link>
        </div>
        <svg className="hero-wave" height="80" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#6366f1" fillOpacity="0.08" d="M0,64L48,58.7C96,53,192,43,288,53.3C384,64,480,96,576,101.3C672,107,768,85,864,74.7C960,64,1056,64,1152,69.3C1248,75,1344,85,1392,90.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </section>

      {/* Trust & Security Section */}
      <section className="trust-section">
        <h2 className="section-title">Trust & Security</h2>
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon">🔒</div>
            <h3 className="card-title">End-to-End Encryption</h3>
            <p className="card-text">Your data is encrypted at every step of the process.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">🛡️</div>
            <h3 className="card-title">Anonymous Reporting</h3>
            <p className="card-text">We never collect or store identifying information.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">✅</div>
            <h3 className="card-title">Compliance Ready</h3>
            <p className="card-text">Fully compliant with global privacy regulations.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <p className="section-text">Submit a report anonymously → Admin reviews and updates status → Clients get anonymized insights.</p>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section">
        <h2 className="section-title">Why Choose Vortex?</h2>
        <ul className="why-list">
          <li className="why-item">✅ 100% Anonymous Reporting</li>
          <li className="why-item">✅ Real-Time Complaint Tracking</li>
          <li className="why-item">✅ Tailored Client Dashboards</li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Clients Say</h2>
        <blockquote className="testimonial-quote">"Vortex gave our employees a safe way to speak up. Highly recommended!" – HR Manager, IKEA</blockquote>
      </section>

      {/* FAQs Section */}
      <section className="faqs-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faqs-content">
          <div className="faq-item">
            <h4 className="faq-question">Is my identity truly anonymous?</h4>
            <p className="faq-answer">Yes, we do not collect or store any identifying information.</p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">Who can access my report?</h4>
            <p className="faq-answer">Only verified admins can view submitted reports.</p>
          </div>
        </div>
      </section>

      {/* Legal & Privacy Section */}
      <section className="legal-section">
        <h2 className="section-title">Legal & Privacy</h2>
        <p className="section-text">We comply with GDPR and relevant whistleblowing regulations. All data is handled with care and confidentiality.</p>
      </section>
    </div>
  );
};

export default Home;