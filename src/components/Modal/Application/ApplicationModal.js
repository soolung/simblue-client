import "./ApplicationModal.scss";
import Modal from "react-modal";
import Notice from "../../Notice/Notice";
import Button from "../../Button/Button";
import Questions from "./Questions/Questions";
import {useMutation, useQuery} from "react-query";
import {getApplicationDetail, respondApplication} from "../../../utils/api/application";
import {useEffect, useState} from "react";
import Loading from "../../common/Loading/Loading";
import {useRecoilValue} from "recoil";
import {userState} from "../../../utils/atom/user";

export default function ApplicationModal({closeModal, id}) {
    const user = useRecoilValue(userState)
    const {mutate} = useMutation(respondApplication, {
        onSuccess: () => {
            alert('성공!')
            closeModal();
        }
    })

    const [request, setRequest] = useState([{}])
    const {data, refetch, isLoading, isFetching} = useQuery('getApplicationDetail', () => getApplicationDetail(id), {
        enabled: false,
        onSuccess: (data) => {
            setRequest([...data.questionList])
        }
    });

    const handleResponse = (a, index) => {
        if (request[index]) {
            setRequest(
                [...request],
                request[index].userResponseList = [...a]
            )
        }
    }

    useEffect(() => {
        refetch();
    }, [])

    return (
        <>
            <Modal isOpen={true} onRequestClose={closeModal}
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
                                        data?.noticeList?.map((n, index) => (
                                            <Notice
                                                text={n.notice}
                                                author={n.author}
                                                time={n.createdAt}
                                                isPinned={n.isPinned}
                                                key={index}
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
                                        handleResponse={handleResponse}
                                    />
                                </div>
                                <Button
                                    text={user?.authority ? "제출하기" : "로그인 후 응답할 수 있어요"}
                                    action={() => mutate({
                                        id: id,
                                        request: {requestRequestList: [...request]}
                                    })}
                                    className="application-modal-application-submit"
                                    disabled={!user?.authority}
                                />
                            </div>
                        </>
                }
            </Modal>
        </>
    )
}
