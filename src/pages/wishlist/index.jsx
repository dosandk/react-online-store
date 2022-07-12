import React, {useCallback, useState} from 'react';
import { useSelector } from 'react-redux';
import CardsList from "../../components/cards-list";
import Pagination from "../../components/pagination";
import Card from "../../components/card";

const WishListPage = () => {
  const [page, setPage] = useState(1);
  const wishList = useSelector(state => state.wishList);
  const pageSize = 3;
  const totalPages = Math.ceil(wishList.length / pageSize)

  const onPageChanged = (pageIndex) => {
    setPage(pageIndex + 1);
  };

  const getCardsListData = useCallback(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return wishList.slice(start, end);
  }, [page, wishList]);

  return <div className="page-container">
    <h1 className="page-title">WishList</h1>
    {
      wishList.length
      ?
        <>
          <CardsList data={getCardsListData()} showFooter={false} getCard={props => <Card {...props} showFooter={false} />}/>
          <div className="os-products-footer">
            <Pagination activePage={page} totalPages={totalPages} onPageChanged={onPageChanged} />
          </div>
        </>
      : 'There is no data in the wishlist'
    }
  </div>
};

export default WishListPage;
