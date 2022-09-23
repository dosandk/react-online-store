import React, {useEffect, useRef, useState} from "react";

const CartItem = ({product = {}, updateTotal, removeProduct }) => {
  const [count, setCount] = useState(1);
  const {id = '', images = [], title, price = 0 } = product;
  const prevCount = useRef(null);

  const addCount = () => {
    setCount(count => {
      prevCount.current = count;
      return count + 1;
    });
  };

  const removeCount = () => {
    setCount(count => {
      prevCount.current = count;
      return count - 1;
    })
  };

  useEffect(() => {
    if (prevCount.current === null) return;

    if (count === 0) {
      return removeProduct(id);
    }

    const newPrice = (count - prevCount.current) * price;

    updateTotal(newPrice);
    // eslint-disable-next-line
  }, [count]);

  return (
    <li className="item-row">
      <div className="item-preview">
        <img src={images[0].url} alt={title} />
      </div>
      <div className="item-name">
        {title}
      </div>
      <div className="item-counter">
        <button className="count-btn" onClick={removeCount}>
          <i className="bi bi-dash-circle"></i>
        </button>
        <span>{count}</span>
        <button className="count-btn" onClick={addCount}>
          <i className="bi bi-plus-circle"></i>
        </button>
      </div>
      <div className="item-price">
        {price * count}
      </div>
    </li>
  );
};

export default CartItem;
