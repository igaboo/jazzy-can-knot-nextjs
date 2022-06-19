import styles from "./Button.module.scss";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Button({ text, href, color }) {
  return (
    <Link href={href}>
      <button
        style={{
          backgroundColor: color ? color : "#ffffff31",
          color: color ? "#000" : "#fff",
        }}
        className={`${styles.button} ${color ? styles.color : styles.solid}`}
      >
        <h4>
          {text}
          <FontAwesomeIcon icon={faArrowRight} />
        </h4>
      </button>
    </Link>
  );
}
