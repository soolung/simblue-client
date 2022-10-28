import './Application.scss';
import {useState} from "react";
import ApplicationModal from "../Modal/Application/ApplicationModal";

export default function Application(props) {

    const [applicationModalIsOpen, setApplicationModalOpen] = useState(false);

    return (
        <>
            <div className="application" onClick={() => setApplicationModalOpen(true)}>
                <div className="application-title">
                    <span className="application-title-title">
                        {props.title}
                    </span>
                    <span className="emoji application-title-icon">
                        {props.emoji}
                    </span>

                </div>
                <p className="application-comment">
                    {props.description}
                </p>
                <p className="application-end-date">
                    - {props.isAlways ? "상시" : props.endDate}
                </p>
            </div>
            <ApplicationModal
                isOpen={applicationModalIsOpen}
                closeModal={() => setApplicationModalOpen(false)}
                id={props.id}
            />
        </>
    )
}