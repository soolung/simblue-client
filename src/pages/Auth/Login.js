import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import TextBox from "../../components/common/TextBox/TextBox";
import { useMutation, useQuery } from "react-query";
import { getGoogleAuthLink, loginUser } from "../../utils/api/auth";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from "../../utils/constant/user.constant";
import { Storage } from "../../utils/storage/storage";

export const Login = () => {
  const navigate = useNavigate();
  const { data } = useQuery("getGoogleAuthLink", getGoogleAuthLink);
  const [request, setRequest] = useState({});

  const { mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      Storage.setItem(ACCESS_TOKEN, data.accessToken);
      Storage.setItem(REFRESH_TOKEN, data.refreshToken);

      if (!data?.login) {
        navigate("/signup");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const handleChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  const login = () => {
    if (!request.email.endsWith("@bssm.hs.kr")) {
      request.email += "@bssm.hs.kr";
    }
    mutate({
      email: request.email,
      password: request.password,
    });
  };

  return (
    <section className="login">
      <div className="img-box">
        <img alt="simblue" src="https://soolung.s3.ap-northeast-2.amazonaws.com/resources/girl.svg" />
        <p className="login-insa">환영합니다!</p>
      </div>
      <div className="login-form">
        <div className="login-title">
          <span>로그인</span>
          <img alt="welcome" src="https://soolung.s3.ap-northeast-2.amazonaws.com/resources/what.svg" />
        </div>
        <p className="login-subtitle">학교 계정으로 로그인</p>
        <div className="input-box">
          <TextBox
            onChange={handleChange}
            name="email"
            placeholder="이메일을 입력해주세요."
          ></TextBox>
          <TextBox
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="비밀번호을 입력해주세요."
          ></TextBox>
        </div>
        <div className="input-box">
          <button onClick={login} className="login-btn">
            로그인
          </button>
          <button
            className="login-google-btn"
            onClick={() => window.location.replace(data)}
          >
            <img src="https://soolung.s3.ap-northeast-2.amazonaws.com/resources/google.svg" alt="google" />
            <span>구글 계정으로 로그인</span>
          </button>
        </div>
        <div className="to-signup">
          아직 회원이 아니신가요?
          <span onClick={() => window.location.replace(data)}>
            구글 계정으로 회원가입
          </span>
        </div>
      </div>
    </section>
  );
};
