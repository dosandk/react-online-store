import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CardsList from "../../components/cards-list";
import Pagination from "../../components/pagination";
import Card from "../../components/card";
import { removeFromWishList } from '../../reducers/wish-list.js'

import './wish-card.css';

const WishListCard = ({ product, onRemove}) => {
  return <div className="wish-card-container">
    <div className="close-btn" onClick={() => onRemove(product)}>
      <i className="bi bi-x"></i>
    </div>
    <div data-element="card">
      <Card key={product.id} product={product} showFooter={false} />
    </div>
  </div>
}

const WishListPage = () => {
  const pageSize = 3;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const wishList = useSelector(state => state.wishList);
  const totalPages = Math.ceil(wishList.length / pageSize);

  const onPageChanged = useCallback((pageIndex) => {
    setPage(pageIndex + 1);
  }, []);

  const getCardsListData =() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return wishList.slice(start, end);
  };

  const removeProduct = useCallback((product) => {
    dispatch(removeFromWishList(product));
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [wishList])

  return <div className="page-container">
    <h1 className="page-title">WishList</h1>
    {
      wishList.length
      ?
        <>
          <CardsList
            data={getCardsListData()}
            getCard={({key, product }) => {
              return <WishListCard
                key={key}
                product={product}
                onRemove={removeProduct} />
            }}
          />
          <div className="os-products-footer">
            <Pagination activePage={page} totalPages={totalPages} onPageChanged={onPageChanged} />
          </div>
        </>
      : 'There is no data in the wishlist'
    }
  </div>
};

export default WishListPage;
