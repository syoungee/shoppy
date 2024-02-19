import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addOrUpdateToCart } from '../auth/firebaseAuth';
import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';

export default function ProductDetail() {
  const location = useLocation();
  const { uid } = useAuthContext();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);

  const handleClick = () => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    mutation.mutate(product);
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      return addOrUpdateToCart(uid, data);
    },
    onSuccess: async () => {
      console.log("I'm first!");
    },
    onSettled: async () => {
      console.log("I'm second!");
    },
  });

  const handleOptionChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <>
      <div className="flex">
        <img className="w-full px-4 basis-2/3" src={`${image}`} alt={description}></img>
        <div className="w-1/3 p-3">
          <h2 className="text-3xl font-bold py-2 border-b border-gray-400">{title}</h2>
          <p>{category}</p>
          <p className="py-4 text-lg">{description}</p>
          <p>${price}</p>
          <br />
          <div className="mb-4 flex items-center">
            <label htmlFor="options" className="text-brand font-bold">
              옵션:
            </label>
            <select
              name="options"
              id="options"
              className={`p-2 m-4 flex-1 border ${
                selected ? 'border-solid' : 'border-dashed'
              } border-brand focus:outline-none focus:border-brand-dark rounded-sm`}
              onChange={handleOptionChange}
              value={selected}
            >
              <option value="" className="text-brand">
                선택하세요
              </option>
              {options.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {mutation.isLoading && <p>Adding product...</p>}
          {mutation.isSuccess && <p>✅Added to cart!</p>}
          <button className="bg-brand text-white w-full py-2 px-4 rounded-sm hover:brightness-110" onClick={handleClick}>
            장바구니에 추가
          </button>
        </div>
      </div>
    </>
  );
}
