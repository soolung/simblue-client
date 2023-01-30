import "./UpdatePassword.scss";
import React, { useEffect, useState } from "react";
import TextBox from "../../components/common/TextBox/TextBox";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

export const UpdatePassword = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="pw-change">
        <div className="img-box">
          <img alt="simblue" src="https://ifh.cc/g/H0wG7w.png" />
        </div>
        <div className="pw-change-right">
          <div className="pw-change-header">
            <div className="pw-change-title">
              <span>비밀번호 변경</span>
              <img alt="welcome" src="https://ifh.cc/g/VBj8B5.png" />
            </div>
            <div className="pw-change-subtitle">
              <span>저런... 까먹으셨군요... ㅜ</span>
            </div>
          </div>
          <div className="pw-change-form">
            <div className="input-box">
              <TextBox
                type="text"
                placeholder="현재 비밀번호를 입력하세요"
                className="input-element"
                name="currentPassword"
                readOnly
              />
              <TextBox
                className="input-element"
                type="password"
                placeholder="새로운 비밀번호를 입력하세요"
                name="newPassword"
              />
              <TextBox
                className="input-element"
                type="password"
                placeholder="새로운 비밀번호를 한 번 더 입력하세요"
                name="reNewPassword"
              />
            </div>
          </div>
          <Button className="pw-change-btn" text="회원가입" />
        </div>
      </section>
    </>
  );
};
