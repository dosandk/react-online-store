import React, {Component} from "react";

import './pagination.css';

export default class Pagination extends Component {
  static getDerivedStateFromProps (props, state) {
    return {...state, isHidden: !Boolean(props.totalPages)}
  }

  constructor(props) {
    super(props);

    const {activePage = 1, totalPages = 0, onPageChanged = () => {}} = props;

    this.totalPages = totalPages;

    this.state = {
      isHidden: true,
      activePageIndex: activePage - 1
    }

    this.onPageChanged = onPageChanged;
  }

  goToNextPage = (event) => {
    this.goToPage(this.state.activePageIndex + 1)(event);
  }

  goToPrevPage = (event)=> {
    this.goToPage(this.state.activePageIndex - 1)(event);
  }

  goToPage (pageIndex) {
    return event => {
      event.preventDefault();

      if (pageIndex === this.state.activePageIndex) return;
      if (pageIndex > this.totalPages - 1 || pageIndex < 0) return;

      this.setState({
        ...this.state,
        activePageIndex: pageIndex
      });

      this.onPageChanged(pageIndex);
    }
  }

  render () {
    return <nav className="os-pagination" hidden={this.state.isHidden}>
      <a href="#" className="page-link previous" onClick={this.goToPrevPage}>
        <i className="bi bi-chevron-left"></i>
      </a>

      <ul className="page-list">
        {
          new Array(this.totalPages).fill(1).map((_, pageIndex) => {
            const isActive = pageIndex === this.state.activePageIndex ? 'active' : '';

            return <li key={pageIndex} onClick={this.goToPage(pageIndex)}>
              <a href="#" className={`page-link ${isActive}`}>
                {pageIndex + 1}
              </a>
            </li>
          })
        }
      </ul>

      <a href="#" className="page-link next" onClick={this.goToNextPage}>
        <i className="bi bi-chevron-right"></i>
      </a>
    </nav>
  }
}
