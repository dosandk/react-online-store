import React from 'react';

const Card = ({
  rating = '',
  price = '',
  title = '',
  description = '',
  images = []
} = {}) => {
  return <div className="os-product-card">
    <div className="os-product-img" style={{backgroundImage: `url(${images[0].url})`}}></div>

    <div className="os-product-content">
      <div className="os-product-price-wrapper">
        <div className="os-product-rating">
          <span>{ rating }</span>
          <i className="bi bi-star"></i>
        </div>

        <div className="os-product-price">{ price } USD</div>
      </div>

      <h5 className="os-product-title">{ title }</h5>
      <p className="os-product-description">{ description }</p>
    </div>

    <footer className="os-product-footer">
      <button className="os-btn-default">
        <i className="bi bi-heart"></i>
        Wishlist
      </button>

      <button className="os-btn-primary" data-element="addToCartBtn">
        <i className="bi bi-box-seam"></i>
        Add To Cart
      </button>
    </footer>
  </div>
};

export default Card;
