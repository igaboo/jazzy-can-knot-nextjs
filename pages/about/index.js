import styles from "./About.module.scss";

import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import Image from "next/image";
import SlideUp from "../../animation/SlideUp";
import FadeIn from "../../animation/FadeIn";

export default function About() {
  return (
    <div className={styles.container}>
      <FadeIn>
        <div className={styles.column}>
          <Image src="/images/about.jpg" width={597} height={448} />
        </div>
      </FadeIn>

      <FadeIn>
        <div className={styles.column}>
          <h1>Hi, I&apos;m Jazzy! 👋</h1>
          <p>
            Here you should write a short about section, detailing who you are
            and why you&apos;re making and selling blankets - something along
            those lines. It can take up as much room as it needs, the section
            will accommodate for whatever size, but I&apos;m expecting it to be
            around 5 or 6 lines.
          </p>
          <p>
            Follow me on <FontAwesomeIcon icon={faInstagram} />
            <Link href="https://www.instagram.com/jazzycanknot">Instagram</Link>
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
