import ApplicationBoard from "./ApplicationBoard/ApplicationBoard";
import "./ApplicationKanban.scss";
export default function ApplicationKanban(props) {
  return (
    <>
      <div className="AppKanban">
        <div className="AppKanban-top">
          <a>{props.emoji}</a>
          <a className="AppKanban-title">{props.title}</a>
        </div>
        <div className="AppKanban-bottom">
          {props?.data?.map((k) => {
            <ApplicationBoard
              emoji={k.emoji}
              title={k.title}
              replyId={k.replyId}
            />;
          })}
        </div>
      </div>
    </>
  );
}
