import React from "react";
import './footer.css';

const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='footer-title'>
        By: Tommy Forde
      </div>
      <div>
        <a href='https://github.com/tforde4623/TheBeans'>
          <i className="footer-link fab fa-github fa-lg"></i>
        </a>
        <a href='https://www.linkedin.com/in/tommyforde/'>
          <i className="footer-link fab fa-linkedin fa-lg"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
