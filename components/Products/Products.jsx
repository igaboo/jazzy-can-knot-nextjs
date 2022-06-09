import styles from "./Products.module.scss";

import { urlFor } from "../../lib/client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { useState } from "react";
import { useEffect } from "react";

import { useRouter } from "next/router";
import { useInView } from "react-cool-inview";
import { useStateContext } from "../../context/StateContext";

export default function Products({ title, products, showButton, max }) {
  const { setNavColor } = useStateContext();

  const { observe, inView, entry } = useInView({
    onEnter: () => setNavColor("#fff"),
    rootMargin: "0px 0px -100%",
  });

  return (
    <div className={styles.container} ref={observe}>
      {title && <h2>{title}</h2>}

      <div className={styles.grid}>
        {products?.map((product, index) => {
          if (index > max - 1) return;

          return <Product key={index} product={product} index={index} />;
        })}
      </div>
      {showButton && (
        <Button text="View All" href="/products" color="#F9FFF6" />
      )}
    </div>
  );
}

function Product({ product }) {
  const { _id, slug, image, name, price, color } = product;

  const router = useRouter();

  const [focusedImage, setFocusedImage] = useState();
  const [hoverColor, setHoverColor] = useState(color + "00");

  useEffect(() => {
    setFocusedImage(image[0]);
  }, [router]);

  return (
    <Link href={`/product/${slug.current}`}>
      <div
        key={_id}
        className={styles.product}
        onMouseEnter={() => {
          setFocusedImage(image[1] ? image[1] : image[0]);
          setHoverColor(color + "10");
        }}
        style={{ backgroundColor: hoverColor }}
        onMouseLeave={() => {
          setFocusedImage(image[0]);
          setHoverColor(color + "00");
        }}
      >
        <img
          id={_id}
          src={urlFor(focusedImage ? focusedImage : image[0])}
          alt="pattern"
        />
        <div className={styles.content}>
          <div>
            <p>{name}</p>
            <p className="dim">
              ${price[0]} - ${price[price.length - 1]}
            </p>
          </div>
          <p>
            <FontAwesomeIcon color={color} icon={faCaretRight} />
          </p>
        </div>
      </div>
    </Link>
  );
}
