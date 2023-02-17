import "./ApplicationDetail.scss";
import Button from "../../../components/Button/Button";
import Questions from "./Questions/Questions";
import { useMutation, useQuery } from "react-query";
import { getApplicationDetail, } from "../../../utils/api/application";
import { useEffect, useState } from "react";
import Loading from "../../../components/common/Loading/Loading";
import { useRecoilValue } from "recoil";
import { userState } from "../../../utils/atom/user";
import { useNavigate, useParams } from "react-router-dom";
import NoticeAside from "../../../components/ApplicationManagement/NoticeAside/NoticeAside";
import { replyApplication } from '../../../utils/api/reply';

export default function ApplicationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useRecoilValue(userState);

  const { mutate } = useMutation(replyApplication, {
    onSuccess: () => {
      alert("성공!");
      navigate("/");
    },
    onError: (err) => {
      const errMessage = err.response.data.message;
      alert(errMessage);
    },
  });

  const [request, setRequest] = useState([{}]);
  const { data, refetch, isLoading, isFetching } = useQuery(
    "getApplicationDetail",
    () => getApplicationDetail(id),
    {
      enabled: false,
      onSuccess: (data) => {
        setRequest([...data.questionList]);
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
        <Loading/>
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
            className={`application-detail-application ${noticeIsOpened ? "half" : ""}`}
          >
            <div className="application-detail-application-header">
              <p className="application-detail-application-header-title">
                <span className="emoji">{data?.emoji}</span>
                {data?.title}
              </p>
              <p className="application-detail-application-header-description">
                {data?.description}
              </p>
              <p className="application-detail-application-header-time">
                - {data?.isAlways ? "상시" : data?.endDate}
              </p>
            </div>
            <div className="application-detail-application-section">
              <Questions
                items={data?.questionList}
                handleResponse={handleResponse}
              />
            </div>
            <Button
              text={user?.authority ? "제출하기" : "로그인 후 응답할 수 있어요"}
              action={() =>
                mutate({
                  request: {
                    applicationId: id,
                    requestRequestList: [...request]
                  },
                })
              }
              className="application-detail-application-submit"
              disabled={!user?.authority}
            />
          </section>
        </>
      )}
    </>
  );
}
