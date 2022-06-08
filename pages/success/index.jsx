import styles from "./Success.module.scss";

import { useEffect } from "react";
import Link from "next/link";
import { useStateContext } from "../../context/StateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function Success() {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faCircleCheck} size="5x" />
      <h1>Thank you for your order!</h1>
      <p>
        Check your email for your order&apos;s receipt. If you have any
        questions, please email me at{" "}
        <a href="mailto:jadenwatsond@gmail.com">jadenwatsond@gmail.com.</a>
      </p>
      <Link href="/">
        <a>
          <button className="btn-primary">Continue Shopping</button>
        </a>
      </Link>
    </div>
  );
}
