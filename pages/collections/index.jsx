import styles from "./Collections.module.scss";

import { client } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";
import { useEffect } from "react";
import Head from "next/head";

import { urlFor } from "../../lib/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import FadeIn from "../../animation/FadeIn";
import Header from "../../components/Header/Header";

export default function Collections({ products }) {
  const { setFooterColor } = useStateContext();

  const collections = products
    ?.filter((product) => {
      return product.collections;
    })
    .map((product) => {
      return product.collections[0];
    });

  const collectionSet = [...new Set(collections)];

  useEffect(() => {
    setFooterColor();
  }, []);

  return (
    <>
      <Head>
        <title>Collections | Jazzy Can Knot</title>
      </Head>
      <div className={styles.container}>
        <Header
          title="Collections"
          subtitle={`Showing ${collectionSet.length} collection${
            collectionSet.length === 1 ? "" : "s"
          }`}
        />
        <div className={styles.collections}>
          {collectionSet.map((collection, index) => {
            return (
              <Collection
                key={index}
                collection={collection}
                products={products && products}
              />
            );
          })}
        </div>
      </div>
      <div className="gap" />
    </>
  );
}

function Collection({ collection, products }) {
  const filteredProducts = products?.filter(
    (product) => product.collections && product.collections[0] === collection
  );

  return (
    <Link
      href={"/collections/" + collection.replaceAll(" ", "-").toLowerCase()}
    >
      <div className={styles.collection}>
        <div className={styles.images}>
          {filteredProducts.map((product, index) => (
            <>
              {index < 3 ? (
                <div key={index} className={styles.imageContainer}>
                  <img src={urlFor(product.image[0])} />
                </div>
              ) : (
                ""
              )}
            </>
          ))}
        </div>
        <div className={styles.content}>
          <div className={styles.column}>
            <h5>{collection}</h5>
            <h4 className="dim">{filteredProducts.length} Products</h4>
          </div>
          <div className={styles.column}>
            <h4>
              <FontAwesomeIcon icon={faArrowRight} />
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const getStaticProps = async () => {
  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  return {
    props: { products },
  };
};
