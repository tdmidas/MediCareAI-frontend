import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section contact">
            <h2>Contact Us</h2>
            <p>Email: info@yourmedicalwebapp.com</p>
            <p>Phone: +123-456-7890</p>
            <p>Location: 123 Medical Street, City, Country</p>
          </div>
          <div className="footer-section social">
            <h2>Follow Us</h2>
            <ul className="social-links">
              <li><a href="https://www.facebook.com/yourmedicalwebapp" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.instagram.com/yourmedicalwebapp" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              {/* Add more social media links as needed */}
            </ul>
          </div>
        </div>
        <p className="copyright">&copy; 2024 MediCareAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
