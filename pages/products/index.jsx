import styles from "./Products.module.scss";

import { Products as ProductsList } from "../../components";

import { client } from "../../lib/client";

export default function Products({ products }) {
  return (
    <>
      <div className={styles.container}>
        <h1>Tie Blankets</h1>
        <h5 className="dim">Showing {products.length} blankets</h5>
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
