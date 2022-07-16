import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider, useSelector} from 'react-redux';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import store from './store/index.js';
import {NotificationsProvider} from "./components/notification/provider";

import OnlineStorePage from "./pages/main/index.jsx";
import WishListPage from "./pages/wishlist/index.jsx";
import CartPage from "./pages/cart/index.jsx";
import Page404 from "./pages/error404";

import './styles/style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Navigation = () => {
  const cartProducts = useSelector(state => state.cart);
  const wishListProducts = useSelector(state => state.wishList);

  return <ul className="sidebar__nav" data-element="navigation">
    <li>
      <Link to="/" className="link-unstyled">
        <i className="bi bi-shop"></i><span>Products</span>
      </Link>
    </li>
    <li>
      <Link to="/wishlist" className="link-unstyled">
        <i className="bi bi-star"></i>Wishlist <span>{wishListProducts.length}</span>
      </Link>
    </li>
    <li>
      <Link to="/cart" className="link-unstyled">
        <i className="bi bi-cart"></i>Cart <span>{cartProducts.length}</span>
      </Link>
    </li>
  </ul>
};

root.render(
  // NOTE: Pattern. Decorator
  <Provider store={store}>
    <BrowserRouter>
      <NotificationsProvider>
        <div className="os-container">
          <main className="os-products">
            <aside className="sidebar">
              <h2 className="sidebar__title" data-element="title">
                <Link className="link-unstyled" to="/">Online Store</Link>
              </h2>
              <Navigation/>
            </aside>

            <section id="page-content">
              <Routes>
                <Route path="/" element={<OnlineStorePage/>}/>
                <Route path="wishlist" element={<WishListPage/>}/>
                <Route path="cart" element={<CartPage/>}/>
                <Route path="*" element={<Page404/>}/>
              </Routes>
            </section>
          </main>
        </div>
      </NotificationsProvider>
    </BrowserRouter>
  </Provider>
);
