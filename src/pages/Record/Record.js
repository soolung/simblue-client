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
  const navigateManagement = (id) => {
    if (user?.authority === "ROLE_TEACHER") {
      navigate(`/application/${id}/manage`);
    }
  };

  return (
    <>
      <section className="record">
        <div className="section-header">
          <p className="section-header-title">기록보기</p>
          <p className="section-header-description">
            {user?.authority === "ROLE_TEACHER" ? (
              <p>내가 만든 신청~ 너를 위해 구웠지</p>
            ) : (
              <p>본인이 신청한 심청</p>
            )}
          </p>
        </div>
        <div className="record-application-section">
          {data?.applicationList.map((a) => (
            <TeacherApplication
              id={a.id}
              title={a.title}
              emoji={a.emoji}
              description={a.description}
              endDate={a.endDate}
              isAlways={a.isAlways}
              navigateManagement={() => navigateManagement(a.id)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
