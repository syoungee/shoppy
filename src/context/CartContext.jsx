import { createContext, useContext, useEffect, useState } from 'react';
import { getCart } from '../auth/firebaseAuth';
import { useAuthContext } from './AuthContext';

const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartData, setCartData] = useState();
  const { uid } = useAuthContext();

  const getCartData = async () => {
    const data = await getCart(uid);
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
