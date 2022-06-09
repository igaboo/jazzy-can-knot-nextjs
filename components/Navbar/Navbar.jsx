import styles from "./Navbar.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useStateContext } from "../../context/StateContext";
import Cart from "../Cart/Cart";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Navbar() {
  const { showCart, setShowCart, totalQuantities, navColor, setNavColor } =
    useStateContext();

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      setNavColor("#358457");
    } else {
      setNavColor("#fff");
    }
  }, [router]);

  return (
    <>
      <div
        style={{
          backgroundColor: navColor,
          color: navColor !== "#fff" ? "white" : "black",
        }}
        className={styles.bg}
      >
        <div className={styles.container}>
          <Link href="/">
            <a>
              <h1 className="logo">JCK</h1>
            </a>
          </Link>
          <h6>
            <ul>
              <li
                className={
                  router.pathname === "/about" ? styles.active : undefined
                }
              >
                <Link href="/about">About</Link>
              </li>
              <li
                className={
                  router.pathname === "/contact" ? styles.active : undefined
                }
              >
                <Link href="/contact">Contact</Link>
              </li>
              <li
                className={
                  router.pathname === "/products" ? styles.active : undefined
                }
              >
                <Link href="/products">Products</Link>
              </li>
              <li className={styles.cart}>
                <button onClick={() => setShowCart(true)}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span>{totalQuantities}</span>
                </button>
              </li>
            </ul>
          </h6>
        </div>
        <Cart showCart={showCart} />
      </div>
    </>
  );
}
