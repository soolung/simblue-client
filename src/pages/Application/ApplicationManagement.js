import "./ApplicationManagement.scss";
import {useState} from "react";
import Button from "../../components/Button/Button";
import TextArea from "../../components/common/TextArea/TextArea";
import Notice from "../../components/Notice/Notice";
import {useEffect} from "react";
import noticeData from "../../components/Modal/Application/noticeData.json";
import a from "../../components/Modal/Application/application.json";

export default function ApplicationManagement() {
    const [noticeIsOpened, setNoticeIsOpened] = useState(true);
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        // get notices by id
        setNotices(noticeData.notices)
    }, [])

    return (
        <>
            <aside className={`notice-aside ${noticeIsOpened ? 'active' : ''}`}>
                <div className="notice-aside--close-button-wrapper">
                    <button
                        className="notice-aside--close-button"
                        onClick={() => setNoticeIsOpened(false)}
                    >
                        <img src="/images/left-double-arrow.svg" alt="close"/>
                    </button>
                </div>
                <div className="notice-aside--notice-area">
                    <TextArea
                        className="notice-aside--notice-area-textarea"
                        autoSizing={false}
                    />
                    <Button
                        className="notice-aside--notice-area-button"
                        text="공지 하기"
                    />
                </div>
                <div className="notice-aside--notice">
                    {
                        notices.map(n => (
                            <Notice
                                text={n.notice}
                                author={n.author}
                                time={n.createdAt}
                                isPinned={n.isPinned}
                            />
                        ))
                    }
                </div>
            </aside>
            <button
                className={`notice-aside-open ${!noticeIsOpened ? 'active' : ''}`}
                onClick={() => setNoticeIsOpened(true)}
            >
                <img src="/images/right-arrow.svg" alt="open"/>
            </button>
            <section className={`application-management ${noticeIsOpened ? 'half' : ''}`}>
                <div className="application-management-application-header">
                    <p className="application-management-application-header-title">
                        <span className="emoji">{a.emoji}</span>
                        {a.title}
                    </p>
                    <p className="application-management-application-header-description">{a.description}</p>
                    <p className="application-management-application-header-time">- {a.isAlways ? '상시' : a.endDate}</p>
                </div>
            </section>
        </>
    )
}
