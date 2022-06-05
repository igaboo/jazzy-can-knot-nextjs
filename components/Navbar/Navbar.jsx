import styles from "./Navbar.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <h1 className="logo">JCK</h1>
        <h6>
          <ul>
            <li>About</li>
            <li>Contact</li>
            <li>Blankets</li>
            <li>
              <FontAwesomeIcon icon={faShoppingCart} />
            </li>
          </ul>
        </h6>
      </div>
    </div>
  );
}
