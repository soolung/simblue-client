import React, { useState } from 'react';
import './QuestionDiv.scss';
const QuestionDiv = (props) => {

    const [countList, setCountList] = useState([0])

    const onPlusDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
    }

    const [selected, setSelected] = useState("");

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    console.log(countList);
    return (
        <div className='question-div-one-pad'>
            {props.countList && props.countList.map((item, i) => (
                <div className='al'>
                    <div className='QuestionDiv-tit' key={i}>
                        <div className='QuestionDiv-question'>
                            <div className='QuestionDiv-top'>
                                <a className='question'><input type='text' placeholder='질문' /></a>
                                <a className='select'>
                                    <select className='question-type' onChange={handleSelect} value={selected}>
                                        <option value='0'>질문 선택</option>
                                        <option value='TEXT'>주관식 (단답)</option>
                                        <option value='TEXTAREA'>주관식 (장문)</option>
                                        <option value='LINK'>링크</option>
                                        <option value='RADIO'>객관식 질문</option>
                                        <option value='CHECKBOX'>체크 박스</option>
                                    </select>
                                </a>
                            </div>
                            {/* 답안 */}
                            <div className='QuestionDiv-answer'>
                                {
                                    selected === "TEXT" ?
                                        <div className='question-text'>
                                            <input type='text' placeholder='주관식 답안' />
                                        </div>
                                        : (
                                            selected === "TEXTAREA" ?
                                                <div className='question-textarea'>
                                                    <span><textarea placeholder='주관식 답안' /></span>
                                                </div>
                                                :
                                                (
                                                    selected === "LINK" ?
                                                        <div className='question-link'>
                                                            <input type='text' placeholder='링크 입력' />
                                                        </div>
                                                        : (
                                                            selected === "RADIO" ?
                                                                <div className='question-radio'>
                                                                    <div countList={countList}><span><input type='radio' className='radio' /> <input type='text' placeholder='객관식 질문 입력' className='answertext' /></span></div>
                                                                    <span><button onClick={onPlusDetailDiv}>+ 질문 추가</button></span>
                                                                </div>
                                                                :
                                                                (
                                                                    selected === "CHECKBOX" ?

                                                                        <div className='question-check'>
                                                                            <div countList={countList}><span><input type='checkbox' className='check' /> <input type='text' placeholder='체크박스 질문 입력' /></span></div>
                                                                            <span><button onClick={onPlusDetailDiv}>+ 질문 추가</button></span>
                                                                        </div>
                                                                        :
                                                                        <></>
                                                                )
                                                        )
                                                )
                                        )
                                }
                            </div>
                            <div className='delete-div'>
                                <button className='delete-button'>
                                    <img src='/images/delete.svg' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default QuestionDiv;