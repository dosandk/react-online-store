import React, {useEffect, useState} from 'react';

import './pagination.css';

const Pagination = ({
  activePage = 1,
  totalPages = 0,
  onPageChanged = () => {},
}) => {
  const [activePageIndex, setActivePageIndex] = useState(activePage - 1);

  useEffect(() => {
    setActivePageIndex(activePage - 1);
  }, [activePage])

  const goToNextPage = event => {
    goToPage(activePageIndex + 1)(event);
  };

  const goToPrevPage = event => {
    goToPage(activePageIndex - 1)(event);
  };

  const goToPage = (pageIndex) => {
    return event => {
      event.preventDefault();

      if (pageIndex === activePageIndex) return;
      if (pageIndex > totalPages - 1 || pageIndex < 0) return;

      setActivePageIndex(pageIndex);
      onPageChanged(pageIndex);
    }
  };

  return totalPages && <nav className="os-pagination">
    {/*eslint-disable-next-line*/}
    <a href="#" className="page-link previous" onClick={goToPrevPage}>
      <i className="bi bi-chevron-left"></i>
    </a>

    <ul className="page-list">
      {
        new Array(totalPages).fill(1).map((_, pageIndex) => {
          const isActive = pageIndex === activePageIndex ? 'active' : '';

          return <li key={pageIndex} onClick={goToPage(pageIndex)}>
            {/*eslint-disable-next-line*/}
            <a href="#" className={`page-link ${isActive}`}>
              {pageIndex + 1}
            </a>
          </li>
        })
      }
    </ul>

    {/*eslint-disable-next-line*/}
    <a href="#" className="page-link next" onClick={goToNextPage}>
      <i className="bi bi-chevron-right"></i>
    </a>
  </nav>
};

export default Pagination;
