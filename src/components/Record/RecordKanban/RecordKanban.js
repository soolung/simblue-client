import "./RecordKanban.scss";
import Card from "../Card/Card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

export default function RecordKanban({ emoji, title, data }) {
  //page안에 있는 record-body가 칸반보드의 몸통인데 그 부분을 여기로 옮겨야 됨 그래야 dragdropcontext에서 onDragEnd하기 편함
  return (
    <Droppable droppableId={`droppable-${title}`}>
      {provided => (
        <div
          className="record-kanban"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
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
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
