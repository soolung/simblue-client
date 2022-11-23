import Modal from "react-modal";
import './SignUpModal.scss';
import React, {useState} from "react";

export default function SignUpModal({isOpen, closeModal}) {

    const [request, setRequest] = useState({
        emailAddress: ""
    });

    const handleChange = e => {
        setRequest({
            ...request, [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <React.Fragment>
                <Modal isOpen={isOpen} onRequestClose={closeModal}
                    className="sign-modal-main"
                    overlayClassName="sign-modal-main-overlay"
                >
                    <div className="sign-modal-total">
                        <div className="sign-modal-total-div">
                            <div className="sign-left">
                                <div className="sign-left-tit">
                                    <div className="sign-img">
                                        <img src="https://ifh.cc/g/H0wG7w.png" />
                                    </div>
                                    <div className="sign-insa">
                                        <span>환영합니다!</span>
                                    </div>
                                </div>
                            </div>
                            {/* {
                                request.emailAddress === student

                                    ? */}

                            <div className="sign-right">
                                <div className="sign-right-tit">
                                    <div className="sign-right-ment">
                                        <div className="sign-right-ment-login">
                                            <span>회원가입</span>
                                            <img src="https://ifh.cc/g/VBj8B5.png" />
                                        </div>
                                        <div className="sign-right-ment-schoollogin">
                                            <span>학생으로 회원가입</span>
                                        </div>
                                    </div>
                                    <div className="sign-right-input-idpw">
                                        <div className="sign-right-ment-email">
                                            <input type='text' placeholder='이메일을 입력하세요.' onChange={handleChange} name="emailAddress" value={request.emailAddress} readOnly />
                                        </div>
                                        <div className="sign-right-ment-password">
                                            <input type='password' placeholder='비밀번호를 입력하세요' onChange={handleChange} />
                                        </div>
                                        <div className="sign-right-ment-morepassword">
                                            <input type='password' placeholder='비밀번호를 재입력 입력하세요' onChange={handleChange} />
                                        </div>
                                        <div className="temp">
                                            <div className="sign-right-ment-num-student">
                                                <input type='text' placeholder='학번을 입력하세요' onChange={handleChange} />
                                            </div>
                                            <div className="sign-right-ment-name-student">
                                                <input type='text' placeholder='이름을 입력하세요' onChange={handleChange} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="sign-right-loginbutton-tit">
                                        <div className="sign-right-loginbutton-login"><button>회원가입</button></div>
                                    </div>
                                </div>
                            </div>
                            {/*
                                    :


                                    <div className="sign-right">
                                        <div className="sign-right-tit">
                                            <div className="sign-right-ment">
                                                <div className="sign-right-ment-login">
                                                    <span>회원가입</span>
                                                    <img src="https://ifh.cc/g/VBj8B5.png" />
                                                </div>
                                                <div className="sign-right-ment-schoollogin">
                                                    <span>선생으로 회원가입</span>
                                                </div>
                                            </div>
                                            <div className="sign-right-input-idpw">
                                                <div className="sign-right-ment-email">
                                                    <input type='text' placeholder='이메일을 입력하세요.' onChange={handleChange} name="emailAddress" value={request.emailAddress} readOnly />
                                                </div>
                                                <div className="sign-right-ment-password">
                                                    <input type='password' placeholder='비밀번호를 입력하세요' onChange={handleChange} />
                                                </div>
                                                <div className="sign-right-ment-morepassword">
                                                    <input type='password' placeholder='비밀번호를 재입력 입력하세요' onChange={handleChange} />
                                                </div>
                                                <div className="sign-right-ment-name">
                                                    <input type='text' placeholder='이름을 입력하세요' onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="sign-right-loginbutton-tit">
                                                <div className="sign-right-loginbutton-login"><button>회원가입</button></div>
                                            </div>
                                        </div>
                                    </div>
                            } */}
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        </>
    )
}
