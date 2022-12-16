import "./ResultTable.scss";
import {checkUrlForm} from "../../../utils/etc/LinkChecker";

export default function ResultTable({data, tableRef}) {
    return (
        <table className="application-management--result-table"
               ref={tableRef}
        >
            <tr className="application-management--result-table--field">
                <td>학번</td>
                <td>이름</td>
                {data?.questionList?.map((q, index) => (
                    <td key={index}>
                        {q}
                    </td>
                ))
                }
            </tr>
            <tbody>
            {data?.userResponseList?.length > 0
                ?
                <>
                    {
                        data?.userResponseList?.map((r, index) => (
                            <tr className="application-management--result-table--content" key={index}>
                                <td>
                                    {r.studentNumber}
                                </td>
                                <td>
                                    {r.name}
                                </td>
                                {r.answerList?.map((a, index) => (
                                    <td key={index}>
                                        {
                                            checkUrlForm(a) ?
                                                <a href={a} target="_blank">
                                                            <span
                                                                className="application-management--result-table--link"/>
                                                    <span className="hidden">{a}</span>
                                                </a>
                                                :
                                                <span>
                                                                {a}
                                                            </span>
                                        }
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
    )
}
