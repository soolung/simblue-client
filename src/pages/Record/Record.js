import "./Record.scss";
import { useQuery } from "react-query";
import { getMyApplications } from "../../utils/api/application";
import { useRecoilValue } from "recoil";
import { userState } from "../../utils/atom/user";
import RecordKanban from "../../components/Record/RecordKanban/RecordKanban";
import ReplyRecord from "../../components/Record/ReplyRecord/ReplyRecord";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

export default function Record() {
  const { data, isLoading } = useQuery("getMyApplications", getMyApplications);

  const user = useRecoilValue(userState);

  const [state, setState] = useState(data);

  const handleDragEnd = result => {
    const { source, destination } = result;
    if (!result.destination) {
      return;
    }

    const sourceList = state?.applicationMap[source.droppableId];
    const destList = state?.applicationMap[destination.droppableId];
    const draggedCard = sourceList[source.index];

    console.log("destination : ", destination.droppableId);
    if (source.droppableId === destination.droppableId) {
      const newList = Array.from(sourceList);
      newList.splice(source.index, 1);
      newList.splice(destination.index, 0, draggedCard);
      const newMap = {
        ...state?.applicationMap,
        [source.droppableId]: newList,
      };
      // 변경된 맵 객체를 저장합니다.
      setState({ ...state, applicationMap: newMap });
    } else if (
      source.droppableId !== destination.droppableId &&
      (destination.droppableId === "ALWAYS" ||
        destination.droppableId === "IN_PROGRESS" ||
        destination.droppableId === "NOT_STARTED")
    ) {
      // 다른 컬럼으로 drag할 경우
      alert("경고: 해당 카드는 이동할 수 없습니다.");
      return;
    } else {
      let sourceListCopy = Array.from(sourceList);
      let destListCopy = Array.from(destList);
      destListCopy.splice(destination.index, 0, draggedCard);
      sourceListCopy.splice(source.index, 1);
      let newDestMap = {
        ...state?.applicationMap,
        [destination.droppableId]: destListCopy,
        [source.droppableId]: sourceListCopy,
      };

      setState({
        ...state,
        applicationMap: {
          ...newDestMap,
        },
      });
    }
  };

  useEffect(() => {
    if (!data) return;
    setState(data);
  }, [data]);

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
        {state?.authority === "ROLE_TEACHER" ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="record-body">
              <Droppable droppableId="ALWAYS">
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <RecordKanban
                      emoji="📌"
                      title="상시"
                      data={state?.applicationMap?.ALWAYS}
                    />
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="NOT_STARTED">
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <RecordKanban
                      emoji="🌙"
                      title="시작 전"
                      data={state?.applicationMap?.NOT_STARTED}
                    />
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="IN_PROGRESS">
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <RecordKanban
                      emoji="🌞"
                      title="진행 중"
                      data={state?.applicationMap?.IN_PROGRESS}
                    />
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="DONE">
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <RecordKanban
                      emoji="🌚"
                      title="완료됨"
                      data={state?.applicationMap?.DONE}
                    />
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        ) : (
          <div className="student-record-body">
            {state?.applicationMap.applicationList.length > 0 ? (
              <>
                {state?.applicationMap.applicationList.map((a, index) => (
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
