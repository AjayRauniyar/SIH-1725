import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">KaaryaDrishti</Link>
      </div>
      <ul className={styles.navLinks}>
      <li><Link href="/">Home</Link></li>
        <li><Link href="/image-upload">Upload Images</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/alerts">Alerts</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
