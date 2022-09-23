import React, {useCallback, useEffect, useRef, useState} from 'react';
import CardsList from '../../components/cards-list';
import Card from "../../components/card";
import Search from '../../components/search';
import InfinityList from "../../components/infinity-list";
import SortableTable from "../../components/sortable-table";
import {tableConfig} from "./sortable-table-config";
import RequestBuilder from "../../core/request-builder";
import httpRequest from "../../core/request";

import './main.css';

const OnlineStorePage = () => {
  const pageSize = 10;
  const [view, setView] = useState('grid');
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);

  const urlRef = useRef(new RequestBuilder('products'));

  const setPagination = useCallback(pageIndex => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;

    urlRef.current.addPagination(start, end);
    setPage(pageIndex);
  }, []);

  const onSearch = useCallback((data) => {
    setPagination(0);

    urlRef.current
      .addSearch(data);

    loadData(urlRef.current);
  }, []);

  useEffect(() => {
    setPagination(0);
    loadData(urlRef.current);
  }, []);

  const loadData = useCallback(async (url) => {
    try {
      setLoading(true);

      const data = await httpRequest.get(url);

      setList([...list, ...data]);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }, [list]);

  const loadMore = pageIndex => {
    setPagination(pageIndex);

    if (loading === false) {
      loadData(urlRef.current);
    }
  };

  const showTableView = () => setView('table');
  const showGridView = () => setView('grid');

  const getDataView = mode => {
    switch (mode) {
      case 'grid':
        return <CardsList data={list} getCard={props => <Card {...props} />} />;
      case 'table':
        return <SortableTable
          config={tableConfig}
          data={list}
          sorted={{field: 'price', order: 'asc'}} />;
      default:
        throw Error(`There is no view "${mode}"`);
    }
  };

  return <div className="page-container">
    <h1 className="page-title">Products</h1>

    <div className="filters-panel">
      <Search onSearch={onSearch}/>
      <div className="list-view-controls">
        <i className={`bi bi-list ${view === 'table' ? 'active' : ''}`} onClick={showTableView}></i>
        <i className={`bi bi-grid ${view === 'grid' ? 'active' : ''}`} onClick={showGridView}></i>
      </div>
    </div>

    <InfinityList loadMore={loadMore} pageStart={page}>
      { getDataView(view) }
    </InfinityList>
  </div>
};

export default OnlineStorePage;
