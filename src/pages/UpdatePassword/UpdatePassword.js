import "./UpdatePassword.scss";
import React, { useEffect, useState } from "react";
import TextBox from "../../components/common/TextBox/TextBox";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { updatePassword } from "../../utils/api/auth";
import { useMutation } from "react-query";

export const UpdatePassword = () => {
  const navigate = useNavigate();
  const [updatePwdata, setUpdatePwData] = useState({
    newPassword: "",
    oldPassword: "",
    reNewPassword: "",
  });

  const { mutate } = useMutation(updatePassword, {
    onSuccess: (data) => {
      alert("비밀번호 변경 완료 !!");
      console.log(data);
    },
    onError: (err) => {
      console.log("에러다");
      alert(err.response.data.message);
    },
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUpdatePwData({ ...updatePwdata, [name]: value });
  };

  const Submit = (e) => {
    const { newPassword, oldPassword, reNewPassword } = updatePwdata;
    if (newPassword == reNewPassword) {
      mutate({
        newPassword: newPassword,
        oldPassword: oldPassword,
      });
    }
  };

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
                type="password"
                placeholder="현재 비밀번호를 입력하세요"
                onChange={onChange}
                className="input-element"
                name="oldPassword"
              />
              <TextBox
                className="input-element"
                type="password"
                placeholder="새로운 비밀번호를 입력하세요"
                onChange={onChange}
                name="newPassword"
              />
              <TextBox
                className="input-element"
                type="password"
                placeholder="새로운 비밀번호를 한 번 더 입력하세요"
                onChange={onChange}
                name="reNewPassword"
              />
            </div>
          </div>
          <button onClick={Submit} className="pw-change-btn">
            변경
          </button>
        </div>
      </section>
    </>
  );
};
