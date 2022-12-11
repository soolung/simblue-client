import React, { useState } from 'react';
import './Create.scss';
import Question from '../../components/Create/Question/Question';


const Create = () => {
    const [countList, setCountList] = useState([0])

    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
        setCountList(countArr)
    }

    return (

        <section className='Create-section'>
            <div className='create-tit'>
                <div className='create-top'>
                    <div className='create-top-title-img'>
                        <button>
                            이모지
                        </button>
                        <a className='create-top-title-input'><input type="text" placeholder='제목 입력' /></a>
                    </div>
                    <div className='create-top-title-time'>
                        <div className='create-time-end-time-gigan'>
                            <div className='create-time-start-time'>
                                <span className='time-span'>기간</span>
                                <span>
                                    <a><input type="text" className='year' placeholder='년(4자)' /></a>
                                    <a>
                                        <select className='month'>
                                            <option value="0">월</option>
                                        </select>
                                    </a>
                                    <a><input type="text" className='day' placeholder='일' /></a>
                                </span>
                            </div>
                            <div className='create-time-end-time'>
                                <span className='time-span'>~</span>
                                <span>
                                    <a><input type="text" className='year' placeholder='년(4자)' /></a>
                                    <a>
                                        <select className='month'>
                                            <option value="0">월</option>
                                        </select>
                                    </a>
                                    <a><input type="text" className='day' placeholder='일' /></a>
                                </span>
                            </div>
                            <div className='sangsi-button'>
                                <input type="checkbox" /><span>상시</span>
                            </div>
                        </div>
                    </div>
                    <a className='small-title'><input type="text" placeholder='소제목 입력' /></a>

                </div>
                <div className='create-question-section' >
                    <div className='create-question-section-div-plus'>
                        <div><Question countList={countList} /></div>
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
