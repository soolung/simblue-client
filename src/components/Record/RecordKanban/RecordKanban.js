import "./RecordKanban.scss";
import Card from "../Card/Card";
import { Draggable } from "react-beautiful-dnd";
import { useEffect, useMemo } from "react";

export default function RecordKanban({ emoji, title, data }) {
  return (
    <>
      <div className="record-kanban">
        <div className="record-kanban-top">
          <span className="emoji">{emoji}</span>
          <span className="record-kanban-title">{title}</span>
        </div>
        <div className="record-kanban-bottom">
          {data?.map((k, index) => (
            <Draggable key={k.title} draggableId={k.title} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    opacity: snapshot.isDragging ? "0.5" : "1",
                  }}
                >
                  <Card
                    applicationId={k.applicationId}
                    emoji={k.emoji}
                    title={k.title}
                    endDate={k.endDate}
                    starteDate={k.startDate}
                    status={k.status}
                    numberOfReplies={k.numberOfReplies}
                    key={index}
                  />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      </div>
    </>
  );
}
