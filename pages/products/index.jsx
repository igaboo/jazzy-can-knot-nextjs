import styles from "./Products.module.scss";

import { client } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";

import { useEffect } from "react";

import Header from "../../components/Header/Header";
import { BulkContact, Products as ProductsList } from "../../components";

import { useInView } from "react-cool-inview";

export default function Products({ products, reviews }) {
  const { setFooterColor } = useStateContext();

  useEffect(() => {
    setFooterColor();
  }, []);

  const { observe, inView, entry } = useInView();

  return (
    <>
      <div className={styles.container}>
        <div ref={observe} />
        <Header
          title="Tie Blankets"
          subtitle={`Showing ${products.length} blankets`}
        />
        <ProductsList products={products} reviews={reviews} />
      </div>
      <BulkContact />
    </>
  );
}

export const getServerSideProps = async () => {
  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  const reviewsQuery = `*[_type == "review"]`;
  const reviews = await client.fetch(reviewsQuery);

  return {
    props: { products, reviews },
  };
};
