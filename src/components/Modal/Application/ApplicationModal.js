import "./ApplicationModal.scss";
import Modal from "react-modal";
import {useEffect, useState} from "react";
import noticeData from "./noticeData.json";
import Notice from "../../Notice/Notice";

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

                </div>
            </Modal>
        </>
    )
}
