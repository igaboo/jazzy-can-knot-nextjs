import styles from "./Product.module.scss";

import { client, urlFor } from "../../lib/client";

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Products } from "../../components";
import { useStateContext } from "../../context/StateContext";

import Head from "next/head";

export default function ProductDetails({ product, products }) {
  const { image, name, details, price, color } = product;
  const { quantity, onAdd, setShowCart, setFooterColor } = useStateContext();

  const router = useRouter();

  const [size, setSize] = useState("S");
  const [currentImage, setCurrentImage] = useState(image[0]);

  useEffect(() => {
    setCurrentImage(image[0]);
    setFooterColor(color);
  }, [router]);

  return (
    <>
      <Head>
        <title>{name} | Jazzy Can Knot</title>
        <meta name="theme-color" content={color} />
      </Head>
      <div className={styles.grid}>
        <div className={styles.imageContainer}>
          {image?.map((image, index) => (
            <img
              key={index}
              src={urlFor(image)}
              alt="preview"
              // style={{
              //   backgroundColor: color + "20",
              // }}
            />
          ))}
        </div>
        <div className={styles.content}>
          <button className="dim" onClick={() => router.back()}>
            <h6>
              <FontAwesomeIcon icon={faArrowLeft} size="sm" />
              Back
            </h6>
          </button>
          <h1>{name}</h1>
          <h3>
            $
            {
              price[
                size === "B"
                  ? 0
                  : size === "S"
                  ? 1
                  : size === "M"
                  ? 2
                  : size === "L"
                  ? 3
                  : 0
              ]
            }
          </h3>
          <h5 className="dim">
            {size === "B" && "Baby - 1x1 yard"}
            {size === "S" && "Small - 2x2 yards"}
            {size === "M" && "Medium - 3x3 yards"}
            {size === "L" && "Large - 4x4 yards"}
          </h5>
          <p>{details}</p>

          <div className={styles.sizeSelector}>
            <header>
              <h5>Select Size</h5>
              <h5 className="dim">Size Guide</h5>
            </header>
            <main>
              <button
                onClick={() => {
                  setSize("B");
                }}
                className={`btn-secondary ${size === "B" && styles.active}`}
              >
                B
              </button>
              <button
                onClick={() => {
                  setSize("S");
                }}
                className={`btn-secondary ${size === "S" && styles.active}`}
              >
                S
              </button>
              <button
                onClick={() => {
                  setSize("M");
                }}
                className={`btn-secondary ${size === "M" && styles.active}`}
              >
                M
              </button>
              <button
                onClick={() => {
                  setSize("L");
                }}
                className={`btn-secondary ${size === "L" && styles.active}`}
              >
                L
              </button>
            </main>
          </div>

          <div className={styles.buttons}>
            <button
              className="btn-primary"
              onClick={() => {
                setShowCart(true);
                onAdd(
                  {
                    ...product,
                    price:
                      price[
                        size === "B"
                          ? 0
                          : size === "S"
                          ? 1
                          : size === "M"
                          ? 2
                          : size === "L"
                          ? 3
                          : 0
                      ],
                    size,
                  },
                  quantity
                );
              }}
            >
              Add to Cart
            </button>
            <button className="btn-secondary">Share</button>
          </div>
        </div>
      </div>
      <div className={styles.mobileGrid}>
        <img src={urlFor(currentImage)} alt="preview" />
        <div className={styles.imageContainer}>
          {image?.map((image, index) => {
            return (
              <img
                style={{
                  backgroundColor:
                    currentImage === image ? color + "30" : "#ebebeb16",
                }}
                key={index}
                src={urlFor(image)}
                alt="preview"
                onMouseEnter={() => setCurrentImage(image)}
              />
            );
          })}
        </div>
        <div className={styles.content}>
          <button className="dim" onClick={() => router.back()}>
            <h6>
              <FontAwesomeIcon icon={faArrowLeft} size="sm" />
              Back
            </h6>
          </button>
          <h1>{name}</h1>
          <h3>
            $
            {
              price[
                size === "B"
                  ? 0
                  : size === "S"
                  ? 1
                  : size === "M"
                  ? 2
                  : size === "L"
                  ? 3
                  : 0
              ]
            }
          </h3>
          <h5 className="dim">
            {size === "B" && "Baby - 1x1 yard"}
            {size === "S" && "Small - 2x2 yards"}
            {size === "M" && "Medium - 3x3 yards"}
            {size === "L" && "Large - 4x4 yards"}
          </h5>
          <p>{details}</p>

          <div className={styles.sizeSelector}>
            <header>
              <h5>Select Size</h5>
              <h5 className="dim">Size Guide</h5>
            </header>
            <main>
              <button
                onClick={() => {
                  setSize("B");
                }}
                className={`btn-secondary ${size === "B" && styles.active}`}
              >
                B
              </button>
              <button
                onClick={() => {
                  setSize("S");
                }}
                className={`btn-secondary ${size === "S" && styles.active}`}
              >
                S
              </button>
              <button
                onClick={() => {
                  setSize("M");
                }}
                className={`btn-secondary ${size === "M" && styles.active}`}
              >
                M
              </button>
              <button
                onClick={() => {
                  setSize("L");
                }}
                className={`btn-secondary ${size === "L" && styles.active}`}
              >
                L
              </button>
            </main>
          </div>

          <div className={styles.buttons}>
            <button
              className="btn-primary"
              onClick={() => {
                setShowCart(true);
                onAdd(
                  {
                    ...product,
                    price:
                      price[
                        size === "B"
                          ? 0
                          : size === "S"
                          ? 1
                          : size === "M"
                          ? 2
                          : size === "L"
                          ? 3
                          : 0
                      ],
                    size,
                  },
                  quantity
                );
              }}
            >
              Add to Cart
            </button>
            <button className="btn-secondary">Share</button>
          </div>
        </div>
      </div>
      <div className="gap" />
      <Products title="You Might Also Like" products={products} max={3} />
      <div className="gap" />
    </>
  );
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const productsQuery = `*[_type == "product" && slug.current != '${slug}']`;
  const orderedProducts = await client.fetch(productsQuery);

  function shuffleArray(array) {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  }

  const products = shuffleArray(orderedProducts);

  return {
    props: { product, products },
  };
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
