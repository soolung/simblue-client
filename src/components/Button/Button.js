import "./Button.scss";

export default function Button({text, action, className}) {
    return (
        <>
            <button
                className={`button ${className}`}
                onClick={action}
            >
                <span>{text}</span>
            </button>
        </>
    )
}
