import styles from "./Index.module.scss";

import {
  Hero,
  ProductBanner,
  Products,
  BulkContact,
  FeaturedPosts,
} from "../components";

import { client } from "../lib/client";
import { useEffect } from "react";
import { useStateContext } from "../context/StateContext";

export default function Index({ products, banner, reviews }) {
  const { setFooterColor } = useStateContext();

  useEffect(() => {
    setFooterColor();
  }, []);

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
      <div className="gap" />
      <div className={styles.products}>
        <Products
          title="Tie Blankets"
          showButton
          products={
            products && products.filter((product) => product.featured === false)
          }
          reviews={reviews && reviews}
        />
      </div>

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

  const reviewsQuery = `*[_type == "review"]`;
  const reviews = await client.fetch(reviewsQuery);

  return {
    props: { products, banner, reviews },
  };
};
