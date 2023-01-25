import React from "react";
import "./Login.scss";
import TextBox from "../../components/common/TextBox/TextBox";
import { Link } from "react-router-dom";
export const Login = () => {
  return (
    <div className="login">
      <div className="img-box">
        <img alt="simblue" src="https://ifh.cc/g/H0wG7w.png" />
        <p className="login-insa">환영합니다!</p>
      </div>
      <div className="login-form">
        <div className="login-title">
          <span>로그인</span>
          <img alt="welcome" src="https://ifh.cc/g/VBj8B5.png" />
        </div>
        <p className="login-subtitle">학교 계정으로 로그인</p>
        <div className="input-box">
          <TextBox placeholder="이메일을 입력해주세요."></TextBox>
          <TextBox type="password" placeholder="비밀번호을 입력해주세요."></TextBox>
        </div>
        <div className="input-box">
          <button className="login-btn">로그인</button>
          <button className="login-google-btn ">
            <img src="https://ifh.cc/g/nNDjB0.png" alt="google" />
            <span>구글 계정으로 로그인</span>
          </button>
        </div>
        <div className="to-signup">
          아직 회원이 아니신가요?
          <Link to = "/signup">
          <span> 구글 계정으로 회원가입</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
