import "./Record.scss";
import TeacherApplication from "../../components/Record/TeacherApplication";
import { useQuery } from "react-query";
import { getMyApplications } from "../../utils/api/application";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../utils/atom/user";
import ApplicationKanban from "../../components/Record/ApplicationKanban";
export default function Record() {
  const { data } = useQuery("getMyApplications", getMyApplications);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const navigateByAuthority = (id, replyId) => {
    if (user?.authority === "ROLE_TEACHER") {
      navigate(`/application/${id}/manage`);
    } else if (user?.authority === "ROLE_STUDENT") {
      navigate(`/reply/${replyId}/update`);
    }
  };

  return (
    <>
      <section className="record">
        <div className="section-header">
          <p className="section-header-title">기록보기</p>
          <p className="section-header-description">
            {user?.authority === "ROLE_TEACHER" ? (
              <>내가 만든 신청~ 너를 위해 구웠지</>
            ) : (
              <>본인이 신청한 심청</>
            )}
          </p>
        </div>
        <div className="record-body">
          <ApplicationKanban
            emoji="📌"
            title="상시"
            data={data?.applicationMap.ALWAYS}
          />
          <ApplicationKanban
            emoji="🌙"
            title="시작 전"
            data={data?.applicationMap.CLOSED}
          />
          <ApplicationKanban
            emoji="🌞"
            title="진행 중"
            data={data?.applicationMap.OPENED }
          />
          <ApplicationKanban
            emoji="🌚"
            title="완료됨"
            data={data?.applicationMap.DELETED}
          />
        </div>
      </section>
    </>
  );
}
