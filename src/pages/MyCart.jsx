import React from 'react';
import { getCart } from '../auth/firebaseAuth';
import { useAuthContext } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineDelete } from 'react-icons/ai';

export default function Cart() {
  const { uid } = useAuthContext();

  const { isLoading, data: cartData } = useQuery({
    queryKey: ['carts'],
    queryFn: () => getCart(uid),
  });

  if (isLoading) return <p>Loading...</p>;

  // Check if cartData has products
  const hasProducts = cartData && cartData.length > 0;
  const sum = cartData.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0);

  return (
    <div className="container mx-auto my-8 p-8 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {hasProducts ? (
        <ul>
          {cartData.map((product) => (
            <li key={product.id} className="mb-4 border-b pb-4 flex items-center justify-between relative">
              <div className="w-1/7">
                <img src={product.image} className="object-cover h-20 w-20" alt={product.title} />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-xl font-semibold">{product.title}</p>
                <p className="text-gray-600">{product.name}</p>
                <p className="text-gray-600">option: {product.option}</p>
                <p className="text-gray-700">Quantity: {product.quantity}</p>
                <p className="">Price: ${product.price}</p>
              </div>
              <button className="text-gray-500 flex items-center">
                <AiOutlineDelete size={20} />
              </button>
            </li>
          ))}
          <div className="mt-8">
            <p className="text-xl font-bold">Total: ${sum}</p>
          </div>
        </ul>
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
}
