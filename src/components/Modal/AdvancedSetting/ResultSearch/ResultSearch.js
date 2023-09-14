import "./ResultSearch.scss";
import "../../../common/Search/Search.scss";
import { useQuery } from "react-query";
import { searchUser } from "../../../../utils/api/user";
import useSearch from '../../../../hooks/useSearch';

export default function ResultSearch({ className, onResultClick }) {
  const { data, refetch } = useQuery(
    "searchTeacher",
    () => searchUser({
      q: q,
      authority: 'ROLE_TEACHER'
    }),
    {
      onSuccess: () => {},
      enabled: false,
    }
  );

  const { q, isFocus, toggleFocus, handleQAndFetch, reset } = useSearch(refetch)

  const onResultClickAndReset = ({ teacherId, name }) => {
    onResultClick({
      teacherId: teacherId,
      name: name,
    });
    reset();
  };

  return (
    <div
      className={`result-search ${isFocus ? "focused" : ""} ${
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
                className="result-teacher"
                onMouseDown={() =>
                  onResultClickAndReset({
                    teacherId: d.userId,
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
  );
}
