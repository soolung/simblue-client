export default function Question(props) {
  return (
    <div className="application-item">
      <dt className="application-questions-question">
        {props.question}
        { props.isRequired &&
          <span className="red"> *</span>
        }
      </dt>
      <dd className="application-questions-answer">{props.answer}</dd>
    </div>
  )
}
