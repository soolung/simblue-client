import './Header.scss';
import LoginModal from '../Modal/Login/LoginModal';
import {useState} from "react";

export default function Header() {

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


    return (
        <>
            <header>
                <div className='header-inner'>
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
                    <div className='header_list'>
                        <div className='header_list--list'>
                            {/* {checkObjectIsEmpty(user) ?
                            <> */}
                            <ul className='header-nav'>
                                <li className='header-nav-li'>둘러보기</li>
                                <li className='header-nav-li-2'>기록보기</li>
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
                        <button onClick={() => setLoginModalOpen(true)} className='login-button'>로그인</button>
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
