import "./ResultSearch.scss";
import "../../../common/Search/Search.scss";
import { useState } from 'react';
import { useQuery } from 'react-query';
import { searchTeacher } from '../../../../utils/api/user';

export default function ResultSearch({ className, onSearch }) {
  const [searchText, setSearchText] = useState("");
  const [searchTextOnFocus, setSearchTextOnFocus] = useState(false);

  const { data, refetch } = useQuery('searchTeacher', () => searchTeacher(searchText), {
    onSuccess: (data) => {
      console.log(data)
    },
    enabled: false
  })

  const toggleSearchTextOnFocus = (e) => {
    setSearchTextOnFocus(!searchTextOnFocus);
  };

  const writeSearchText = (e) => {
    setSearchText(e.target.value);

    if (searchText.length > 0) {
      refetch();
    }
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
    <div className={`result-search ${searchTextOnFocus ? 'focused' : ''} ${className ? className : ''}`}>
      <div className="search">
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
      {searchTextOnFocus &&
        (searchText.length > 0 && data?.length > 0 ?
            <div className="result">
              {
                data.map(d => (
                  <div className="result-teacher">
                    <img
                      alt="profile-image"
                      src="/images/basic-profile-image.svg"
                      className="profile-image"
                    />
                    <span>{d.name}</span>
                  </div>
                ))}
            </div>
            :
            <div className="result no-result">
              결과가 없습니다.
            </div>
        )}
    </div>
  )
}
