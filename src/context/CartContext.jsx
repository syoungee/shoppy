import { createContext, useContext, useEffect, useState } from 'react';
import { readCartData } from '../auth/firebaseAuth';

const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartData, setCartData] = useState();

  const getCartData = async () => {
    const data = await readCartData();
    setCartData(data);
  };

  useEffect(() => {
    getCartData();
  }, []);

  return <CartContext.Provider value={{ cartData, setCartData }}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  return useContext(CartContext);
}
