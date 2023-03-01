import "./Record.scss";
import TeacherApplication from "../../components/Record/TeacherApplication";
import { useQuery } from "react-query";
import { getMyApplications } from "../../utils/api/application";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../utils/atom/user";

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
        <div className="record-application-section">
          {data?.applicationList?.map((a, index) => (
            <TeacherApplication
              id={a.id}
              title={a.title}
              emoji={a.emoji}
              description={a.description}
              endDate={a.endDate}
              isAlways={a.isAlways}
              navigateManagement={() => navigateByAuthority(a.id, a.replyId)}
              key={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}
