import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProductDetail() {
  const location = useLocation();
  const [productData, setProductData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    setProductData(location.state?.item);
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h3>product detail page</h3>
      {productData && (
        <div className="flex">
          <img className="w-full px-4 basis-2/3" src={`${productData.image}`} alt={productData.description}></img>
          <div className="w-1/3 p-3">
            <h2 className="text-3xl font-bold py-2 border-b border-gray-400">{productData.title}</h2>
            <p>{productData.category}</p>
            <p className="py-4 text-lg">{productData.description}</p>
            <p>${productData.price}</p>
            <br />
            <div className="mb-4 flex items-center">
              <label htmlFor="options" className="text-brand font-bold">
                옵션:
              </label>
              <select
                name="options"
                id="options"
                className={`p-2 m-4 flex-1 border ${
                  selectedOption ? 'border-solid' : 'border-dashed'
                } border-brand focus:outline-none focus:border-brand-dark rounded-sm`}
                onChange={handleOptionChange}
                value={selectedOption}
              >
                <option value="" className="text-brand">
                  선택하세요
                </option>
                {productData.options.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <button className="bg-brand text-white w-full py-2 px-4 rounded-sm hover:brightness-110">장바구니에 추가</button>
          </div>
        </div>
      )}
    </div>
  );
}
