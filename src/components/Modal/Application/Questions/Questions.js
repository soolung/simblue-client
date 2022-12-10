import "./Questions.scss";
import {createQuestionByType} from "./questionUtil";
import Question from "./Question";

export default function Questions({items}) {
    return (
        <dl className="application-questions">
            {
                items?.map(i => (
                    <Question
                        question={i.question}
                        answer={createQuestionByType(i)}
                    />
                ))
            }
        </dl>
    )
}
