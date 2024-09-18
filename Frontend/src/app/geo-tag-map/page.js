import styles from '../../styles/GeoMaps.module.css';

export default function GeoTagged() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🗺 Geo-Tagged Site Map</h1>
      <p className={styles.description}>
        View construction sites on a geo-tagged, color-coded map.
      </p>
    </div>
  );
}
