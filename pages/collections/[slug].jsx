import styles from "./Collections.module.scss";

import { Products as ProductsList } from "../../components";

import { client } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";
import { useEffect } from "react";
import Head from "next/head";

import { urlFor } from "../../lib/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Products({ products }) {
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
        <header>
          <button className="dim" onClick={() => router.back()}>
            <p>
              <FontAwesomeIcon icon={faChevronLeft} /> <span>Back</span>
            </p>
          </button>
          <h1>{collection}</h1>
        </header>
        <h5 className="dim">
          Showing {filteredProducts.length} product
          {filteredProducts.length === 1 ? "" : "s"}
        </h5>
      </div>
      <ProductsList products={filteredProducts} />
      <div className="gap" />
    </>
  );
}

export const getStaticProps = async ({ params: slug }) => {
  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  return {
    props: { products },
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
