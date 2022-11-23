import "./Record.scss";
import {useEffect, useState} from "react";
import data from "../Look/data.json";
import TeacherApplication from "../../components/Record/TeacherApplication";

export default function Record() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // set data first
        setApplications(data.applications);
    }, [])

    return (
        <>
            <section className="record">
                <div className="section-header">
                    <p className="section-header-title">기록보기</p>
                    <p className="section-header-description">내가 만든 신청~ 너를 위해 구웠지</p>
                </div>
                <div className="record-application-section">
                    {
                        applications.map(a => (
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
