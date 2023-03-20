import "./RecordKanban.scss";
import Card from "../Card/Card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function RecordKanban({ emoji, title, data }) {
  return (
    <>
      <DragDropContext>
        <Droppable droppableId="record-kanban">
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
                    {provided => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Card
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
      </DragDropContext>
    </>
  );
}
