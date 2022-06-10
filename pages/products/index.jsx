import styles from "./Products.module.scss";

import { Products as ProductsList } from "../../components";

import { client } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";
import { useEffect } from "react";
import FadeIn from "../../animation/FadeIn";

export default function Products({ products }) {
  const { setFooterColor } = useStateContext();

  useEffect(() => {
    setFooterColor();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <FadeIn>
          <h1>Tie Blankets</h1>
          <h5 className="dim">Showing {products.length} blankets</h5>
        </FadeIn>
      </div>
      <ProductsList products={products} />
      <div className="gap" />
    </>
  );
}

export const getStaticProps = async () => {
  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  return {
    props: { products },
  };
};
