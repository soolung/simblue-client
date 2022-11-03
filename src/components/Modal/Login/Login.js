import Modal from "react-modal";
import './Login.scss';
import {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from "react";
import Signup from "../Signup/Signup";
export default function Login(){

    
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
                <button onClick={()=>setModalOpen(true)} className='login-button-modal'>로그인</button>
                <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}    
                    className="login-modal-main"
                    overlayClassName="login-modal-main-overlay"
                >
                    <div className="login-modal-total">
                        <div className="login-modal-total-div">
                            <div className="login-left">
                                <div className="login-left-tit">
                                    <div className="login-img">
                                        <img src="https://ifh.cc/g/H0wG7w.png"/>
                                    </div>
                                    <div className="login-insa">
                                        <span>환영합니다!</span>
                                    </div>
                                </div>
                            </div>
                            <div className="login-right">
                                <div className="login-right-tit">
                                    <div className="login-right-ment">
                                        <div className="login-right-ment-login">
                                            <span>로그인</span>
                                            <img src="https://ifh.cc/g/VBj8B5.png"/>
                                        </div>
                                        <div className="login-right-ment-schoollogin">
                                            <span>학교 계정으로 로그인</span>
                                        </div>
                                    </div>
                                    <div className="login-right-input-idpw">
                                        <div className="login-right-ment-email">                                        
                                            <input type='text' placeholder='이메일을 입력하세요.' onChange={handleChange}/>
                                        </div>
                                        <div className="login-right-ment-password">
                                            <input type='password' placeholder='비밀번호를 입력하세요'  onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="login-right-loginbutton-tit">
                                        <div className="login-right-loginbutton-login"><button onClick={()=>Login()}>로그인</button></div>
                                        <div className="login-right-loginbutton-googlelogin"><button><img src="https://ifh.cc/g/nNDjB0.png" /><span>구글 계정으로 로그인</span></button></div>
                                    </div>
                                </div>
                                <div className="login-right-under">
                                    <span className="login-under-que">아직 회원이 아니신가요?</span>
                                    <span className="login-under-dap"><Signup /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        </>
    )
}