import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { readProductData as fetchProducts, writeUserData as addNewProduct } from '../auth/firebaseAuth';

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({ queryKey: ['products'], queryFn: () => fetchProducts(), staleTime: 1000 * 60 });

  const addProduct = useMutation({
    mutationFn: (product) => addNewProduct(product),
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

  return { productsQuery, addProduct };
}
