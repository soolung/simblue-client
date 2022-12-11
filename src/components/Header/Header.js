import './Header.scss';

import LoginModal from '../Modal/Login/LoginModal';
import {useState} from "react";
import {Link} from "react-router-dom";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {userState} from "../../utils/atom/user";

export default function Header() {
    const user = useRecoilValue(userState);
    const resetUser = useResetRecoilState(userState);
    const [searchText, setSearchText] = useState("");
    const [searchTextOnFocus, setSearchTextOnFocus] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

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
        resetUser();
    }

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
                    <div className='header_list'>
                        <div className='header_list--list'>
                            {/* {checkObjectIsEmpty(user) ?
                            <> */}
                            <ul className='header-nav'>
                                <li className='header-nav-li'><Link to="/look">둘러보기</Link></li>
                                <li className='header-nav-li-2'><Link to="/record">기록보기</Link></li>
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
                    </div>

                    <div className="search">
                        <input type="text" placeholder="검색어를 입력해주세요." value={searchText} onChange={writeSearchText}
                               onFocus={toggleSearchTextOnFocus} onBlur={toggleSearchTextOnFocus}/>
                        <button
                            className={"search-delete " + (searchText.length > 0 && searchTextOnFocus ? "search-delete-show" : "search-delete-no")}
                            onClick={resetSearchText}/>
                        <input type="image" className="search-go" src={"https://ifh.cc/g/nXpwoz.png"} alt="search-go"/>
                    </div>
                    <div className='header_login_button'>
                        {
                            user?.authority ?
                                <button onClick={logout} className='login-button'>로그아웃</button>
                                :
                                <button onClick={() => setLoginModalOpen(true)} className='login-button'>로그인</button>
                        }
                    </div>
                </div>
            </header>
            <LoginModal
                isOpen={isLoginModalOpen}
                closeModal={() => setLoginModalOpen(false)}
            />
        </>
    )
}
