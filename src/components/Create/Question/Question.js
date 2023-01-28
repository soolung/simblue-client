import './Question.scss';
import Answer from "../Answer/Answer";
import Toggle from '../../common/Toggle/Toggle';

const Question = ({
                    question,
                    setQuestion,
                    setType,
                    index,
                    deleteQuestion,
                    addAnswer,
                    handleAnswer,
                    deleteAnswer,
                    toggleIsRequired
                  }) => {

  return (
    <div className='question'>
      <div className='question-header'>
        <input
          className='question-header-question'
          type='text'
          placeholder='질문'
          value={question?.question}
          onChange={(e) => setQuestion(e.target.value, index)}
        />
        <select
          className='question-header-question-type'
          onChange={e => setType(e.target.value, index)}
          value={question?.type}
        >
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
          type={question?.type}
          answers={question?.answerList}
          addAnswer={() => addAnswer(index)}
          handleAnswer={handleAnswer}
          deleteAnswer={deleteAnswer}
          questionIndex={index}
        />
      </div>
      {/* 설정 */}
      <div className='question-footer'>
        <Toggle
          value={question?.isRequired}
          onClick={() => toggleIsRequired(index)}
          label={'필수'}
        />
        <div className='action-question-container'>
          <img className='action-question'
               alt='copy'
               src='/images/copy.svg'
            // onClick={}
          />
          <img className='action-question'
               alt='delete'
               src='/images/delete.svg'
               onClick={() => deleteQuestion(index)}
          />
        </div>
      </div>
    </div>
  )
}


export default Question;
