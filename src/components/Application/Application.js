import './Application.scss';
import {useState} from "react";
import ApplicationModal from "../Modal/Application/ApplicationModal";
import useModal from "../../hooks/useModal";

export default function Application(props) {
    const {openModal, closeModal} = useModal();

    const openApplicationModal = () => {
        openModal(
            <ApplicationModal
                closeModal={closeModal}
                id={props.id}
                key={props.id}
            />
        )
    }
    return (
        <>
            <div className="application" onClick={openApplicationModal}>
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
        </>
    )
}
