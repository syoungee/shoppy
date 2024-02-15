import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartData, setCartData] = useState([1, 2, 3]);

  useEffect(() => {}, []);

  return <CartContext.Provider value={{ cartData, setCartData }}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  return useContext(CartContext);
}
