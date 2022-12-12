import "./TextArea.scss";
import {useCallback, useRef} from "react";

export default function TextArea(props) {
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
        if (textRef.current.scrollHeight > 70) {
            textRef.current.style.height = textRef.current.scrollHeight + "px";
        }
    }, []);

    return (
        <textarea
            className={`textarea ${props.className}`}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            id={props.id}
            ref={textRef}
            onInput={props.autoSizing ? handleResizeHeight : undefined}
        />
    )
}
