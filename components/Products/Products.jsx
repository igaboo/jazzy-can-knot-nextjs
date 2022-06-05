import styles from "./Products.module.scss";

import { urlFor } from "../../lib/client";
import Link from "next/link";

export default function Products({ title, products }) {
  return (
    <>
      <h2>{title}</h2>
      <div className={styles.grid}>
        {products?.map((product) => {
          const { _id, slug, image, name, price } = product;
          return (
            <Link href={`/product/${slug.current}`}>
              <div key={_id} className={styles.product}>
                <img
                  src={urlFor(image && image[0])}
                  width={441}
                  height={499}
                  alt="pattern"
                />
                <div className={styles.content}>
                  <div>
                    <p>{name}</p>
                    <p>${price}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
