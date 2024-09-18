import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.left}>
          <h4>About KaaryaDrishti</h4>
          <p>
            KaaryaDrishti is an AI-powered platform designed to streamline construction monitoring, progress tracking, and compliance.
          </p>
        </div>
        <div className={styles.right}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            {/* Use actual icons here */}
            <a href="#"><img src="/icons/facebook.jpg" alt="Facebook" /></a>
            <a href="#"><img src="/icons/twitter.jpg" alt="Twitter" /></a>
            <a href="#"><img src="/icons/linkedin.png" alt="LinkedIn" /></a>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>© 2024 KaaryaDrishti | Smart Construction Monitoring</p>
      </div>
    </footer>
  );
};

export default Footer;
