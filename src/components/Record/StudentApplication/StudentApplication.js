import "./StudentApplication.scss";
import {FaTrash} from "react-icons/fa";
export default function StudentApplication(props) {
  return (
    <>
      <div className="student-application">
        <div className="student-application-a">
          <p className="student-application-a-left">
            <p className="student-application-left-left">
              <a className="student-application-emoji">{props.emoji}</a>
              <a className="sutdent-application-title">{props.title}</a>
            </p>
            <p className="student-applicaiton-left-repliedAt">
              {props.repliedAt} 에 신청함
            </p>
          </p>
          <p className="student-application-a-right">
            {props.status === "IN_PROGRESS" ? (
              <p className="application-student-ing">진행중</p>
            ) : (
              <p className="application-student-done">마감</p>
            )}
            <p className="application-student-right-delete">
              <FaTrash/>
            </p>
          </p>
        </div>
      </div>
    </>
  );
}
