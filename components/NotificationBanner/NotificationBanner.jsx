import styles from "./NotificationBanner.module.scss";

export default function NotificationBanner() {
  return (
    <div className={styles.container}>
      <h6>
        To celebrate the grand opening of JazzyCanKnot.com, use code TIE2022 for
        10% off at checkout!
      </h6>
    </div>
  );
}
