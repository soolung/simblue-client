import "./ApplicationBoard.scss";
import { HiPencil } from "react-icons/hi";
import { useState } from "react";
function ApplicationBoard(props) {
  console.log(props.emoji);

  return (
    <>
      <div className="AppBoard">
        <div className="AppBoard-com">
          <div className="AppBoard-top">
            <p>{props.emoji}</p>
            <p>{props.title}</p>
          </div>
          <div className="app-board-bottom">
            <p className="app-board-bottom-p">
              {props.status === "ALWAYS" ? (
                <a>상시</a>
              ) : props.status === "NOT_STARTED" ? (
                <a>시작 전</a>
              ) : props.status === "IN_PROGRESS" ? (
                <a>일 남음</a>
              ) : (
                <a>완료됨</a>
              )}
              <a className="app-board-bar">|</a>
              <a>{props.numberOfReplies}개의 신청</a>
            </p>
            <p>
              <HiPencil />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
