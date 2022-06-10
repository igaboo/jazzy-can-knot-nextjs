import styles from "./BulkContact.module.scss";

import Button from "../Button/Button";
import FadeIn from "../../animation/FadeIn";

export default function BulkContact() {
  return (
    <FadeIn>
      <div className={styles.container}>
        <h2>Looking to buy in bulk?</h2>
        <p>
          Gifting the entire family tie blankets? What a lucky bunch! Contact me
          ahead of time to ensure availability, as well as to discuss pricing,
          and turn around times.
        </p>
        <Button text="Contact Me" href="/contact" color="#F9FFF6" />
      </div>
    </FadeIn>
  );
}
