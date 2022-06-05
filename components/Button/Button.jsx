import styles from "./Button.module.scss";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Button({ text, href, color }) {
  return (
    <Link href={href}>
      <button className={styles.button}>
        <h4>
          {text}
          <FontAwesomeIcon icon={faArrowRight} />
        </h4>
      </button>
    </Link>
  );
}
