import "./Answer.scss"
import Text from "../../common/Text/Text";
import React from "react";
import Radio from "../../common/Radio/Radio";
import Check from "../../common/Check/Check";

export default function Answer({type, answers, addAnswer, handleAnswer, deleteAnswer, questionIndex}) {

    if (type === "RADIO" || type === "CHECKBOX") {
        return (
            <div className='answer'>
                <div className='answer-box'>
                    {answers?.map((a, index) => (
                        <div className='answer-box-answer'>
                            {
                                type === "RADIO" ?
                                    <Radio isChecked={false} labelClassName='answer-radio' readOnly/>
                                    :
                                    <Check isChecked={false} className='answer-check' readOnly/>
                            }
                            <Text
                                placeholder='옵션'
                                className='answer-text'
                                value={a.answer}
                                onChange={(e) =>
                                    handleAnswer(e.target.value, questionIndex, index)}
                            />
                            <img src='/images/cancel.svg' className='cancel' alt='cancel' onClick={() => deleteAnswer(index, questionIndex)}/>

                        </div>
                    ))}
                < /div>
                <button className='add-answer' onClick={addAnswer}>+ 옵션 추가</button>
            </div>
        )
    }

    const placeholder = type === "TEXT" ? "주관식 답안(단답)" : type === "TEXTAREA" ? "주관식 답안(장문)" : "링크";

    return (
        <Text className='question-text' placeholder={placeholder} readOnly/>
    )
}
