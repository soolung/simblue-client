import "./Search.scss";
import { useState } from 'react';

export default function Search({ className, onSearch }) {
  const [searchText, setSearchText] = useState("");
  const [searchTextOnFocus, setSearchTextOnFocus] = useState(false);

  const toggleSearchTextOnFocus = (e) => {
    setSearchTextOnFocus(!searchTextOnFocus);
  };

  const writeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const resetSearchText = () => {
    setSearchText("");
  };

  const onSearchAndReset = () => {
    onSearch();
    resetSearchText()
  }

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      onSearchAndReset();
    }
  }

  return (
    <div className={`search ${className ? className : ''}`}>
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        value={searchText}
        onChange={writeSearchText}
        onFocus={toggleSearchTextOnFocus}
        onBlur={toggleSearchTextOnFocus}
        onKeyUp={onKeyUp}
      />
      <button
        className={
          "search-delete " +
          (searchText.length > 0 && searchTextOnFocus
            ? "search-delete-show"
            : "search-delete-no")
        }
        onClick={resetSearchText}
      />
      <input
        type="image"
        className="search-go"
        src="/images/search.svg"
        alt="search-go"
        onClick={onSearchAndReset}
      />
    </div>
  )
}
