import React from 'react'
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {currentYear} Abby's Toy Store. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
