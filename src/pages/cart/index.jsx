import React from 'react';
import Cart from "../../components/cart";
import {useSelector} from "react-redux";

const CartPage = () => {
  const cart = useSelector(state => state.cart);

  return <div className="page-container">
    <h1 className="page-title">Cart</h1>
    <Cart data={cart} />
  </div>
};

export default CartPage;
