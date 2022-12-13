import "./Notice.scss"
import {dateKoreanFormatter} from "../../utils/etc/DateTimeFormatter";

export default function Notice({text, author, time, isPinned, pin, readOnly = true}) {
    return (
        <>
            <div className="notice">
                <p className="notice-text">{text}</p>
                <span className="notice-info">{author} 선생님 ∙ {dateKoreanFormatter(time)}</span>
                {readOnly ?
                    isPinned ? <img src="/images/pin.svg" alt="pin" className="pin"/> : <></>
                    :
                    <img src="/images/pin.svg"
                         alt="pin"
                         className={`pin edit ${isPinned ? "" : "not-pinned"}`}
                         onClick={pin}
                    />
                }
            </div>
        </>
    )
}
