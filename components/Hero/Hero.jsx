import styles from "./Hero.module.scss";

import { urlFor } from "../../lib/client";

import { Button } from "../";
import { useInView } from "react-cool-inview";
import { useStateContext } from "../../context/StateContext";

export default function Hero({ banner }) {
  const { setNavColor } = useStateContext();

  const { observe, inView, entry } = useInView({
    onEnter: () => setNavColor("#358457"),
    rootMargin: "0px 0px -100%",
  });

  return (
    <div ref={observe} className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{banner.title}</h1>
          <p>{banner.desc}</p>
          <Button text={banner.buttonText} href={`/products`} />
        </div>
        <div className={styles.imageContainer}>
          <img src={urlFor(banner.image)} alt="blanket pattern" />
        </div>
      </div>
    </div>
  );
}
