import ApplicationBoard from "./ApplicationBoard/ApplicationBoard";
import "./ApplicationKanban.scss";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../utils/atom/user";

export default function ApplicationKanban({ emoji, title, data }) {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const navigateByAuthority = (id, replyId) => {
    if (user?.authority === "ROLE_TEACHER") {
      navigate(`/application/${id}}/update`);
    } else if (user?.authority === "ROLE_STUDENT") {
      navigate(`/reply/${replyId}/update`);
    }
  };
  return (
    <>
      <div className="AppKanban">
        <div className="AppKanban-top">
          <a>{emoji}</a>
          <a className="AppKanban-title">{title}</a>
        </div>
        <div className="AppKanban-bottom">
          {data?.map((k) => (
            <ApplicationBoard
              emoji={k.emoji}
              title={k.title}
              endDate={k.endDate}
              starteDate={k.startDate}
              status={k.status}
              numberOfReplies={k.numberOfReplies}
              navigateManagement={() => navigateByAuthority(k.id, k.replyId)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
