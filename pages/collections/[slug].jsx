import styles from "./Collections.module.scss";

import { Products as ProductsList } from "../../components";

import { client } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";
import { useEffect } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import Header from "../../components/Header/Header";

export default function Products({ products, reviews }) {
  const { setFooterColor } = useStateContext();

  const router = useRouter();

  const { slug } = router.query;

  const collection = slug
    .replaceAll("-", " ")
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");

  const filteredProducts = products?.filter(
    (product) => product.collections[0] === collection
  );

  useEffect(() => {
    setFooterColor();
  }, []);

  return (
    <>
      <Head>
        <title>{collection} | Jazzy Can Knot</title>
      </Head>
      <div className={styles.container}>
        <Header
          title={collection}
          subtitle={`Showing ${filteredProducts.length} product${
            filteredProducts.length === 1 ? "" : "s"
          }`}
        />

        <ProductsList products={filteredProducts} reviews={reviews} />
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

export const getStaticPaths = async () => {
  const query = `*[_type == "product" ] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products?.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
