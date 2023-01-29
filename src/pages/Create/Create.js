import React, { useState } from 'react';
import './Create.scss';
import Question from '../../components/Create/Question/Question';
import Text from "../../components/common/Text/Text";
import Date from "../../components/common/Date/Date";
import Check from "../../components/common/Check/Check";
import Button from "../../components/Button/Button";
import { useMutation } from "react-query";
import { createApplication } from "../../utils/api/application";
import { useNavigate } from "react-router-dom";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";


const Create = () => {
  const navigate = useNavigate()
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false)
  const { mutate } = useMutation(createApplication, {
    onSuccess: () => {
      navigate('/')
    }
  })

  const [request, setRequest] = useState({
    emoji: "😎",
    isAlways: false,
    title: '',
    description: '',

  })
  const [questionList, setQuestionList] = useState([{
    type: "TEXT",
    question: "",
    answerList: [{
      answer: "",
    }],
    isRequired: true,
    description: "",
  }])

  const handleChange = e => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value
    })
  }

  const emojiChange = e => {
    setRequest({
      ...request,
      emoji: e.emoji
    })

    setEmojiPickerIsOpen(false)
  }

  const handleQuestionChange = (e, index) => {
    setQuestionList(
      [...questionList],
      questionList[index][e.target.name] = e.target.value
    )
    console.log(questionList)
  }

  const toggleIsRequired = (index) => {
    setQuestionList(
      [...questionList],
      questionList[index].isRequired = !questionList[index].isRequired
    )
  }

  const addAnswer = (index) => {
    setQuestionList(
      [...questionList],
      questionList[index].answerList =
        [...questionList[index].answerList, {
          answer: ""
        }],
    )
  }

  const handleAnswer = (a, questionIndex, answerIndex) => {
    setQuestionList(
      [...questionList],
      questionList[questionIndex].answerList[answerIndex].answer = a
    )
  }

  const addQuestion = () => {
    setQuestionList(
      [...questionList,
        {
          type: "TEXT",
          question: "",
          answerList: [{
            answer: "",
          }],
          isRequired: true,
          description: "",
        }
      ],
    )
  }

  const deleteAnswer = (target, questionIndex) => {
    setQuestionList([
        ...questionList],
      questionList[questionIndex].answerList =
        questionList[questionIndex].answerList.filter(
          (a, index) => target !== index)
    );
  }

  const deleteQuestion = target => {
    setQuestionList(questionList.filter((q, index) => target !== index));
  }

  return (

    <section className='create-section'>
      <div className='create-header'>
        <div className='create-header-top'>
          <div className='create-header-left'>
            <div className="create-header-left-emoji">
              <input
                className="create-header-left-emoji-input emoji"
                type="text"
                name="emoji"
                value={request?.emoji}
                onClick={() => setEmojiPickerIsOpen(true)}
                readOnly={true}
              />
              {emojiPickerIsOpen ?
                <EmojiPicker
                  onEmojiClick={emojiChange}
                  emojiStyle={EmojiStyle.NATIVE}
                  width="30vw"
                />
                :
                <></>
              }
            </div>
            <Text
              className='create-header-left-title'
              placeholder='제목'
              name="title"
              value={request?.title}
              onChange={handleChange}
            />
          </div>
          <div className='create-header-right-date-wrapper'>
            <div className='create-header-right-date'>
              <div className='create-header-right-date-top'>
                <span>기간</span>
                <Date
                  isAlways={request?.isAlways}
                  handleDate={(d) => setRequest({ ...request, startDate: d })}
                />
                <Check
                  labelClassName='always-label'
                  className='always-button'
                  label='상시'
                  isChecked={request?.isAlways}
                  onChange={() => setRequest({ ...request, isAlways: !request?.isAlways })}
                />
              </div>
              <div className='create-header-right-date-bottom'>
                <span>~</span>
                <Date
                  isAlways={request?.isAlways}
                  handleDate={(d) => setRequest({ ...request, endDate: d })}
                />
              </div>
            </div>
          </div>
        </div>
        <Text
          className='create-header-description'
          placeholder='설명'
          name='description'
          onChange={handleChange}
          value={request?.description}
        />
      </div>
      <div className='create-question-section'>
        {questionList?.map((q, index) => (
          <Question
            question={q}
            handleQuestionChange={handleQuestionChange}
            deleteQuestion={deleteQuestion}
            key={index}
            index={index}
            addAnswer={addAnswer}
            handleAnswer={handleAnswer}
            deleteAnswer={deleteAnswer}
            toggleIsRequired={toggleIsRequired}
          />
        ))
        }
        <button className='add-question-button' onClick={addQuestion}>
          <span>+</span>
        </button>
      </div>
      <Button
        className="create-button"
        text="만들기"
        action={() => mutate({
          request: {
            ...request,
            questionList: [...questionList]
          }
        })}
      />
    </section>
  )
}

export default Create;
