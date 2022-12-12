import "./ApplicationManagement.scss";
import {useRef, useState} from "react";
import Button from "../../components/Button/Button";
import TextArea from "../../components/common/TextArea/TextArea";
import Notice from "../../components/Notice/Notice";
import {useMutation, useQuery} from "react-query";
import {getApplicationResult} from "../../utils/api/application";
import {useParams} from "react-router-dom";
import Loading from "../../components/common/Loading/Loading";
import {createNotice} from "../../utils/api/notice";
import {DownloadTableExcel, useDownloadExcel} from "react-export-table-to-excel";

export default function ApplicationManagement() {
    const {id} = useParams();
    const [noticeIsOpened, setNoticeIsOpened] = useState(true);
    const [notice, setNotice] = useState("");
    const {data, isLoading, isFetching, refetch} = useQuery('getApplicationRequest', () => getApplicationResult(id))
    const {mutate} = useMutation(createNotice, {
        onSuccess: () => {
            setNotice("");
            refetch();
        }
    })

    const tableRef = useRef(null);
    const {onDownload} = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: data?.application?.title,
        sheet: data?.application?.title
    });

    if (isLoading || isFetching) return <Loading/>

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
                        value={notice}
                        onChange={(e) => setNotice(e.target.value)}
                    />
                    <Button
                        className="notice-aside--notice-area-button"
                        text="공지 하기"
                        action={() => mutate({
                            notice: notice,
                            applicationId: id,
                        })}
                    />
                </div>
                <div className="notice-aside--notice">
                    {
                        data?.noticeList?.map(n => (
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
                        <span className="emoji">{data?.application?.emoji}</span>
                        {data?.application?.title}
                    </p>
                    <p className="application-management-application-header-description">{data?.application?.description}</p>
                    <p className="application-management-application-header-time">- {data?.application?.isAlways ? '상시' : data?.application?.endDate}</p>
                    <img className="application-management--export" src="/images/export.svg" alt="export" onClick={onDownload}/>
                </div>
                <table className="application-management--result-table"
                       ref={tableRef}
                >
                    <thead>
                    <tr className="application-management--result-table--field">
                        <td>학번</td>
                        <td>이름</td>
                        {data?.questionList?.map(q => (
                            <td>
                                {q}
                            </td>
                        ))
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {data?.userResponseList?.length > 0
                        ?
                        <>
                            {
                                data?.userResponseList?.map(r => (
                                    <tr className="application-management--result-table--content">
                                        <td>
                                            {r.studentNumber}
                                        </td>
                                        <td>
                                            {r.name}
                                        </td>
                                        {r.answerList?.map(a => (
                                            <td>
                                                {a}
                                            </td>
                                        ))

                                        }
                                    </tr>
                                ))
                            }
                        </>
                        :
                        <>
                            <tr>
                                <td className="application-management--result-table--content-empty" colSpan={1000}>
                                    응답이 없습니다.
                                </td>
                            </tr>
                        </>
                    }
                    </tbody>
                </table>
            </section>
        </>
    )
}
