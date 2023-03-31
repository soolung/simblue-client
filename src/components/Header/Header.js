import "./Header.scss";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfilePopover from "./ProfilePopover/ProfilePopover";
import SideBar from "./SideBar/SideBar";
import { Transition } from "react-transition-group";
import Search from '../common/Search/Search';
import { useUser } from '../../hooks/useUser';

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [profilePopoverIsOpen, setProfilePopoverOpen] = useState(false);
  const [sideBarIsOpen, setSideBarOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setSideBarOpen(false);
  }, [pathname]);


  return (
    <>
      <header>
        <div className="header-inner desktop">
          <Link to="/">
            <img className="header-logo" src="/images/logo.svg" alt="logo" />
          </Link>
          <div className="header-category-total">
            <ul className="header-category-ul">
              <li className="header-nav-li">
                <Link to="/look">둘러보기</Link>
              </li>
              {user.authority && (
                <li className="header-nav-li">
                  <Link to="/record">기록보기</Link>
                </li>
              )}
              {user.authority === "ROLE_TEACHER" ? (
                <li className="header-nav-li">
                  <Link to="/application/create">만들기</Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
          <Search
            className="search-area"
            onSearch={() => alert('아직 검색 기능을 지원하지 않습니다 ㅜㅜ.')}
          />
          <div className="header_login_button">
            {user.authority ? (
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
            <img className="header-logo" src="/images/logo.svg" alt="logo" />
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
        {(sideBarIsOpen) => (
          <SideBar
            state={sideBarIsOpen}
            closeModal={() => setSideBarOpen(false)}
          />
        )}
      </Transition>
    </>
  );
}
