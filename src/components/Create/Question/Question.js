import './Question.scss';
import Answer from "../Answer/Answer";

const Question = ({question, setQuestion, setType, index, deleteQuestion}) => {


    return (
        <div className='question-div-one-pad'>
            <div className='al'>
                <div className='QuestionDiv-tit'>
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
                        />
                    </div>
                    <div className='delete-question'
                        onClick={() => deleteQuestion(index)}
                    >
                        <img alt='delete' src='/images/delete.svg'/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Question;
