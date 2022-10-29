export default function Question(props) {
    return (
        <div className="application-item">
            <dt className="application-questions-question">{props.question}</dt>
            <dd className="application-questions-answer">{props.answer}</dd>
        </div>
    )
}
