import "./ResultTable.scss";

export default function ResultTable({ data, tableRef }) {
  const stateToKorean = {
    REJECTED: '거절됨',
    APPROVED: '수락됨',
    WAITING: '대기중'
  }

  return (
    <table className="application-management--result-table"
           ref={tableRef}
    >
      <tr className="application-management--result-table--field">
        <td>학번</td>
        <td>이름</td>
        {data?.questionList.map((q) => (
          <td key={q.id}>{q.question}</td>
        ))}
      </tr>
      <tbody>
      {data?.resultList?.length > 0 ?
        <>
          {
            data.resultList.map((r, index) => (
              <tr className="application-management--result-table--content" key={index}>
                <td>{r.studentNumber}</td>
                <td>{r.name}</td>
                {data?.questionList.map((q, index) => {
                  if (q.id !== r.replyList[index]?.questionId) {
                    return <td key={index}></td>
                  }

                  return (
                    <td key={index}>
                      {
                        q.type === "LINK" ?
                          <a href={r.replyList[index].reply} target="_blank">
                            <span className="application-management--result-table--link" />
                            <span className="hidden">{r.replyList[index].reply}</span>
                          </a>
                          :
                          q.type === "APPROVAL" ?
                            <span>
                              {r.replyList[index].reply}
                              /
                              {stateToKorean[r.replyList[index].state]}
                            </span>
                            :
                            <span>{r.replyList[index].reply}</span>
                      }
                    </td>
                  )
                })}
              </tr>
            ))}
        </>
        :
        <tr>
          <td className="application-management--result-table--content-empty" colSpan={1000}>
            응답이 없습니다.
          </td>
        </tr>
      }
      </tbody>
    </table>
  )
}
