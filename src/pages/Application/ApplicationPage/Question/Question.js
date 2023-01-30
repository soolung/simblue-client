import "./Question.scss";

export default function Question(props) {
  console.log(props.q);
  return (
    <div className="application-item">
      <dt className="application-questions-question">
        {props.question}
        {props.isRequired && <span className="red"> *</span>}
      </dt>
      <dt className="application-questions-description">{props.description}</dt>
      <dd
        className={`application-questions-answer ${
          props.q.type === "CHECKBOX" || props.q.type === "RADIO"
            ? "application-questions-grid"
            : ""
        }`}
      >
        {props.answer}
      </dd>
    </div>
  );
}
