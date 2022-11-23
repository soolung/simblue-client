import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji';
import './Create.scss';
import QuestionDiv from '../../components/QuestionDiv/QuestionDiv';
function Create() {
    const [text, setText] = useState('');

    function handleOnEnter(text) {
        console.log('enter', text);
    }

    return (

        <section className='Create-section'>
            <div className='create-tit'>
                <div className='create-top'>
                    <div className='create-top-title-img'>
                        <button>
                            <InputEmoji
                                cleanOnEnter
                                onEnter={handleOnEnter}
                                maxlength={1}
                            />
                        </button>
                        <a className='create-top-title-input'><input className='create-title-input' type={text} placeholder='제목 입력' /></a>
                    </div>
                    <div className='create-top-title-time'>
                        <div className='create-time-end-time-gigan'>
                            <div className='create-time-start-time'>
                                <span className='time-span'>기간</span>
                                <span>
                                    <a><input type={text} className='year' placeholder='년(4자)' /></a>
                                    <a>
                                        <select className='month'>
                                            <option value="0">월</option>
                                        </select>
                                    </a>
                                    <a><input type={text} className='day' placeholder='일' /></a>
                                </span>
                            </div>
                            <div className='create-time-end-time'>
                                <span className='time-span'>~</span>
                                <span>
                                    <a><input type={text} className='year' placeholder='년(4자)' /></a>
                                    <a>
                                        <select className='month'>
                                            <option value="0">월</option>
                                        </select>
                                    </a>
                                    <a><input type={text} className='day' placeholder='일' /></a>
                                </span>
                            </div>
                            <div className='sangsi-button'>
                                <input type="checkbox" /><span>상시</span>
                            </div>
                        </div>
                    </div>
                    <div className='small-title-tit'>
                        <a className='small-title'><input type={text} placeholder='소제목 입력' /></a>
                    </div>
                </div>
                <div className='create-question-section'>
                    <QuestionDiv/>
                </div>
            </div>
        </section>
    )
}
export default Create;