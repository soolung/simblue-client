import "./ApplicationModal.scss";
import Modal from "react-modal";
import {useEffect, useState} from "react";
import noticeData from "./noticeData.json";
import a from "./application.json";
import Notice from "../../Notice/Notice";
import Button from "../../Button/Button";
import Questions from "./Questions/Questions";

export default function ApplicationModal({isOpen, closeModal, id}) {

    useEffect(() => {
        // get notices by id
        setNotices(noticeData.notices)
    }, [])

    useEffect(() => {
        // get application fields by id
    }, [])

    const [notices, setNotices] = useState([]);
    const [fields, setFields] = useState([]);

    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={closeModal}
                   className="modal application-modal"
                   overlayClassName="modal-overlay"
            >
                <div className="application-modal-notice">
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
                <div className="application-modal-application">
                    <div className="application-modal-application-header">
                        <p className="application-modal-application-header-title">
                            <span className="emoji">{a.emoji}</span>
                            {a.title}
                        </p>
                        <p className="application-modal-application-header-description">{a.description}</p>
                        <p className="application-modal-application-header-time">- {a.isAlways ? '상시' : a.endDate}</p>
                    </div>
                    <div className="application-modal-application-section">
                        <Questions
                            items={a.applicationQuestions}
                        />
                    </div>
                    <Button
                        text={"제출하기"}
                        action={() => {
                        }}
                        className="application-modal-application-submit"
                    />
                </div>
            </Modal>
        </>
    )
}
