import React, {useState} from 'react';
import './Question.scss';
import Answer from "../Answer/Answer";

const Question = (props) => {

    const [countList, setCountList] = useState([0])

    const onPlusDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
        setCountList(countArr)
    }

    const [selected, setSelected] = useState("TEXT");

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    console.log(countList);
    return (
        <div className='question-div-one-pad'>
            {props.countList && props.countList.map((item, i) => (
                <div className='al'>
                    <div className='QuestionDiv-tit' key={i}>
                        <div className='question-header'>
                            <input className='question-header-question' type='text' placeholder='질문'/>
                            <select className='question-header-question-type' onChange={handleSelect} value={selected}>
                                <option value='TEXT'>주관식 (단답)</option>
                                <option value='TEXTAREA'>주관식 (장문)</option>
                                <option value='LINK'>링크</option>
                                <option value='RADIO'>객관식 질문</option>
                                <option value='CHECKBOX'>체크 박스</option>
                            </select>
                        </div>
                        {/* 답안 */}
                        <div className='QuestionDiv-answer'>
                            <Answer
                                type={selected}
                            />
                        </div>
                        <div className='delete-question'>
                            <img alt='delete' src='/images/delete.svg'/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default Question;
