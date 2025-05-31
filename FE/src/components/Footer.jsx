// Footer.jsx
import React from 'react';

const Footer = () => (
  <footer className="footer">
    <p className="footer-text">
      © {new Date().getFullYear()} Vortex Inc. | <a href="#legal" className="footer-link">Privacy Policy</a>
    </p>
  </footer>
);

export default Footer;