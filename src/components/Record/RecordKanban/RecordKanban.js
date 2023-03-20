import "./RecordKanban.scss";
import Card from "../Card/Card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

export default function RecordKanban({ emoji, title, data }) {
  const [state, setState] = useState(data);

  const handleChange = result => {
    const items = Array.from(state);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setState(items);
    console.log(items);
  };
  return (
    <DragDropContext onDragEnd={handleChange}>
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
              {state?.map((k, index) => (
                <Draggable key={k.title} draggableId={k.title} index={index}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? "0.5" : "1",
                      }}
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
  );
}
