import { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [navColor, setNavColor] = useState("#358457");

  function onAdd(product, quantity) {
    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantities((prev) => prev + quantity);
    setCartItems([{ ...product }, ...cartItems]);
  }

  function onRemove(product, index) {
    setTotalPrice((prev) => prev - product.price * quantity);
    setTotalQuantities((prev) => prev - quantity);

    cartItems.splice(index, 1);

    setCartItems([...cartItems]);
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        quantity,
        onAdd,
        onRemove,
        navColor,
        setNavColor,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
