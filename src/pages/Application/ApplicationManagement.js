import "./ApplicationManagement.scss";
import {useRef, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {getApplicationResult} from "../../utils/api/application";
import {useParams} from "react-router-dom";
import Loading from "../../components/common/Loading/Loading";
import {createNotice, pinNotice} from "../../utils/api/notice";
import {useDownloadExcel} from "react-export-table-to-excel";
import NoticeAside from "../../components/ApplicationManagement/NoticeAside/NoticeAside";
import ResultTable from "../../components/ApplicationManagement/ResultTable/ResultTable";

export default function ApplicationManagement() {
    const {id} = useParams();
    const [noticeIsOpened, setNoticeIsOpened] = useState(true);
    const [notice, setNotice] = useState("");
    const {data, isLoading, isFetching, refetch} = useQuery('getApplicationRequest', () => getApplicationResult(id), {})

    const create = useMutation(createNotice, {
        onSuccess: () => {
            setNotice("");
            refetch();
        }
    })

    const pin = useMutation(pinNotice, {
        onSuccess: () => {
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
            <NoticeAside
                noticeIsOpened={noticeIsOpened}
                setNoticeIsOpened={setNoticeIsOpened}
                notice={notice}
                setNotice={setNotice}
                create={create}
                pin={pin}
                data={data}
                id={id}
            />

            <section className={`application-management ${noticeIsOpened ? 'half' : ''}`}>
                <div className="application-management-application-header">
                    <p className="application-management-application-header-title">
                        <span className="emoji">{data?.application?.emoji}</span>
                        {data?.application?.title}
                    </p>
                    <p className="application-management-application-header-description">{data?.application?.description}</p>
                    <p className="application-management-application-header-time">- {data?.application?.isAlways ? '상시' : data?.application?.endDate}</p>
                    <img className="application-management--export" src="/images/export.svg" alt="export"
                         onClick={onDownload}/>
                </div>
                <ResultTable
                    tableRef={tableRef}
                    data={data}
                />
            </section>
        </>
    )
}
