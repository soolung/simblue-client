import './TeacherApplication.scss';
import {Link} from "react-router-dom";

export default function TeacherApplication(props) {
    return (
        <>
            <Link to={`/application/${props.id}`}>
                <div className="teacher-application">
                    <div className="application-title">
                        <span className="emoji application-title-icon">
                            {props.emoji}
                        </span>
                        <span className="application-title-title">
                            {props.title}
                        </span>
                    </div>
                    <p className="application-comment">
                        {props.description}
                    </p>
                    <p className="application-end-date">
                        - {props.isAlways ? "상시" : props.endDate}
                    </p>
                </div>
            </Link>
        </>
    )
}
