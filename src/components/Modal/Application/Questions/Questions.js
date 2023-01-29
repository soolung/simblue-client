import "./Questions.scss";
import AnswerField from "./AnswerField";
import Question from "../Question/Question";

export default function Questions({ items, handleResponse }) {
  return (
    <dl className="application-questions">
      {items?.map((i, index) => (
        <Question // 이게 그 질문 텍스트
          question={i.question}
          isRequired={i.isRequired}
          description="테스트"
          answer={
            <AnswerField // 이게 input 들 선택해서 쓸수있는듯
              q={i}
              questionIndex={index}
              handleResponse={handleResponse}
            />
          }
          key={index}
        />
      ))}
    </dl>
  );
}
