import styles from "./Footer.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import Link from "next/link";
import { useStateContext } from "../../context/StateContext";

export default function Footer() {
  const sitemap = ["home", "about", "products", "contact", "cart"];

  const { footerColor } = useStateContext();

  const legal = [
    "return policy",
    "quality guarantee",
    "privacy policy",
    "terms of service",
  ];

  return (
    <footer
      style={{ backgroundColor: footerColor ? footerColor : "#358457" }}
      className={styles.bg}
    >
      <div className={styles.container}>
        <div className={styles.column}>
          <h4>Jazzy Can Knot</h4>
          <div className={styles.links}>
            <Link href="https://www.instagram.com/jazzycanknot">
              <a>
                <h4>
                  <FontAwesomeIcon icon={faInstagram} />
                </h4>
              </a>
            </Link>
            <Link href="https://www.facebook.com/jazzycanknot">
              <a>
                <h4>
                  <FontAwesomeIcon icon={faFacebook} />
                </h4>
              </a>
            </Link>
            <Link href="https://www.twitter.com/jazzycanknot">
              <a>
                <h4>
                  <FontAwesomeIcon icon={faTwitter} />
                </h4>
              </a>
            </Link>
          </div>

          <p>
            Tag me on Instagram using #JazzyCanKnot for a chance to be featured
            on the site!
          </p>
        </div>
        <div className={styles.column}>
          <p className={styles.heading}>Sitemap</p>
          <ul>
            {sitemap.map((link, index) => {
              return (
                <li key={index}>
                  <Link href={`/${link === "home" ? "" : link}`}>
                    <a>{link}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.column}>
          <p className={styles.heading}>Legal</p>
          <ul>
            {legal.map((link, index) => {
              return (
                <li key={index}>
                  <Link href={`/${link.replaceAll(" ", "-")}`}>
                    <a>{link}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.column}>
          <p className={styles.heading}>Newsletter</p>
          <p className={styles.long}>
            I release new patterns every week! Join my newsletter for discounts,
            and to be the first to hear about new drops!
          </p>
          <div className={styles.input}>
            <input type="email" placeholder="Your Email" />
            <button>Sign Up</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
