import Text from "../../../common/Text/Text";
import TextArea from "../../../common/TextArea/TextArea";
import Check from "../../../common/Check/Check";
import Radio from "../../../common/Radio/Radio";

export const createQuestionByType = q => {
    console.log(q)
    if (q.type === "TEXT") {
        return (
            <Text
                name={q.id}
            />
        )
    } else if (q.type === "RADIO") {
        return (
            <>
                {
                    q.applicationAnswers.map(a => (
                        <Radio
                            name={q.id}
                            label={a.answer}
                        />
                    ))
                }
            </>
        )
    } else if (q.type === "CHECKBOX") {
        return (
            <>
                {
                    q.applicationAnswers.map(a => (
                        <Check
                            name={q.id}
                            label={a.answer}
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
            />
        )
    }
}
