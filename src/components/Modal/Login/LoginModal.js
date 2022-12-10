import Modal from "react-modal";
import './LoginModal.scss';

import React, {useState} from "react";
import TextBox from "../../common/TextBox/TextBox";
import {useMutation, useQuery} from "react-query";
import {getGoogleAuthLink, loginUser} from "../../../utils/api/auth";
import {useSetRecoilState} from "recoil";
import {userState} from "../../../utils/atom/user";

export default function LoginModal({isOpen, closeModal}) {
    const setUser = useSetRecoilState(userState);
    const {data} = useQuery('getGoogleAuthLink', getGoogleAuthLink);
    const {mutate} = useMutation(loginUser, {
        onSuccess: (data) => {
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("authority", data.authority);
            setUser({
                token: data.accessToken,
                authority: data.authority
            })
            closeModal();
        }
    })


    const [request, setRequest] = useState({})

    const handleChange = (e) => {
        setRequest({
            ...request,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <React.Fragment>
                <Modal isOpen={isOpen} onRequestClose={closeModal}
                       className="modal login-modal"
                       overlayClassName="modal-overlay"
                >
                    <div className="login-left">
                        <div className="login-left-tit">
                            <img className="login-img" alt="simblue" src="https://ifh.cc/g/H0wG7w.png"/>
                                <p className="login-insa">환영합니다!</p>
                        </div>
                    </div>
                    <div className="login-right">
                        <div className="login-right-tit">
                            <div className="login-right-ment">
                                <div className="login-right-ment-login">
                                    <span>로그인</span>
                                    <img src="https://ifh.cc/g/VBj8B5.png"/>
                                </div>
                                <p className="login-right-ment-login-ment">학교 계정으로 로그인</p>
                            </div>
                            <div className="login-right-input-idpw">
                                <div className="login-right-ment-email">
                                    <TextBox type='text' placeholder='이메일을 입력하세요' onChange={handleChange} name={"email"}/>
                                </div>
                                <div className="login-right-ment-password">
                                    <TextBox type='password' placeholder='비밀번호를 입력하세요' onChange={handleChange} name="password"/>
                                </div>
                            </div>
                            <div className="login-right-login-button-area">
                                <div className="login-right-login-button--basic">
                                    <button onClick={() => mutate({
                                        email: request.email,
                                        password: request.password
                                    })}>로그인</button>
                                </div>
                                <div className="login-right-login-button--google">
                                    <button>
                                        <img src="https://ifh.cc/g/nNDjB0.png" alt="google"/>
                                        <span>구글 계정으로 로그인</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="login-right-under">
                            아직 회원이 아니신가요?
                            <span className="login-under-dap" onClick={() => window.location.replace(data)}> 구글 계정으로 회원가입</span>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        </>
    )
}
