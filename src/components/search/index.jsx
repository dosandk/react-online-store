import React, {useEffect, useMemo, useRef, useState} from 'react';
import {debounce} from './debounce';

import './search.css';

const Search = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const delay = 600;
  const didMountRef = useRef(false);

  const onChange = event => {
    const nextValue = event.target.value.trim();

    setValue(nextValue);
  };

  const debouncedOnSearch = useMemo(
    () => debounce(searchValue => {
      onSearch(searchValue);
    }, delay),
    [onSearch]);

  useEffect(() => {
    if (didMountRef.current) {
      return debouncedOnSearch(value);
    }

    didMountRef.current = true;
  }, [value, debouncedOnSearch]);

  return <form>
    <div className="os-form-input use-icon">
      <input id="search-input"
             onChange={onChange}
             type="text"
             value={value}
             placeholder="Search" />
      <label className="bi bi-search input-icon"
             htmlFor="search-input"/>
    </div>
  </form>
};

export default Search;
