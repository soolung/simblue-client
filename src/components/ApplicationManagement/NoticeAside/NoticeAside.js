import "./NoticeAside.scss";
import TextArea from "../../common/TextArea/TextArea";
import Button from "../../Button/Button";
import Notice from "../../Notice/Notice";

export default function NoticeAside({
  noticeIsOpened,
  setNoticeIsOpened,
  notice,
  setNotice,
  create,
  pin,
  data,
  id,
  option,
}) {
  return (
    <>
      <aside className={`notice-aside ${noticeIsOpened ? "active" : ""}`}>
        <div className="notice-aside--close-button-wrapper">
          <button
            className="notice-aside--close-button"
            onClick={() => setNoticeIsOpened(false)}
          >
            <img src="/images/left-double-arrow.svg" alt="close" />
          </button>
        </div>
        {option == "MANAGE" ? (
          <div className="notice-aside--notice-area">
            <TextArea
              className="notice-aside--notice-area-textarea"
              autoSizing={false}
              value={notice}
              onChange={(e) => setNotice(e.target.value)}
            />
            <Button
              className="notice-aside--notice-area-button"
              text={`공지\n하기`}
              action={() =>
                create.mutate({
                  notice: notice,
                  applicationId: id,
                })
              }
            />
          </div>
        ) : (
          ""
        )}
        <div className="notice-aside--notice">
          {data?.noticeList?.map((n, index) => (
            <Notice
              text={n.notice}
              author={n.author}
              time={n.createdAt}
              isPinned={n.isPinned}
              pin={() => pin.mutate(n.id)}
              readOnly={false}
              key={index}
            />
          ))}
        </div>
      </aside>
      <button
        className={`notice-aside-open ${!noticeIsOpened ? "active" : ""}`}
        onClick={() => setNoticeIsOpened(true)}
      >
        <img src="/images/right-arrow.svg" alt="open" />
      </button>
    </>
  );
}
