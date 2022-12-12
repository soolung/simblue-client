import Text from "../../../common/Text/Text";
import TextArea from "../../../common/TextArea/TextArea";
import Check from "../../../common/Check/Check";
import Radio from "../../../common/Radio/Radio";
import {useEffect, useState} from "react";

export default function AnswerField({q, questionIndex, handleResponse}) {
    const [value, setValue] = useState("");

    useEffect(() => {
        handleResponse(value, questionIndex)
    }, [value])

    if (q.type === "TEXT") {
        return (
            <Text
                name={q.id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        )
    } else if (q.type === "RADIO") {
        return (
            <>
                {
                    q.answerList.map((a, index) => (
                        <Radio
                            name={q.id}
                            label={a.answer}
                            key={index}
                        />
                    ))
                }
            </>
        )
    } else if (q.type === "CHECKBOX") {
        return (
            <>
                {
                    q.answerList.map((a, index) => (
                        <Check
                            name={q.id}
                            label={a.answer}
                            key={index}

                        />
                    ))
                }
            </>
        )
    } else if (q.type === "TEXTAREA") {
        return (
            <TextArea
                name={q.id}
                autoSizing={true}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        )
    }
}
