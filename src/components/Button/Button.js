import "./Button.scss";

export default function Button({text, onClick, className, disabled = false}) {
    return (
        <>
            <button
                className={`button ${disabled ? "disabled" : ""} ${className}`}
                onClick={() => !disabled && onClick()}
            >
                <span>{text}</span>
            </button>
        </>
    )
}
