import "./Card.scss";
import { HiPencil } from "react-icons/hi";
import { Link } from "react-router-dom";
import { statusCheck } from "../../../utils/etc/StatusDivision";
function Card({
  applicationId,
  emoji,
  title,
  status,
  endDate,
  numberOfReplies,
}) {
  return (
    <Link className="record-card" to={`/application/${applicationId}/manage`}>
      <div className="record-card-com">
        <div className="record-card-top">
          <span className="record-card-top-emoji emoji">{emoji}</span>
          <span className="record-card-top-title">{title}</span>
        </div>
        <div className="record-card-bottom">
          <p className="record-card-bottom-p">
            {statusCheck(status, endDate)}
            <span className="record-card-bar">|</span>
            <span>{numberOfReplies}개의 신청</span>
          </p>
          <Link to={`/application/${applicationId}/update`}>
            <HiPencil className="record-card-bottom-pen" />
          </Link>
        </div>
      </div>
    </Link>
  );
}

export default Card;
