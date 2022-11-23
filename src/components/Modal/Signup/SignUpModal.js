import Modal from "react-modal";
import './SignUpModal.scss';
import React, {useState} from "react";
import TextBox from "../../common/TextBox/TextBox";

export default function SignUpModal({isOpen, closeModal}) {
    const [authority, setAuthority] = useState("STUDENT");
    const [request, setRequest] = useState({
        emailAddress: ""
    });

    const handleChange = e => {
        setRequest({
            ...request, [e.target.name]: e.target.value
        })
    }

    const toggleAuthority = () => {
        setAuthority(authority === "STUDENT" ? "TEACHER" : "STUDENT");
    }

    return (
        <>
            <React.Fragment>
                <Modal isOpen={isOpen} onRequestClose={closeModal}
                       className="modal sign-up-modal"
                       overlayClassName="modal-overlay"
                >
                    <div className="sign-left">
                        <div className="sign-up-character" onClick={toggleAuthority}>
                            <img className="sign-img" alt="simblue" src="https://ifh.cc/g/H0wG7w.png"/>
                            <p className="sign-insa">환영합니다!</p>
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
                                    <span>{authority === "STUDENT" ? "학생" : "선생님"}으로 회원가입</span>
                                </div>
                            </div>
                            <div className="sign-right-input-idpw">
                                <TextBox type='text' placeholder='이메일을 입력하세요.' onChange={handleChange}
                                         className="input-element" name="emailAddress" value={request.emailAddress}
                                         readOnly/>
                                <TextBox className="input-element" type='password' placeholder='비밀번호를 입력하세요'
                                         onChange={handleChange}/>
                                <TextBox className="input-element" type='password' placeholder='비밀번호를 재입력 입력하세요'
                                         onChange={handleChange}/>
                                {authority === "STUDENT" ?
                                    <div className="inline-input">
                                        <TextBox className="sign-right-ment-num-student" type='text'
                                                 placeholder='학번을 입력하세요' onChange={handleChange}/>
                                        <TextBox className="sign-right-ment-name-student" type='text'
                                                 placeholder='이름을 입력하세요' onChange={handleChange}/>
                                    </div>
                                    :
                                    <TextBox className="sign-right-ment-name-student" type='text'
                                             placeholder='이름을 입력하세요' onChange={handleChange}/>
                                }

                            </div>
                            <div className="sign-right-loginbutton-tit">
                                <div className="sign-right-loginbutton-login">
                                    <button>회원가입</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        </>
    )
}
