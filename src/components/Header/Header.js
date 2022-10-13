import './Header.scss';
import Login from '../../components/Modal/Login/Login';
import {useContext, useState} from "react";
import { checkObjectIsEmpty } from '../../utils/checkObjectIsEmpty';
import { Link } from 'react-router-dom';

export default function Header(){
    
    
    const [cartModalIsOpen, setCartModalIsOpen] = useState(false);


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
    
    

    return(
        <body>
        <header>
        <div className='header-total-total'>
            <nav className='header_total'>
                <div className='header_logo'>
                    <Link to ='/'>
                        <div className='header_logo--div'>
                            <img src='https://ifh.cc/g/cs0mAl.png'/>
                            {/* {checkObjectIsEmpty(user) ? */}
                                {/* <> */}
                                <div className='logo-font'>
                                    <h3>
                                        <dd className='logo-simchung'>
                                            심청이
                                        </dd>
                                    </h3>
                                    <dd className='logo-bssm'>
                                        부산소프트웨어마이스터고등학교
                                    </dd>
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
                    <span  className='header_login_span'><Login /></span>
                </div>
            </nav>
        </div>
        </header>
        </body>
    )
}