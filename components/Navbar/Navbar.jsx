import styles from "./Navbar.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useStateContext } from "../../context/StateContext";
import Cart from "../Cart/Cart";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Navbar() {
  const { showCart, setShowCart, totalQuantities, navColor, setNavColor } =
    useStateContext();

  const router = useRouter();

  // useEffect(() => {
  //   if (router.pathname === "/") {
  //     setNavColor("#358457");
  //   } else {
  //     setNavColor("#fff");
  //   }
  // }, [router]);

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.container}>
          <Link href="/">
            <a>
              <h1 className="logo">
                j<span>c</span>k
              </h1>
              <h6>Tie Blankets</h6>
            </a>
          </Link>
          <ul>
            {/* <li
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
            </li> */}
            <li
              className={
                router.pathname === "/reviews" ? styles.active : undefined
              }
            >
              <Link href="/reviews">Reviews</Link>
            </li>
            <li
              className={
                router.pathname === "/products" ? styles.active : undefined
              }
            >
              <Link href="/products">Products</Link>
            </li>
            <li
              className={
                router.pathname === "/collections" ? styles.active : undefined
              }
            >
              <Link href="/collections">Collections</Link>
            </li>
          </ul>
          <ul>
            <li className={styles.cart}>
              <button>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </li>
            <li className={styles.cart}>
              <button onClick={() => setShowCart(true)}>
                <FontAwesomeIcon icon={faBasketShopping} />
                <span>{totalQuantities}</span>
              </button>
            </li>
          </ul>
        </div>
        <Cart showCart={showCart} />
      </div>
    </>
  );
}
