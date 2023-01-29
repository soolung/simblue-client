import "./ApplicationPage.scss";
import Notice from "../../../components/Notice/Notice";
import Button from "../../../components/Button/Button";
import Questions from "./Questions/Questions";
import { useMutation, useQuery } from "react-query";
import {
  getApplicationDetail,
  respondApplication,
} from "../../../utils/api/application";
import { useEffect, useState } from "react";
import Loading from "../../../components/common/Loading/Loading";
import { useRecoilValue } from "recoil";
import { userState } from "../../../utils/atom/user";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NoticeAside from "../../../components/ApplicationManagement/NoticeAside/NoticeAside";

export default function ApplicationModal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useRecoilValue(userState);

  // 신청폼을 제출하기 눌렸을때를 말하는거임
  const { mutate } = useMutation(respondApplication, {
    onSuccess: () => {
      alert("성공!");
      navigate("/");
      // navigate로 main 으로 감
    },
    onError: (err) => {
      const errMessage = err.response.data.message;
      alert(errMessage); // 에러 처리
    },
  });

  const [request, setRequest] = useState([{}]);
  const { data, refetch, isLoading, isFetching } = useQuery(
    "getApplicationDetail",
    () => getApplicationDetail(id), // getApplication 은 id를 넘겨주면 우리에게 상세페이지 데이터를 넘겨줌
    {
      enabled: false,
      onSuccess: (data) => {
        setRequest([...data.questionList]); // setRequest 선생님들이 create한 질문 리스트를 말함
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleResponse = (a, index) => {
    if (request[index]) {
      setRequest([...request], (request[index].userResponseList = [...a]));
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const [noticeIsOpened, setNoticeIsOpened] = useState(true);
  const [notice, setNotice] = useState("");

  return (
    <>
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <>
          <NoticeAside
            option="NOT MANAGE"
            noticeIsOpened={noticeIsOpened}
            setNoticeIsOpened={setNoticeIsOpened}
            notice={notice}
            setNotice={setNotice}
            data={data}
            id={id}
          />
          <section
            className={`application-page-application ${
              noticeIsOpened ? "half" : ""
            }`}
          >
            <div className="application-page-application-header">
              <p className="application-page-application-header-title">
                <span className="emoji">{data?.emoji}</span>
                {data?.title}
              </p>
              <p className="application-page-application-header-description">
                {data?.description}
              </p>
              <p className="application-page-application-header-time">
                - {data?.isAlways ? "상시" : data?.endDate}
              </p>
            </div>
            <div className="application-page-application-section">
              <Questions // 질문들의 데이터를 나열해줌
                items={data?.questionList}
                handleResponse={handleResponse}
              />
            </div>
            <Button
              text={user?.authority ? "제출하기" : "로그인 후 응답할 수 있어요"}
              action={() =>
                mutate({
                  id: id,
                  request: { requestRequestList: [...request] },
                })
              }
              className="application-page-application-submit"
              disabled={!user?.authority}
            />
          </section>
        </>
      )}
    </>
  );
}
