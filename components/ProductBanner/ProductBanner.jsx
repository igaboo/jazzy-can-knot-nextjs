import styles from "./ProductBanner.module.scss";

import { urlFor } from "../../lib/client";
import Button from "../Button/Button";
import { useStateContext } from "../../context/StateContext";
import { useInView } from "react-cool-inview";

export default function ProductBanner({ product }) {
  const { slug, image, name, details, price, color } = product;

  const { setNavColor } = useStateContext();

  const { observe, inView, entry } = useInView({
    onEnter: () => setNavColor(color),
    rootMargin: "0px 0px -94% ",
  });

  return (
    <div ref={observe} style={{ backgroundColor: color }} className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={urlFor(image && image[0])} alt="pattern" />
        </div>

        <div className={styles.content}>
          <h1>{name}</h1>
          <p>{details}</p>
          <Button
            text="View Pattern"
            href={`/product/${slug.current}`}
            // color={color}
          />
        </div>
      </div>
    </div>
  );
}
