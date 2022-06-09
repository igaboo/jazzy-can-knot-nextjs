import {
  faArrowRight,
  faArrowRightArrowLeft,
  faBellConcierge,
  faLock,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Contact.module.scss";

import Link from "next/link";

export default function Contact() {
  return (
    <div className={styles.container}>
      <header>
        <h1>How can we help?</h1>
        <p>Get in touch and let us know how we can help.</p>
      </header>
      <div className={styles.grid}>
        <div className={styles.card}>
          <p>Support</p>
          <p className="dim">
            Contact our support email for help with returns, refunds, shipping
            info, or any other questions.
          </p>
          <button className="btn-small">
            Email help@jazzycanknot.com <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <div className={styles.card}>
          <p>Business</p>
          <p className="dim">
            Want to work with me? Fantastic! Send me an email for any business
            related inquiries.
          </p>
          <button className="btn-small">
            Email jazzlyn01@live.com <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <div className={styles.card}>
          <p>Legal</p>
          <ul>
            <li className="btn-small">
              <Link href="/return-policy">
                <a>Return Policy</a>
              </Link>
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            </li>
            <li className="btn-small">
              <Link href="/quality-guarantee">
                <a>Quality Guarantee</a>
              </Link>
              <FontAwesomeIcon icon={faMedal} />
            </li>
            <li className="btn-small">
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>
              <FontAwesomeIcon icon={faLock} />
            </li>
            <li className="btn-small">
              <Link href="/terms-of-service">
                <a>Terms of Service</a>
              </Link>
              <FontAwesomeIcon icon={faBellConcierge} />
            </li>
          </ul>
          <p></p>
        </div>
      </div>
    </div>
  );
}
