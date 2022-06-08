import styles from "./Index.module.scss";

import {
  Hero,
  ProductBanner,
  Products,
  BulkContact,
  FeaturedPosts,
} from "../components";

import { client } from "../lib/client";

export default function Index({ products, banner }) {
  return (
    <>
      <Hero banner={banner && banner[0]} />
      {products
        .filter((product) => product.featured === true)
        .map((product) => {
          return (
            <ProductBanner key={product._id} product={product && product} />
          );
        })}
      <div className={styles.gap} />
      <Products
        title="Tie Blankets"
        showButton
        products={
          products && products.filter((product) => product.featured === false)
        }
      />
      <BulkContact />
      <FeaturedPosts />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  return {
    props: { products, banner },
  };
};
