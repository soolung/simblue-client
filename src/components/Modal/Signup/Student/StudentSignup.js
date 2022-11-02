import Modal from "react-modal";
import './StudentSignup.scss';
import {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from "react";
export default function Signup(){

    const [request, setRequest] = useState({
        emailAddress: ""
    });

    const handleChange = e => {
        setRequest({
            ...request, [e.target.name]: e.target.value
        })
    }

    const [modalOpen, setModalOpen] = useState(false);
    

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    

    
    

    return(
        <>
            <React.Fragment>
                <button onClick={()=>setModalOpen(true)} className='signup-button-modal'>구글계정으로 회원가입</button>
                <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}    
                    className="sign-modal-main"
                    overlayClassName="sign-modal-main-overlay"
                >
                    <div className="sign-modal-total">
                        <div className="sign-modal-total-div">
                            <div className="sign-left">
                                <div className="sign-left-tit">
                                    <div className="sign-img">
                                        <img src="https://ifh.cc/g/H0wG7w.png"/>
                                    </div>
                                    <div className="sign-insa">
                                        <span>환영합니다!</span>
                                    </div>
                                </div>
                            </div>
                            <div className="sign-right">
                                <div className="sign-right-tit">
                                    <div className="sign-right-ment">
                                        <div className="sign-right-ment-login">
                                            <span>회원가입</span>
                                            <img src="https://ifh.cc/g/VBj8B5.png"/>
                                        </div>
                                        <div className="sign-right-ment-schoollogin">
                                            <span>학생으로 회원가입</span>
                                        </div>
                                    </div>
                                    <div className="sign-right-input-idpw">
                                        <div className="sign-right-ment-email">                                        
                                            <input type='text' placeholder='이메일을 입력하세요.' onChange={handleChange} name="emailAddress" value={request.emailAddress}/>
                                        </div>
                                        <div className="sign-right-ment-password">
                                            <input type='password' placeholder='비밀번호를 입력하세요' onChange={handleChange}/>
                                        </div>
                                        <div className="sign-right-ment-morepassword">
                                            <input type='password' placeholder='비밀번호를 재입력 입력하세요' onChange={handleChange}/>
                                        </div>
                                        <div className="sign-right-ment-name">
                                            <input type='password' placeholder='이름을 입력하세요' onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="sign-right-loginbutton-tit">
                                        <div className="sign-right-loginbutton-login"><button>회원가입</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        </>
    )
}