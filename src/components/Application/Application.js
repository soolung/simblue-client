import "./Application.scss";
import { Link } from "react-router-dom";

export default function Application({id, title, emoji, description, endDate, status}) {
  return (
    <Link to={`/application/${id}`}>
      <div className="application">
        <div className="application-title">
          <span className="application-title-title">{title}</span>
          <span className="emoji application-title-icon">{emoji}</span>
        </div>
        <p className="application-comment">{description}</p>
        <p className="application-end-date">
          - {status === "ALWAYS" ? "상시" : endDate}
        </p>
      </div>
    </Link>
  );
}
