import './Header.scss';
import {useContext, useState} from "react";
import { checkObjectIsEmpty } from '../../utils/checkObjectIsEmpty';
export default function Header(){
    return(
        <body>
        <header>
        <div className='header-total-total'>
            <nav className='header_total'>
                <div className='header_logo'>
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
                </div>
                <div className='header_list'>
                    <div className='header_list--list'>
                        {/* {checkObjectIsEmpty(user) ?
                            <> */}
                                <ul className='header-nav'>
                                    <li className='header-nav-li'>둘러보기</li>
                                    <li>기록보기</li>
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
                <div className='header_search'>
                        
                </div>
                <div className='header_login_button'>
                    <span  className='header_login_span'>로그인</span>
                </div>
            </nav>
        </div>
        </header>
        </body>
    )
}