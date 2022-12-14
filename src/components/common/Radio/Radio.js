import './Radio.scss';

export default function Radio(props) {

    return (
        <label className={`radio-label ${props.labelClassName}`}>
            <input
                className={`radio ${props.className}`}
                type="radio"
                checked={props.isChecked}
                onChange={props.onChange}
                value={props.value}
                name={props.name}
                id={props.id}
                readOnly={props.readOnly}
            />
            <span>{props.label}</span>
        </label>
    )
}
