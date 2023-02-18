import "./ApplicationDetail.scss";
import Button from "../../../components/Button/Button";
import Questions from "./Questions/Questions";
import { useMutation, useQuery } from "react-query";
import { getApplicationDetail, } from "../../../utils/api/application";
import { useState } from "react";
import Loading from "../../../components/common/Loading/Loading";
import { useRecoilValue } from "recoil";
import { userState } from "../../../utils/atom/user";
import { useNavigate, useParams } from "react-router-dom";
import NoticeAside from "../../../components/ApplicationManagement/NoticeAside/NoticeAside";
import { getReply, replyApplication } from '../../../utils/api/reply';

export default function ApplicationDetail({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useRecoilValue(userState);

  const reply = useMutation(replyApplication, {
    onSuccess: () => {
      alert("성공!");
      navigate("/");
    },
    onError: (err) => {
      const errMessage = err.response.data.message;
      alert(errMessage);
    },
  });

  const [data, setData] = useState({});
  const [request, setRequest] = useState([{}]);

  const queryApplication = useQuery(
    "getApplicationDetail",
    () => getApplicationDetail(id),
    {
      enabled: mode === "reply",
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setData({ ...data });
        setRequest([...data.questionList]);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const queryReply = useQuery(
    "queryReply",
    () => getReply(id),
    {
      enabled: mode === "update",
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setData({ ...data });
        setRequest([...data.questionList]);
      },
      onError: () => {}
    }
  )

  const handleResponse = (a, index) => {
    if (request[index]) {
      setRequest([...request], (request[index].replyDetailList = [...a]));
    }
  };

  const [noticeIsOpened, setNoticeIsOpened] = useState(true);
  const [notice, setNotice] = useState("");

  return (
    <>
      {queryApplication.isLoading || queryReply.isLoading ? (
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
                reply.mutate({
                  request: {
                    applicationId: id,
                    replyList: [...request]
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
