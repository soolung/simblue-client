import "./Notice.scss"

export default function Notice({text, author, time, isPinned}) {
    return (
        <>
            <div className="notice">
                <p className="notice-text">{text}</p>
                <span className="notice-info">{author} 선생님 ∙ {time}</span>
                { isPinned ? <img src="/images/pin.svg" alt="pin" className="pin"/> : <></>}
            </div>
        </>
    )
}
