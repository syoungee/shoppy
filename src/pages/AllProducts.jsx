import React from 'react';
import { readProductData } from '../auth/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Banner from '../components/Banner';

export default function Products() {
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ['products'],
    queryFn: readProductData,
  });

  const handleClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
    window.scrollTo(0, 0);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Banner />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {products &&
            products.map((item, index) => (
              <div
                key={item.id}
                className="bg-white p-4 border border-gray-100 shadow-md rounded-md flex flex-col justify-between cursor-pointer trainsition-all hover:scale-105"
                onClick={() => handleClick(item)}
              >
                <div className="w-full relative mb-2">
                  <img src={item.image} alt={item.category} className="w-full h-300 object-cover rounded-md" />
                </div>
                <div className="w-full h-300">
                  <p className="text-lg font-bold mb-2">{item.title}</p>
                  <p className="text-gray-600">{item.category}</p>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
