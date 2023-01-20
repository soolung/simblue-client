import "./Header.scss";
import LoginModal from "../Modal/Login/LoginModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/atom/user";
import useModal from "../../hooks/useModal";
import { AiOutlineBars } from "react-icons/ai";
export default function Header() {
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const { openModal, closeModal } = useModal();
  const [user, setUser] = useRecoilState(userState);
  const [searchText, setSearchText] = useState("");
  const [searchTextOnFocus, setSearchTextOnFocus] = useState(false);

  const toggleSearchTextOnFocus = (e) => {
    setSearchTextOnFocus(!searchTextOnFocus);
  };

  const writeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const resetSearchText = (e) => {
    setSearchText("");
  };

  const logout = () => {
    localStorage.clear();
    setUser({
      token: null,
      authority: null,
      name: null,
    });
  };

  const openLoginModal = () => {
    openModal(<LoginModal closeModal={closeModal} />);
  };

  return (
    <>
      <header>
        <div className="header-header">
          <div className="header-inner">
            <div className="resheader-top">
            <div className="header-logo">
              <Link to="/">
                <ul className="header_logo">
                  <li>
                    <img src="https://ifh.cc/g/cs0mAl.png" alt="logo" />
                  </li>
                  {/*a 태그로 하고 싶은데 외안대*/}
                  <li className="logo-font">
                    <p className="logo-simblue">심청이</p>
                    <p className="logo-bssm">부산소프트웨어마이스터고등학교</p>
                  </li>
                </ul>
              </Link>
            </div>

            <button onClick={toggleNav} className="hamburger">
              <AiOutlineBars />
            </button>
            </div>
            {isNavVisible && (
              <>
                <div className="header-category-total">
                  <ul className="header-category-ul">
                    <li className="header-nav-li">
                      <Link to="/look">
                        <a>둘러보기</a>
                      </Link>
                    </li>
                    <li className="header-nav-li">
                      <Link to="/look">
                        <a>둘러보기</a>
                      </Link>
                    </li>
                    <li className="header-nav-li">
                      <Link to="/look">
                        <a>만들기</a>
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

                <div className="search">
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
                    src={"https://ifh.cc/g/nXpwoz.png"}
                    alt="search-go"
                  />
                </div>
                <div className="header_login_button">
                  {user?.authority ? (
                    <button onClick={logout} className="login-button">
                      {user.name}
                    </button>
                  ) : (
                    <button onClick={openLoginModal} className="login-button">
                      로그인
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
