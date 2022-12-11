import React, {useState} from 'react';
import './Create.scss';
import Question from '../../components/Create/Question/Question';
import Text from "../../components/common/Text/Text";
import Date from "../../components/common/Date/Date";
import Check from "../../components/common/Check/Check";


const Create = () => {
    const [request, setRequest] = useState({
        emoji: "😎"
    })
    const [countList, setCountList] = useState([0])

    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
        setCountList(countArr)
    }

    const handleChange = e => {
        setRequest({
            ...request,
            [e.target.name]: e.target.value
        })
    }

    return (

        <section className='Create-section'>
            <div className='create-header'>
                <div className='create-header-top'>
                    <div className='create-header-left'>
                        <input className="create-header-left-emoji emoji" type="text" name={"emoji"}
                               value={request.emoji} onChange={handleChange}/>
                        <Text className='create-header-left-title' placeholder='제목'/>
                    </div>
                    <div className='create-header-right-date-wrapper'>
                        <div className='create-header-right-date'>
                            <div className='create-header-right-date-top'>
                                <span>기간</span>
                                <Date/>
                                <Check
                                    labelClassName='always-label'
                                    className='always-button'
                                    label='상시'
                                />
                            </div>
                            <div className='create-header-right-date-bottom'>
                                <span>~</span>
                                <Date/>
                            </div>
                        </div>
                    </div>
                    <Text className='create-header-description' placeholder='설명' name='description'
                          onChange={handleChange}/>

                </div>
                <div className='create-question-section'>
                    <div className='create-question-section-div-plus'>
                        <div><Question countList={countList}/></div>
                    </div>
                </div>
                <div className='question-plus'>
                    <button className='question-plus-button' onClick={onAddDetailDiv}>
                        <span>+ 질문 추가</span>
                    </button>
                </div>
            </div>
            <div className='createbutton'>
                <button>만들기</button>
            </div>
        </section>
    )
}

export default Create;
