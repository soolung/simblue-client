import "./Signup.scss";
import React, { useEffect, useState } from "react";
import TextBox from "../../components/common/TextBox/TextBox";
import jwtDecode from "jwt-decode";
import { useMutation } from "react-query";
import { joinStudent, joinTeacher } from "../../utils/api/user";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/atom/user";



export const Signup = () => {
    const [user, setUser] = useRecoilState(userState);
    const [authority, setAuthority] = useState("");
    const [request, setRequest] = useState({});

    const student = useMutation(joinStudent, {
        onSuccess: () => {
        }
    })

    const teacher = useMutation(joinTeacher, {
        onSuccess: () => {
        }
    })

    useEffect(() => {
        setAuthority(user?.authority);
        setRequest({
            ...request, email: user.token ? jwtDecode(user.token).email : null
        })
    }, [user])

    const handleChange = e => {
        setRequest({
            ...request, [e.target.name]: e.target.value
        })
    }

    const submit = () => {
        if (request.password !== request.passwordCheck) alert('비밀번호가 다릅니다')
        setUser({
            ...user,
            name: request.name
        })
        if (authority === "ROLE_STUDENT") {
            student.mutate({
                admissionYear: parseInt(request.email.substring(0, 4)),
                name: request.name,
                password: request.password,
                studentNumber: request.studentNumber
            })
        } else {
            teacher.mutate({
                name: request.name,
                password: request.password,
            })
        }
    }

    return (
        <>
            <section className="signup">
                <div className="img-box">
                    <img alt="simblue" src="https://ifh.cc/g/H0wG7w.png" />
                    <p className="login-insa">환영합니다!</p>
                </div>
                <div className="sign-form">
                    <div className="sign-title">
                        <span>회원가입</span>
                        <img alt="welcome" src="https://ifh.cc/g/VBj8B5.png" />
                    </div>
                    <div className="sign-subtitle">
                        <span>{authority === "ROLE_STUDENT" ? "학생" : "선생님"}으로 회원가입</span>
                    </div>
                    <div className="input-box">
                        <TextBox type='text' placeholder='이메일을 입력하세요.' onChange={handleChange}
                            className="input-element" name="emailAddress"
                            value={request?.email}
                            readOnly />
                        <TextBox
                            className="input-element"
                            type='password'
                            placeholder='비밀번호를 입력하세요'
                            onChange={handleChange}
                            name='password'
                        />
                        <TextBox
                            className="input-element"
                            type='password'
                            placeholder='비밀번호를 재입력 입력하세요'
                            onChange={handleChange}
                            name='passwordCheck'
                        />
                        {authority === "ROLE_STUDENT" ?
                            <div className="inline-input">
                                <TextBox
                                    className="sign-right-ment-num-student"
                                    type='text'
                                    placeholder='학번을 입력하세요'
                                    onChange={handleChange}
                                    name='studentNumber'
                                />
                                <TextBox
                                    className="sign-right-ment-name-student"
                                    type='text'
                                    placeholder='이름을 입력하세요'
                                    onChange={handleChange}
                                    name='name'
                                />
                            </div>
                            :
                            <TextBox
                                className="sign-right-ment-name-student"
                                type='text'
                                placeholder='이름을 입력하세요'
                                onChange={handleChange}
                                name='name'
                            />
                        }

                    </div>
                    <div className="input-box">
                        <button
                            onClick={submit}
                            className="sign-btn"
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

