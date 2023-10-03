import './Person.scss';
import { useQuery } from 'react-query';
import { searchUser } from '../../../utils/api/user';
import useSearch from '../../../hooks/useSearch';
import { useState } from 'react';

const Approval = ({
                    className,
                    value,
                    onChange,
                    type,
                    onResultClick,
                  }) => {
  const [name, setName] = useState(value);
  const { data, refetch } = useQuery(
    "search",
    () => searchUser({
      q: q,
      authority: 'ROLE_TEACHER'
    }),
    {
      onSuccess: (data) => {},
      enabled: false,
    }
  );

  const { q, isFocus, toggleFocus, handleQAndFetch, reset } = useSearch(refetch)

  const onResultClickAndReset = ({ id, name }) => {
    onResultClick(id);
    setName(name)
    reset();
  };

  const resetResult = () => {
    toggleFocus();
    onResultClick("");
    setName("");
    reset();
  }

  return (
    value ?
      <div className={`person-input selected ${className}`}>
        <div className='person'>
          <div className='profile'>
            <img
              alt="profile-image"
              src="/images/basic-profile-image.svg"
              className="profile-image"
            />
            <span>{name}</span>
          </div>
          <button onClick={resetResult}>
            <img src={'/images/cancel.svg'} alt={'cancel'} className={'cancel'} />
          </button>
        </div>
      </div>
      :
      <div
        className={`person-input ${isFocus ? "focused" : ""} ${
          className ? className : ""
        }`}
      >
        <div className="search">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={q}
            onChange={handleQAndFetch}
            onFocus={toggleFocus}
            onBlur={toggleFocus}
          />
          <button
            className={
              "search-delete " +
              (q.length > 0 && isFocus
                ? "search-delete-show"
                : "search-delete-no")
            }
            onClick={reset}
          />
          <input
            type="image"
            className="search-go"
            src="/images/search.svg"
            alt="search-go"
          />
        </div>
        {isFocus &&
          (q.length > 0 && data?.length > 0 ? (
            <div className="result">
              {data.map((d, index) => (
                <div
                  className="search-result"
                  onMouseDown={() =>
                    onResultClickAndReset({
                      id: d.userId,
                      name: d.name,
                    })
                  }
                  key={index}
                >
                  <img
                    alt="profile-image"
                    src="/images/basic-profile-image.svg"
                    className="profile-image"
                  />
                  <span>{d.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="result no-result">결과가 없습니다.</div>
          ))}
      </div>
  )
}

export default Approval;
