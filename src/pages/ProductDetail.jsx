import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProductDetail() {
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
  }, []);

  return <div>product detail page</div>;
}
