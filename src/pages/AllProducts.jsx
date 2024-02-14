import React, { useState, useEffect } from 'react';
import { readProductData } from '../auth/firebaseAuth';

export default function Products() {
  const [products, setProducts] = useState([]);

  const getProductData = async () => {
    const productData = await readProductData();
    setProducts(Object.values(productData));
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
      <div className="relative mb-8">
        <img
          src={`https://shop-phinf.pstatic.net/20240211_137/1707621324873JvaCA_JPEG/%C1%A6%B8%F1%C0%BB_%C0%D4%B7%C2%C7%D8%C1%D6%BC%BC%BF%E4_-001_%281%29.jpg?type=m10000_10000`}
          alt="Banner"
          className="w-full h-400 object-cover"
        />
        {/* <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">Products Page</h1> */}
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {products &&
            products.map((item, index) => (
              <div key={index} className="bg-white p-4 border border-gray-100 shadow-md rounded-md flex flex-col justify-between">
                <div className="w-full relative mb-2">
                  <img src={item.image} alt={item.category} className="w-full h-300 object-cover rounded-md" />
                </div>
                <div className="w-full h-300">
                  <p className="text-lg font-bold mb-2">{item.category}</p>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
