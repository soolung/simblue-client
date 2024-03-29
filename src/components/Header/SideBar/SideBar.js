import "./SideBar.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePopover from "../ProfilePopover/ProfilePopover";
import { IoIosArrowForward } from "react-icons/io";
import { useUser } from "../../../hooks/useUser";

export default function SideBar({ state, closeModal }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const [profilePopoverIsOpen, setProfilePopoverOpen] = useState(false);

  useEffect(() => {
    if (state === "entered") {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    }
  }, [state]);
  return (
    <>
      <div className={`side-bar-overlay ${state}`} onClick={closeModal} />
      <div className={`side-bar ${state}`}>
        <div className="side-bar-content">
          <div className="side-bar-logo-container">
            <img className="side-bar-logo" src="/images/logo.svg" alt="logo" />
            <p className="side-bar-school">부산소프트웨어마이스터고등학교</p>
          </div>
          <hr className="division-line" />
          <div className="side-bar-nav">
            <ul className="side-bar-category-ul">
              <div>
                <li className="side-bar-nav-li">
                  <Link to="/look">둘러보기</Link>
                </li>
              </div>
              {user.authority && (
                <div>
                  <li className="side-bar-nav-li">
                    <Link to="/record">기록보기</Link>
                  </li>
                </div>
              )}
              {user.authority === "ROLE_TEACHER" ? (
                <div>
                  <li className="side-bar-nav-li">
                    <Link to="/create">만들기</Link>
                  </li>
                </div>
              ) : (
                <></>
              )}
            </ul>
          </div>
          <hr className="division-line" />
          <div className="side-bar-more">
            <div className="side-bar-more-content">
              <a href="https://www.notion.so/soolung/c351137b354147d6b54b9beabc745caa">
                자주 묻는 질문
              </a>
            </div>
            <div className="side-bar-more-content">
              <a href="https://www.notion.so/soolung/Release-Note-add7c6c9f0b945308319402caf24f2ae">
                릴리즈 노트
              </a>
            </div>
          </div>
        </div>
        <div className="side-bar-bottom">
          {user.authority ? (
            <>
              <button
                onClick={() => setProfilePopoverOpen(!profilePopoverIsOpen)}
                className="side-bar-login-button"
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
              className="side-bar-login-button"
            >
              <div>
                <span>로그인하세요</span>
              </div>
              <div>
                <span className="side-bar-login-button-arrow">
                  <IoIosArrowForward />
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
