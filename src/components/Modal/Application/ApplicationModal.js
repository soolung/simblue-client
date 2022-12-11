import "./ApplicationModal.scss";
import Modal from "react-modal";
import Notice from "../../Notice/Notice";
import Button from "../../Button/Button";
import Questions from "./Questions/Questions";
import {useQuery} from "react-query";
import {getApplicationDetail} from "../../../utils/api/application";
import {useEffect} from "react";
import Loading from "../../common/Loading/Loading";

export default function ApplicationModal({isOpen, closeModal, id}) {
    const {data, refetch, isLoading, isFetching} = useQuery('getApplicationDetail', () => getApplicationDetail(id));

    useEffect(() => {
        if (isOpen) {
            refetch();
        }
    }, [isOpen])

    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={closeModal}
                   className="modal application-modal"
                   overlayClassName="modal-overlay"
            >
                {
                    isLoading || isFetching ?
                        <Loading/>
                        :
                        <>
                            <div className="application-modal-notice">
                                <div className="application-modal-notice-inner">
                                    {data?.noticeList?.length > 0 ?
                                        data?.noticeList?.map(n => (
                                            <Notice
                                                text={n.notice}
                                                author={n.author}
                                                time={n.createdAt}
                                                isPinned={n.isPinned}
                                            />
                                        ))
                                        :
                                        <p className="application-modal-notice-no">공지사항이 없습니다.</p>
                                    }
                                </div>
                            </div>
                            <div className="application-modal-application">
                                <div className="application-modal-application-header">
                                    <p className="application-modal-application-header-title">
                                        <span className="emoji">{data?.emoji}</span>
                                        {data?.title}
                                    </p>
                                    <p className="application-modal-application-header-description">{data?.description}</p>
                                    <p className="application-modal-application-header-time">- {data?.isAlways ? '상시' : data?.endDate}</p>
                                </div>
                                <div className="application-modal-application-section">
                                    <Questions
                                        items={data?.questionList}
                                    />
                                </div>
                                <Button
                                    text={"제출하기"}
                                    action={() => {
                                    }}
                                    className="application-modal-application-submit"
                                />
                            </div>
                        </>
                }
            </Modal>
        </>
    )
}
