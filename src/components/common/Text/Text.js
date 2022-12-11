import "./Text.scss";

export default function Text(props) {
    return (
        <input
            className={`text ${props.className}`}
            type="text"
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            id={props.id}
            placeholder={props.placeholder}
            readOnly={props.readOnly}
        />
    )
}
