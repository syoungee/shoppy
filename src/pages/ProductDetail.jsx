import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProductDetail() {
  const location = useLocation();
  const [productData, setProductData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    setProductData(location.state?.key);
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h3>product detail page</h3>
      {productData && (
        <div className="flex">
          <img className="w-2/3" src={`${productData.image}`} alt={productData.description}></img>
          <div className="w-1/3 p-3">
            <p>{productData.category}</p>
            <p>{productData.description}</p>
            <p>{productData.price}</p>
            <br />
            <div className="mb-4">
              <label htmlFor="options" className="text-brand block">
                옵션:
              </label>
              <select
                name="options"
                id="options"
                className={`mt-1 block w-full py-2 px-4 border ${selectedOption ? 'border-solid' : 'border-dashed'} border-brand focus:outline-none focus:border-brand-dark rounded-sm`}
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
