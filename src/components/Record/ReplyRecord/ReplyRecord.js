import "./ReplyRecord.scss";
import { FaTrash } from "react-icons/fa";

export default function ReplyRecord({ emoji, title, repliedAt, status }) {
  return (
    <>
      <div className="reply-record">
        <div className="reply-record-a">
          <div className="reply-record-left">
            <div className="reply-record-application">
              <span className="reply-record-emoji emoji">{emoji}</span>
              <span className="reply-record-title">{title}</span>
            </div>
            <p className="reply-record-left-replied-at">
              {repliedAt} 에 신청함
            </p>
          </div>
          <div className="reply-record-a-right">
            {status === "IN_PROGRESS" ? (
              <p className="reply-record-ing">진행중</p>
            ) : (
              <p className="reply-record-done">마감</p>
            )}
            <FaTrash className="reply-record-right-delete"/>
          </div>
        </div>
      </div>
    </>
  );
}
