import "./HeaderWing.scss";
import Modal from "react-modal";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../utils/atom/user";
import ProfilePopover from "../ProfilePopover/ProfilePopover";
import { IoIosArrowForward } from "react-icons/io";
export default function HeaderWing({ isOpen, closeModal }) {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [profilePopoverIsOpen, setProfilePopoverOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal header-wing"
      overlayClassName="modal-overlay"
    >
      <div className="responsive-header-top">
        <div className="res-header-first">
          <div className="header-first-img">
            <img src="/images/logo.svg" />
          </div>
          <div className="header-first-school">
            <span>부산소프트웨어마이스터고등학교</span>
          </div>
        </div>
        <div className="res-header-second">
          <ul className="res-header-category-ul">
            <div>
              <li className="res-header-nav-li">
                <Link to="/look">
                  <a>둘러보기</a>
                </Link>
              </li>
            </div>
            {user?.authority && (
              <div>
                <li className="res-header-nav-li">
                  <Link to="/record">
                    <a>기록보기</a>
                  </Link>
                </li>
              </div>
            )}
            {user?.authority === "ROLE_TEACHER" ? (
              <div>
                <li className="res-header-nav-li">
                  <Link to="/create">
                    <a>만들기</a>
                  </Link>
                </li>
              </div>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className="res-header-third">
          <div className="res-header-question">
            <span>자주묻는 질문</span>
          </div>
          <div className="res-header-note">
            <span>릴리즈노트</span>
          </div>
        </div>
      </div>
      <div className="responsive-header-bottom">
        {user?.authority ? (
          <>
            <button
              onClick={() => setProfilePopoverOpen(!profilePopoverIsOpen)}
              className="res-login-button"
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
            className="res-login-button"
          >
            <span className="res-login-button-span">로그인하세요</span>
            <span className="res-login-button-arrow">
              <IoIosArrowForward />
            </span>
          </button>
        )}
      </div>
    </Modal>
  );
}
