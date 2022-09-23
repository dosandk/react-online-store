import React, {useCallback, useEffect, useState} from 'react';
import CartItem from "./cart-item";
import { removeFromCart } from '../../reducers/cart.js';
import {useDispatch} from "react-redux";

import './cart-style.css';

const countTotal = (data = []) => {
  return data.reduce((accum, item) => {
    return accum + item.price;
  }, 0);
};

const Cart = ({data = []}) => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts(data);
  }, [data])

  useEffect(() => {
    const total = countTotal(products);

    setTotalPrice(total)
  }, [products]);

  const updateTotal = (newPrice) => {
    setTotalPrice(total => {
      return total + newPrice;
    });
  };

  const removeProduct = useCallback((id = '') => {
    const product = products.find(item => item.id === id);

    dispatch(removeFromCart(product));
  }, [products, dispatch]);

  const items = products.map(product => {
    return <CartItem
      key={product.id}
      product={product}
      removeProduct={removeProduct}
      updateTotal={updateTotal} />
  });

  return <div className="cart-container">
    <ul className="cart-list">
      { items }
    </ul>
    <div className="footer">
      <div className="cart-total">
        Total products: <span>{ totalPrice }</span>
      </div>
      {/* NOTE: temporary commented */}
      {/* <button class="order-btn os-btn-primary" data-element="orderBtn">Order</button> */}
    </div>
  </div>
};

export default Cart;
