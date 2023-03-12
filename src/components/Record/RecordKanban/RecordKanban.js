import "./RecordKanban.scss";
import Card from '../Card/Card';

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
          ))}
        </div>
      </div>
    </>
  );
}
