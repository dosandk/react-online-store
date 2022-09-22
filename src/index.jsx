import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import {Provider, useSelector} from 'react-redux';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import store from './store/index.js';
import {NotificationsProvider} from "./components/notification/provider";

import './styles/style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Navigation = () => {
  const cartProducts = useSelector(state => state.cart);
  const wishListProducts = useSelector(state => state.wishList);

  return <ul className="sidebar__nav">
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

const OnlineStorePage = lazy(() => import('./pages/main/index.jsx'));
const WishListPage = lazy(() => import('./pages/wishlist/index.jsx'));
const CartPage = lazy(() => import('./pages/cart/index.jsx'));
const Page404 = lazy(() => import('./pages/error404/index.jsx'));

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
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<OnlineStorePage/>}/>
                  <Route path="wishlist" element={<WishListPage/>}/>
                  <Route path="cart" element={<CartPage/>}/>
                  <Route path="404" element={<Page404/>}/>
                  <Route path="*" element={<Page404/>}/>
                </Routes>
              </Suspense>
            </section>
          </main>
        </div>
      </NotificationsProvider>
    </BrowserRouter>
  </Provider>
);
