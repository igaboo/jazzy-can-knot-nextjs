import styles from "./BulkContact.module.scss";

import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintbrush, faPalette } from "@fortawesome/free-solid-svg-icons";

export default function BulkContact() {
  return (
    <div className={styles.container}>
      <h1>
        <FontAwesomeIcon icon={faPalette} size="xl" />
      </h1>
      <h2>Looking for something more customizable?</h2>
      <p>
        Contact me to request a custom made order, which will allow you to
        choose the front and back patterns, as well as the size.
      </p>
      <Button text="Request Custom Order" href="/contact" color="#e6ffda" />
    </div>
  );
}
