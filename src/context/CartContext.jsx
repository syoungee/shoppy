import { createContext, useContext, useEffect, useState } from 'react';
import { getCart } from '../auth/firebaseAuth';
import { useAuthContext } from './AuthContext';
import { useQuery } from '@tanstack/react-query';

const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { uid } = useAuthContext();

  const { data: cartData } = useQuery({
    queryKey: ['carts'],
    queryFn: () => getCart(uid),
  });

  return <CartContext.Provider value={{ cartData }}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  return useContext(CartContext);
}
