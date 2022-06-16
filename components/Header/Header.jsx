import styles from "./Header.module.scss";

export default function Header({ title, subtitle }) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <h5 className="dim">{subtitle}</h5>
    </header>
  );
}
