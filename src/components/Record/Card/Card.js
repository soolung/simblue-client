import "./Card.scss";
import { HiPencil } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

function Card({ applicationId, emoji, title, status, endDate, numberOfReplies }) {

  const navigate = useNavigate()
  const today = new Date();
  const dday = new Date(endDate);
  const gap = dday.getTime() - today.getTime();
  const result = Math.ceil(gap / (1000 * 60 * 60 * 24));

  return (
    <>
      <div className="record-card">
        <div className="record-card-com">
          <div className="record-card-top">
            <span className="record-card-top-emoji emoji">{emoji}</span>
            <span className="record-card-top-title">{title}</span>
          </div>
          <div className="record-card-bottom">
            <p className="record-card-bottom-p">
              {status === "ALWAYS" ? (
                <span>상시</span>
              ) : status === "NOT_STARTED" ? (
                <span>시작 전</span>
              ) : status === "IN_PROGRESS" ? (
                <span>{result}일 남음</span>
              ) : (
                <span>완료됨</span>
              )}
              <span className="record-card-bar">|</span>
              <span>{numberOfReplies}개의 신청</span>
            </p>
            <HiPencil
              className="record-card-bottom-pen"
              onClick={() => navigate(`/application/${applicationId}/update`)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
