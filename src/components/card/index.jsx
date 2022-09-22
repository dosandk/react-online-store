import {useSelector, useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../../reducers/cart.js'
import {addToWishList, removeFromWishList} from '../../reducers/wish-list.js'
import {useNotification} from "../notification/provider";

import './card.css';

const CardFooter = ({product}) => {
  const wishList = useSelector(state => state.wishList);
  const cart = useSelector(state => state.cart);
  const {notify} = useNotification();
  const dispatch = useDispatch();

  const cartProducts = cart.map(product => product.id);
  const wishlistProducts = wishList.map(product => product.id);

  const updateWishList = (event) => {
    const isActive = event.target.classList.toggle('active');

    const action = isActive ? 'added' : 'removed';
    const message = `Product "${product.title}" was successfully ${action} to wishlist`;

    notify(message);

    if (isActive === false) {
      dispatch(removeFromWishList(product));
    }

    if (isActive === true) {
      dispatch(addToWishList(product));
    }
  };

  const updateCart = (event) => {
    const isActive = event.target.classList.toggle('active');

    const action = isActive ? 'added' : 'removed';
    const message = `Product "${product.title}" was successfully ${action} to cart`;

    notify(message);

    if (isActive === false) {
      dispatch(removeFromCart(product));
    }

    if (isActive === true) {
      dispatch(addToCart(product));
    }
  };

  const isActive = (selected) => {
    return selected.includes(product.id) ? 'active' : '';
  };

  return (
    <footer className="os-product-footer">
      <button
        onClick={updateWishList}
        className={`os-btn-default add-to-wishlist-btn ${isActive(wishlistProducts)}`}>
        <i className="bi bi-heart"></i>
        <i className="bi bi-heart-fill"></i>
        Wishlist
      </button>
      <div className="btns-separator"></div>
      <button
        onClick={updateCart}
        className={`os-btn-default add-to-cart-btn ${isActive(cartProducts)}`}>
        <i className="bi bi-cart"></i>
        <i className="bi bi-cart-check-fill"></i>
        Cart
      </button>
    </footer>
  );
}

const Card = ({product = {}, showFooter = true}) => {
  const {rating = '', price = '', title = '', description = '', images = []} = product;

  const shortDescription = description.slice(0, 50) + '...';

  return <div className="os-product-card">
    <div className="os-product-img" style={{backgroundImage: `url(${images[0].url})`}}></div>

    <div className="os-product-content">
      <div className="os-product-price-wrapper">
        <div className="os-product-rating">
          <span>{rating}</span>
          <i className="bi bi-star"></i>
        </div>

        <div className="os-product-price">{price} USD</div>
      </div>

      <h5 className="os-product-title">{title}</h5>
      <p className="os-product-description">{shortDescription}</p>
    </div>
    {showFooter ? <CardFooter product={product}/> : null}
  </div>
}

export default Card;
