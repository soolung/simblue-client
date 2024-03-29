import './Question.scss';
import Answer from "../Answer/Answer";
import Toggle from '../../common/Toggle/Toggle';
import Text from '../../common/Text/Text';

const Question = ({
                    question,
                    handleQuestionChange,
                    index,
                    deleteQuestion,
                    addAnswer,
                    addNextAnswer,
                    handleAnswer,
                    deleteAnswer,
                    toggleIsRequired,
                    copyQuestion,
                  }) => {

  return (
    <div className='question'>
      <div className='question-header'>
        <input
          className='question-header-question'
          type='text'
          placeholder='질문'
          value={question?.question}
          name='question'
          onChange={(e) => handleQuestionChange(e, index)}
        />
        <select
          className='question-header-question-type'
          name='type'
          onChange={e => handleQuestionChange(e, index)}
          value={question?.type}
        >
          <option value='TEXT'>주관식 (단답)</option>
          <option value='TEXTAREA'>주관식 (장문)</option>
          <option value='LINK'>링크</option>
          <option value='RADIO'>객관식 질문</option>
          <option value='CHECKBOX'>체크 박스</option>
          <option value='APPROVAL'>담당 교사 승인</option>
        </select>
        <Text
          className='question-header-description'
          placeholder='설명'
          name="description"
          onChange={(e) => handleQuestionChange(e, index)}
        />
      </div>
      {/* 답안 */}
      <div className='QuestionDiv-answer'>
        <Answer
          type={question?.type}
          answers={question?.answerList}
          addAnswer={() => addAnswer(index)}
          addNextAnswer={addNextAnswer}
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
               onClick={() => copyQuestion(index)}
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
