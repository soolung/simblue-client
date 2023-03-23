import "./Record.scss";
import { useQuery } from "react-query";
import { getMyApplications } from "../../utils/api/application";
import { useRecoilValue } from "recoil";
import { userState } from "../../utils/atom/user";
import RecordKanban from "../../components/Record/RecordKanban/RecordKanban";
import ReplyRecord from "../../components/Record/ReplyRecord/ReplyRecord";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";

export default function Record() {
  const { data } = useQuery("getMyApplications", getMyApplications);
  const user = useRecoilValue(userState);
  const onDragEnd = result => {
    const { destination, source } = result;

    const invalidColumns = ["상시", "시작 전", "진행 중"];
    if (invalidColumns.includes(destination.droppableId)) {
      // 옮길 수 없는 부분입니다.
      if (destination.droppableId === source.droppableId) {
        // destination과 source가 같은 경우
        return;
      }
      alert(`${destination.droppableId}에 옮길 수 없는 부분입니다.`);
      return;
    }
    // 상시가 아닌 다른 상태로 이동할 경우
    // 기존 코드 수행
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
        {data?.authority === "ROLE_TEACHER" ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="record-body">
              <RecordKanban
                emoji="📌"
                title="상시"
                data={data?.applicationMap.ALWAYS}
              />
              <RecordKanban
                emoji="🌙"
                title="시작 전"
                data={data?.applicationMap.NOT_STARTED}
              />
              <RecordKanban
                emoji="🌞"
                title="진행 중"
                data={data?.applicationMap.IN_PROGRESS}
              />
              <RecordKanban
                emoji="🌚"
                title="완료됨"
                data={data?.applicationMap.DONE}
              />
            </div>
          </DragDropContext>
        ) : (
          <div className="student-record-body">
            {data?.applicationMap.applicationList.length > 0 ? (
              <>
                {data?.applicationMap.applicationList.map((a, index) => (
                  <ReplyRecord
                    emoji={a.emoji}
                    title={a.title}
                    repliedAt={a.repliedAt}
                    status={a.status}
                    key={index}
                    replyId={a.replyId}
                  />
                ))}
              </>
            ) : (
              <>
                <p className="none">신청한 심청이 없습니다.</p>
              </>
            )}
          </div>
        )}
      </section>
    </>
  );
}

// _________________________________________________________________________
