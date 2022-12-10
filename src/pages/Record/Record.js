import "./Record.scss";
import TeacherApplication from "../../components/Record/TeacherApplication";
import {useQuery} from "react-query";
import {getMyApplications} from "../../utils/api/application";

export default function Record() {
    const {data} = useQuery('getMyApplications', getMyApplications);

    return (
        <>
            <section className="record">
                <div className="section-header">
                    <p className="section-header-title">기록보기</p>
                    <p className="section-header-description">내가 만든 신청~ 너를 위해 구웠지</p>
                </div>
                <div className="record-application-section">
                    {
                        data?.map(a => (
                            <TeacherApplication
                                id={a.id}
                                title={a.title}
                                emoji={a.emoji}
                                description={a.description}
                                endDate={a.endDate}
                                isAlways={a.isAlways}
                            />
                        ))
                    }
                </div>
            </section>
        </>
    )
}
