import "./Answer.scss"
import Radio from "../../common/Radio/Radio";
import Text from "../../common/Text/Text";
import Check from "../../common/Check/Check";
import React from "react";

export default function Answer(props) {

    if (props.type === "RADIO" || props.type === "CHECKBOX") {
        return (
            <div className='answer'>
                <div className='answer-box'>
                    {props.type === "RADIO" ?
                        <Radio isChecked={false} labelClassName='answer-radio' readOnly/>
                        :
                        <Check isChecked={false} className='answer-check' readOnly/>
                    }
                    <Text placeholder='옵션' className='answer-text'/>
                    <img src='/images/cancel.svg' className='cancel' alt='cancel'/>
                </div>
                <button className='add-answer' onClick={props.addQuestion}>+ 옵션 추가</button>
            </div>
        )
    }

    const placeholder = props.type === "TEXT" ? "주관식 답안(단답)" : props.type === "TEXTAREA" ? "주관식 답안(장문)" : "링크";

    return (
        <Text className='question-text' placeholder={placeholder} readOnly/>
    )
}
