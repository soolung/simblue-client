import './Header.scss';
import LoginModal from '../Modal/Login/LoginModal';
import {useState} from "react";
import {Link} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userState} from "../../utils/atom/user";
import useModal from "../../hooks/useModal";
import styled, { css } from "styled-components";

export default function Header() {

    const [isToggleOpen, setIsToggleOpen] = useState(false);

    const handleToggleOpen = () => {
        setIsToggleOpen(!isToggleOpen);
    };

    const {openModal, closeModal} = useModal();
    const [user, setUser] = useRecoilState(userState);
    const [searchText, setSearchText] = useState("");
    const [searchTextOnFocus, setSearchTextOnFocus] = useState(false);

    const toggleSearchTextOnFocus = e => {
        setSearchTextOnFocus(!searchTextOnFocus)
    }

    const writeSearchText = e => {
        setSearchText(e.target.value)
    }

    const resetSearchText = e => {
        setSearchText("");
    }

    const logout = () => {
        localStorage.clear();
        setUser({
            token: null,
            authority: null,
            name: null,
        })
    }

    const openLoginModal = () => {
        openModal(
            <LoginModal
                closeModal={closeModal}
            />
        )
    }

    const NavManu = styled.ul`
 /*생략 */
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

    return (
        <>
            <header>

                <div className='header-inner'>
                    <Link to="/">
                        <div className='header_logo'>
                            <img src='https://ifh.cc/g/cs0mAl.png' alt='logo'/>
                            {/* {checkObjectIsEmpty(user) ? */}
                            {/* <> */}
                            <div className='logo-font'>
                                <p className='logo-simblue'>심청이</p>
                                <p className='logo-bssm'>부산소프트웨어마이스터고등학교</p>
                            </div>
                            {/* </>
                            :
                            <>
                                <dd className='logo-simchung'>
                                    심청이 Teacher
                                </dd>
                                <dt className='logo-bssm'>
                                    부산소프트웨어마이스터고등학교
                                </dt>
                            </>
                        } */}
                        </div>
                    </Link>
                    <NavManu className='headermanu' isToggleOpen={isToggleOpen}>
                        <li className='header_list'>
                            <div className='header_list--list'>
                                {/* {checkObjectIsEmpty(user) ?
                            <> */}
                                <ul className='header-nav'>
                                    <li className='header-nav-li'><Link to="/look">둘러보기</Link></li>
                                    {user?.authority &&
                                        <li className='header-nav-li'><Link to="/record">기록보기</Link></li>
                                    }
                                    {user?.authority === "ROLE_TEACHER" ?
                                        <li className='header-nav-li'><Link to="/create">만들기</Link></li>
                                        :
                                        <></>
                                    }
                                </ul>
                                {/* </>
                            :
                            <>
                                <ul>
                                    <li>둘러보기</li>
                                    <li>기록보기</li>
                                    <li>만들기</li>
                                </ul>
                            </>
                        } */}
                            </div>
                        </li>

                        <li className="search">
                            <input type="text" placeholder="검색어를 입력해주세요." value={searchText} onChange={writeSearchText}
                                   onFocus={toggleSearchTextOnFocus} onBlur={toggleSearchTextOnFocus}/>
                            <button
                                className={"search-delete " + (searchText.length > 0 && searchTextOnFocus ? "search-delete-show" : "search-delete-no")}
                                onClick={resetSearchText}/>
                            <input type="image" className="search-go" src={"https://ifh.cc/g/nXpwoz.png"} alt="search-go"/>
                        </li>
                        <li className='header_login_button'>
                            {
                                user?.authority ?
                                    <button onClick={logout} className='login-button'>{user.name}</button>
                                    :
                                    <button onClick={openLoginModal} className='login-button'>로그인</button>
                            }
                        </li>
                    </NavManu>
                    <FeBeer className="menuToggleBtn" onClick={handleToggleOpen}/>
                </div>
            </header>
        </>
    )
}


