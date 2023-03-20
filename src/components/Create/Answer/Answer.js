import "./Answer.scss";
import Text from "../../common/Text/Text";
import React, { useEffect, useRef, useState } from "react";
import Radio from "../../common/Radio/Radio";
import Check from "../../common/Check/Check";

export default function Answer({
  type,
  answers,
  addAnswer,
  addNextAnswer,
  handleAnswer,
  deleteAnswer,
  questionIndex,
}) {
  const answerRefs = useRef([]);

  const [focusIndex, setFocusIndex] = useState(0);
  useEffect(() => {
    if ((answerRefs && type === "RADIO") || type === "CHECKBOX") {
      answerRefs.current[focusIndex]?.focus();
    }
  }, [focusIndex]);

  if (type === "RADIO" || type === "CHECKBOX") {
    return (
      <div className="answer">
        <div className="answer-box">
          {answers?.map((a, index) => (
            <div className="answer-box-answer" key={index}>
              {type === "RADIO" ? (
                <Radio
                  isChecked={false}
                  labelClassName="answer-radio"
                  readOnly
                />
              ) : (
                <Check isChecked={false} className="answer-check" readOnly />
              )}
              <Text
                ref={el => (answerRefs.current[index] = el)}
                placeholder="옵션"
                className="answer-text"
                value={a.answer}
                onChange={e =>
                  handleAnswer(e.target.value, questionIndex, index)
                }
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    addNextAnswer(index, questionIndex);
                    setFocusIndex(index + 1);
                  } else if (
                    e.key === "Backspace" &&
                    a.answer.length === 0 &&
                    index > 0
                  ) {
                    deleteAnswer(index, questionIndex);
                    setFocusIndex(index - 1);
                  } else if (e.key === "ArrowDown" && index < answers.length) {
                    e.preventDefault();
                    setFocusIndex(index + 1);
                  } else if (e.key === "ArrowUp" && index > 0) {
                    e.preventDefault();
                    setFocusIndex(index - 1);
                  }
                }}
              />
              <img
                src="/images/cancel.svg"
                className="cancel"
                alt="cancel"
                onClick={() => deleteAnswer(index, questionIndex)}
              />
            </div>
          ))}
        </div>
        <button className="add-answer" onClick={addAnswer}>
          + 옵션 추가
        </button>
      </div>
    );
  }

  const placeholder =
    type === "TEXT"
      ? "주관식 답안(단답)"
      : type === "TEXTAREA"
      ? "주관식 답안(장문)"
      : "링크";

  return <Text className="question-text" placeholder={placeholder} readOnly />;
}
