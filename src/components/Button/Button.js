import "./Button.scss";

export default function Button({text, action, className, disabled = false}) {
    return (
        <>
            <button
                className={`button ${disabled ? "disabled" : ""} ${className}`}
                onClick={() => !disabled && action()}
            >
                <span>{text}</span>
            </button>
        </>
    )
}
