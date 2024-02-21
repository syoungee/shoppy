import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, addOrUpdateToCart, removeFromCart } from '../auth/firebaseAuth';

export default function useCarts() {
  const queryClient = useQueryClient();
  const cartsQuery = useQuery({ queryKey: ['carts'], queryFn: (userId) => getCart(userId), staleTime: 1000 * 60 });

  const updateCartItem = useMutation({
    mutationFn: ({ userId, product }) => addOrUpdateToCart(userId, product),
    onSuccess: () => queryClient.invalidateQueries(['carts']),
  });
  
  const removeCartItem = useMutation({
    mutationFn: ({ userId, productId }) => removeFromCart(userId, productId),
    onSuccess: () => queryClient.invalidateQueries(['carts']),
  });
  return {
    cartsQuery,
    updateCartItem,
    removeCartItem,
  };
}
