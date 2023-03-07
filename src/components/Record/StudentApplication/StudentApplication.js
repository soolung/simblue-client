import "./StudentApplication.scss";
import { FaTrash } from "react-icons/fa";
import { cancelReply } from "../../../utils/api/reply";
import { useMutation } from "react-query";
export default function StudentApplication(props) {
  const replydelete = useMutation(cancelReply, {
    onSuccess: (replyId = props.replyId) => {},
  });

  return (
    <>
      <div className="student-application">
        <div
          className="student-application-a"
          onClick={props.navigateManagement}
        >
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
            {props.status === "IN_PROGRESS" || props.status === "ALWAYS" ? (
              <p className="application-student-ing">진행중</p>
            ) : (
              <p className="application-student-done">마감</p>
            )}
            <p className="application-student-right-delete">
              <FaTrash replydelete={replydelete} />
            </p>
          </p>
        </div>
      </div>
    </>
  );
}
