import "./Questions.scss";
import AnswerField from "./AnswerField";
import Question from "./Question";

export default function Questions({items, handleResponse}) {
    return (
        <dl className="application-questions">
            {
                items?.map((i, index) => (
                    <Question
                        question={i.question}
                        answer={
                            <AnswerField
                                q={i}
                                questionIndex={index}
                                handleResponse={handleResponse}
                            />
                        }
                        key={index}
                    />
                ))
            }
        </dl>
    )
}
