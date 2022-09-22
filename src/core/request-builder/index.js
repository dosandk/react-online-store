const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}api/rest/`;

// NOTE: Pattern. Builder
export default class RequestBuilder {
  constructor (url = '') {
    this.url = new URL(url, BACKEND_URL);
  }

  toString () {
    return this.url.toString();
  }

  addPagination (start, end) {
    this.url.searchParams.set('_start', start);
    this.url.searchParams.set('_end', end);

    return this;
  }

  addSort (sort, order) {
    this.url.searchParams.set('_sort', sort);
    this.url.searchParams.set('_order', order);

    return this;
  }

  addFilter (priceLte, priceGte) {
    this.url.searchParams.set('price_lte', priceLte);
    this.url.searchParams.set('price_gte', priceGte);

    return this;
  }

  addSearch (titleLike) {
    this.url.searchParams.set('title_like', titleLike);

    return this;
  }

  resetSearchParams () {
    const keys = [...this.url.searchParams.keys()];

    for (const key of keys) {
      this.url.searchParams.delete(key);
    }

    return this;
  }
}
