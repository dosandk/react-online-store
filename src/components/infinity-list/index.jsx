import React, {useCallback, useEffect, useRef, useState} from 'react';

const InfinityList = ({
  pageStart = 0,
  loadMore,
  children
}) => {
  const [pageIndex, setPage] = useState(pageStart);
  const loader = useRef(null);

  useEffect(() => {
    if (pageStart === 0) {
      setPage(pageStart);
    }
  }, [pageStart]);

  useEffect(() => {
    loadMore(pageIndex);
  }, [pageIndex]);

  const handleObserver = useCallback((entries) => {
    const [target] = entries;

    if (target.isIntersecting) {
      setPage(page => page + 1);
    }
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver]);

  return <>
    { children }
    <div ref={loader}></div>
  </>
};

export default InfinityList;
