import "./Header.scss";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../utils/atom/user";
import ProfilePopover from "./ProfilePopover/ProfilePopover";
import SideBar from "./SideBar/SideBar";
import { Transition } from 'react-transition-group';

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [profilePopoverIsOpen, setProfilePopoverOpen] = useState(false);
  const [sideBarIsOpen, setSideBarOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTextOnFocus, setSearchTextOnFocus] = useState(false);

  useEffect(() => {
    setSideBarOpen(false);
  }, [pathname]);

  const toggleSearchTextOnFocus = (e) => {
    setSearchTextOnFocus(!searchTextOnFocus);
  };

  const writeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const resetSearchText = (e) => {
    setSearchText("");
  };

  return (
    <>
      <header>
        <div className="header-inner desktop">
          <Link to="/">
            <img className="header-logo" src="/images/logo.svg" alt="logo"/>
          </Link>
          <div className="header-category-total">
            <ul className="header-category-ul">
              <li className="header-nav-li">
                <Link to="/look">
                  <a>둘러보기</a>
                </Link>
              </li>
              {user?.authority && (
                <li className="header-nav-li">
                  <Link to="/record">
                    <a>기록보기</a>
                  </Link>
                </li>
              )}
              {user?.authority === "ROLE_TEACHER" ? (
                <li className="header-nav-li">
                  <Link to="/create">
                    <a>만들기</a>
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>

          <div className="search-area">
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              value={searchText}
              onChange={writeSearchText}
              onFocus={toggleSearchTextOnFocus}
              onBlur={toggleSearchTextOnFocus}
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
            />
          </div>
          <div className="header_login_button">
            {user?.authority ? (
              <>
                <button
                  onClick={() => setProfilePopoverOpen(!profilePopoverIsOpen)}
                  className="login-button"
                >
                  {user.name}
                </button>
                <ProfilePopover
                  isOpen={profilePopoverIsOpen}
                  close={() => setProfilePopoverOpen(false)}
                />
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="login-button"
              >
                로그인
              </button>
            )}
          </div>
        </div>
        <div className="header-inner mobile">
          <button onClick={() => setSideBarOpen(true)}>
            <img
              src="/images/hamburger.svg"
              className="button-image"
              alt="menu"
            />
          </button>
          <Link to="/">
            <img className="header-logo" src="/images/logo.svg" alt="logo"/>
          </Link>
          <button onClick={() => console.log("search")}>
            <img
              src="/images/search.svg"
              className="button-image"
              alt="search"
            />
          </button>
        </div>
      </header>
      <Transition unmountOnExit in={sideBarIsOpen} timeout={245}>
        {(sideBarIsOpen) =>
          <SideBar state={sideBarIsOpen} closeModal={() => setSideBarOpen(false)}/>
        }
      </Transition>
    </>
  );
}
