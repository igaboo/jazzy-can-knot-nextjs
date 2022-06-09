import styles from "./Cart.module.scss";

import { useRef, useEffect, useState } from "react";

import Link from "next/link";

import { useStateContext } from "../../context/StateContext";
import { urlFor } from "../../lib/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faShoppingCart,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

import getStripe from "../../lib/getStripe";
import toast from "react-hot-toast";

export default function Cart({ showCart }) {
  const cartRef = useRef();

  const { totalPrice, totalQuantities, cartItems, setShowCart, onRemove } =
    useStateContext();

  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    }

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [cartRef]);

  return (
    <div
      className={`${styles.wrapper} ${showCart && styles.active}`}
      ref={cartRef}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <p>
            <button onClick={() => setShowCart(false)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            Your Basket {`(${totalQuantities} items)`}
          </p>
        </header>
        <main>
          {cartItems.length < 1 && (
            <div className={styles.emptyState}>
              <FontAwesomeIcon icon={faShoppingCart} size="6x" />
              <h2>Your Basket is Empty!</h2>
              <p>
                Once you&apos;ve added some items to your cart, they will appear
                here.
              </p>
              <Link href="/">
                <a>
                  <button
                    className="btn-primary"
                    onClick={() => setShowCart(false)}
                  >
                    Keep Looking
                  </button>
                </a>
              </Link>
            </div>
          )}
          {cartItems.length >= 1 &&
            cartItems.map((product, index) => (
              <div className={styles.product} key={index}>
                <div className={styles.imageContainer}>
                  <img src={urlFor(product?.image[0])} />
                </div>
                <div className={styles.content}>
                  <header>
                    <div>
                      <p>{product.name}</p>
                      <p className="dim">${product.price}</p>
                    </div>
                    <h4>
                      <button
                        onClick={() =>
                          onRemove(product, cartItems.indexOf(product))
                        }
                      >
                        <FontAwesomeIcon icon={faXmarkCircle} />
                      </button>
                    </h4>
                  </header>
                  <h6>
                    {product.size === "B" && "Baby - 1x1 yard"}
                    {product.size === "S" && "Small - 2x2 yards"}
                    {product.size === "M" && "Medium - 3x3 yards"}
                    {product.size === "L" && "Large - 4x4 yards"}
                  </h6>
                </div>
              </div>
            ))}
        </main>
        {cartItems.length >= 1 && (
          <footer>
            <div className={styles.totalContainer}>
              <p>Total</p>
              <p>${totalPrice}</p>
            </div>
            <button
              disabled={loading}
              className="btn-secondary"
              onClick={handleCheckout}
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  Check out <FontAwesomeIcon icon={faArrowRight} />
                </>
              )}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
