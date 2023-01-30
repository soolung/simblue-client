import Text from "../../../../components/common/Text/Text";
import TextArea from "../../../../components/common/TextArea/TextArea";
import Check from "../../../../components/common/Check/Check";
import Radio from "../../../../components/common/Radio/Radio";
import { useEffect, useState } from "react";

export default function AnswerField({ q, questionIndex, handleResponse }) {
  const [value, setValue] = useState([""]);
  const [check, setCheck] = useState(new Set());

  const handleCheck = (answer) => {
    if (check.has(answer)) {
      check.delete(answer);
    } else {
      check.add(answer);
    }

    handleHandleResponse();
    setCheck(check);
  };

  const handleHandleResponse = () => {
    if (q.type === "CHECKBOX") {
      handleResponse(check, questionIndex);
    } else {
      handleResponse(value, questionIndex);
    }
  };

  useEffect(() => {
    handleHandleResponse();
  }, [value]);

  if (q.type === "TEXT" || q.type === "LINK") {
    return (
      <Text
        name={q.id}
        value={value[0]}
        onChange={(e) => setValue([e.target.value])}
      />
    );
  } else if (q.type === "RADIO") {
    return (
      <>
        {q.answerList?.map((a, index) => (
          <Radio
            name={q.id}
            label={a.answer}
            key={index}
            value={a.answer}
            isChecked={value[0] === a.answer}
            onChange={(e) => setValue([e.target.value])}
          />
        ))}
      </>
    );
  } else if (q.type === "CHECKBOX") {
    return (
      <>
        {q.answerList?.map((a, index) => (
          <Check
            name={q.id}
            label={a.answer}
            key={index}
            value={a.answer}
            isChecked={check.has(a.answer)}
            onChange={() => handleCheck(a.answer)}
          />
        ))}
      </>
    );
  } else if (q.type === "TEXTAREA") {
    return (
      <TextArea
        name={q.id}
        autoSizing={true}
        value={value[0]}
        onChange={(e) => setValue([e.target.value])}
      />
    );
  }
}
