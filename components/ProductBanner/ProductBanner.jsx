import styles from "./ProductBanner.module.scss";

import { urlFor } from "../../lib/client";
import Button from "../Button/Button";

export default function ProductBanner({ product }) {
  const { slug, image, name, details, price, color } = product;
  return (
    <div style={{ backgroundColor: color }} className={styles.bg}>
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
