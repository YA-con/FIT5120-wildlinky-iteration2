import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>

        <div className={styles.left}>
          <h2>WildLinky</h2>
          <p>Connecting people to protect Australia's forests and wildlife.</p>
        </div>

        <div className={styles.middle}>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">FAQ</a>
        </div>

        <div className={styles.right}>
          <p>© 2025 WildLinky</p>
          <p>Designed for SDG 15 | Based in Australia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
