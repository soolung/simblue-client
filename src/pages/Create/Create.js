import React, {useEffect, useState} from 'react';
import './Create.scss';
import Question from '../../components/Create/Question/Question';
import Text from "../../components/common/Text/Text";
import Date from "../../components/common/Date/Date";
import Check from "../../components/common/Check/Check";


const Create = () => {
    const [request, setRequest] = useState({
        emoji: "😎",
    })
    const [applicationQuestions, setApplicationQuestions] = useState([{
        type: "TEXT",
        question: "",
        applicationAnswers: [{
            answer: "",
        }],
    }])

    const handleChange = e => {
        setRequest({
            ...request,
            [e.target.name]: e.target.value
        })
    }

    const handleQuestion = (q, index) => {
        setApplicationQuestions(
            [...applicationQuestions],
            applicationQuestions[index].question = q
        )
    }

    const handleType = (t, index) => {
        setApplicationQuestions(
            [...applicationQuestions],
            applicationQuestions[index].type = t
        )
    }

    const addQuestion = () => {
        setApplicationQuestions(
            [...applicationQuestions,
                {
                    type: "TEXT",
                    question: "",
                    applicationAnswers: [{
                        answer: "",
                    }],
                }
            ],
        )
    }

    const handleAnswer = (a, index) => {

    }

    const addAnswer = (index) => {

    }

    const deleteQuestion = target => {
        setApplicationQuestions(applicationQuestions.filter((q, index) => target !== index));
    }

    useEffect(() => {
        console.log(applicationQuestions)
    }, [applicationQuestions])

    return (

        <section className='create-section'>
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
                    {applicationQuestions?.map((q, index) => (
                        <Question
                            question={q}
                            setQuestion={handleQuestion}
                            setType={handleType}
                            deleteQuestion={deleteQuestion}
                            key={index}
                            index={index}
                        />
                    ))
                    }
                </div>
                <button className='add-question-button' onClick={addQuestion}>
                    <span>+ 질문 추가</span>
                </button>
            </div>
            <div className='create-button'>
                <button onClick={() => {
                }}>만들기
                </button>
            </div>
        </section>
    )
}

export default Create;
