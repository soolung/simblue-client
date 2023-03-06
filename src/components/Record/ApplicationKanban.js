import ApplicationBoard from "./ApplicationBoard/ApplicationBoard";
import "./ApplicationKanban.scss";
export default function ApplicationKanban({ emoji, title, data }) {
  return (
    <>
      <div className="AppKanban">
        <div className="AppKanban-top">
          <a>{emoji}</a>
          <a className="AppKanban-title">{title}</a>
        </div>
        <div className="AppKanban-bottom">
          {data?.map((k) => (
            <ApplicationBoard
              emoji={k.emoji}
              title={k.title}
              replyId={k.replyId}
              description={k.description}
              endDate={k.endDate}
              starteDate={k.startDate}
              status={k.status}
            />
          ))}
        </div>
      </div>
    </>
  );
}
