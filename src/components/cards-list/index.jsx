import React, {useEffect, useState} from 'react';

import './card-list.css';

const CardsList = ({ data = [], getCard}) => {
  const [products, setProduct] = useState(data);

  useEffect(() => {
    setProduct(data);
  }, [data]);

  return <div className="os-products-list">
    {
      products.map(product => {
        return getCard({key: product.id, product });
      })
    }
  </div>;
};

export default CardsList;
