import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./DropdownMenu.module.scss";

export default function DropdownMenu({ placeholder, options, size, setSize }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={styles.wrapper}>
      <header>
        <h6>Select Size</h6>
        <h6 className="dim">Size Guide</h6>
      </header>
      <div
        className={styles.dropdown}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <p>{size}</p>
        <FontAwesomeIcon icon={faChevronDown} />
        <div
          className={`${styles.options} ${
            showDropdown ? styles.active : undefined
          }`}
        >
          {options?.map((option) => {
            return <Option option={option} size={size} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Option({ option: { title, price, onClick }, size }) {
  return (
    <div
      className={`${styles.option} ${
        size === title ? styles.active : undefined
      }`}
      onClick={onClick}
    >
      <p>{title}</p>
      <p className="dim">
        ${price} <FontAwesomeIcon icon={faChevronRight} />
      </p>
    </div>
  );
}
