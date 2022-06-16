import styles from "./Products.module.scss";

import { Products as ProductsList } from "../../components";

import { client } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";
import { useEffect } from "react";
import Header from "../../components/Header/Header";

export default function Products({ products, reviews }) {
  const { setFooterColor } = useStateContext();

  useEffect(() => {
    setFooterColor();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Header
          title="Tie Blankets"
          subtitle={`Showing ${products.length} blankets`}
        />
        <ProductsList products={products} reviews={reviews} />
        <div className="gap" />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  const reviewsQuery = `*[_type == "review"]`;
  const reviews = await client.fetch(reviewsQuery);

  return {
    props: { products, reviews },
  };
};
