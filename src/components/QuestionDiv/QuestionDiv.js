import './QuestionDiv.scss';
function QuestionDiv() {
    return (
        <div className='QuestionDiv-tit'>
            <div className='QuestionDiv-question'>
                <div className='QuestionDiv-top'>
                    <a className='question'><input type='text' placeholder='질문' /></a>
                    <div className='select'>
                        <select className='question-type'>
                            <option value='1'>주관식 질문</option>
                            <option value='2'>객관식 질문</option>
                            <option value='3'>체크 박스</option>
                        </select>
                        </div>
                </div>
                <div className='QuestionDiv-answer'>
                    <a className='question'><input type='text' placeholder='주관식 답안' /></a>
                </div>
                <div className='delete-div'>
                    <button className='delete-button'>
                        <img src='/images/delete.svg' />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default QuestionDiv;