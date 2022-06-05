import styles from "./Hero.module.scss";

import { urlFor } from "../../lib/client";

import { Button } from "../";

export default function Hero({ banner }) {
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{banner.title}</h1>
          <p>{banner.desc}</p>
          <Button
            text={banner.buttonText}
            href={`/products/${banner.product}`}
          />
        </div>
        <div className={styles.imageContainer}>
          <img src={urlFor(banner.image)} alt="blanket pattern" />
        </div>
      </div>
    </div>
  );
}
