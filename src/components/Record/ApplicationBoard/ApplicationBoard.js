import "./ApplicationBoard.scss";
import { HiPencil } from "react-icons/hi";
import { useState } from "react";
function ApplicationBoard(props) {
  console.log(props.emoji);

  return (
    <>
      <div className="app-board">
        <div className="app-board-com">
          <div className="app-board-top">
            <a className="app-board-top-emoji">{props.emoji}</a>
            <a className="app-board-top-title">{props.title}</a>
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
            <p className="app-board-bottom-pen">
              <HiPencil />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ApplicationBoard;
