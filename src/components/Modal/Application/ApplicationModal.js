import "./ApplicationModal.scss";
import Modal from "react-modal";
import Notice from "../../Notice/Notice";
import Button from "../../Button/Button";
import Questions from "./Questions/Questions";
import { useMutation, useQuery } from "react-query";
import {
  getApplicationDetail,
  respondApplication,
} from "../../../utils/api/application";
import { useEffect, useState } from "react";
import Loading from "../../common/Loading/Loading";
import { useRecoilValue } from "recoil";
import { userState } from "../../../utils/atom/user";
import { Navigate, useParams } from "react-router-dom";

export default function ApplicationModal() {
  const { id } = useParams();
  const user = useRecoilValue(userState);

  // 신청폼을 제출하기 눌렸을때를 말하는거임
  const { mutate } = useMutation(respondApplication, {
    onSuccess: () => {
      alert("성공!");
      Navigate("/");
      // navigate로 main 으로 가줘여함
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

  return (
    <div className="application-modal">
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <>
          <div className="application-modal-notice">
            <div className="application-modal-notice-inner">
              {data?.noticeList?.length > 0 ? (
                data?.noticeList?.map((n, index) => (
                  <Notice
                    text={n.notice}
                    author={n.author}
                    time={n.createdAt}
                    isPinned={n.isPinned}
                    key={index}
                  />
                ))
              ) : (
                <p className="application-modal-notice-no">
                  공지사항이 없습니다.
                </p>
              )}
            </div>
          </div>
          <div className="application-modal-application">
            <div className="application-modal-application-header">
              <p className="application-modal-application-header-title">
                <span className="emoji">{data?.emoji}</span>
                {data?.title}
              </p>
              <p className="application-modal-application-header-description">
                {data?.description}
              </p>
              <p className="application-modal-application-header-time">
                - {data?.isAlways ? "상시" : data?.endDate}
              </p>
            </div>
            <div className="application-modal-application-section">
              <Questions
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
              className="application-modal-application-submit"
              disabled={!user?.authority}
            />
          </div>
        </>
      )}
    </div>
  );
}
