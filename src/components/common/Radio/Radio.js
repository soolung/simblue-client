import './Radio.scss';

export default function Radio(props) {

    return (
        <label className={`radio-label ${props.labelClassName ? props.labelClassName : ''}`}>
            <input
                className={`radio ${props.className ? props.className : ''}`}
                type="radio"
                checked={props.isChecked}
                onChange={props.onChange}
                value={props.value}
                name={props.name}
                id={props.id}
                readOnly={props.readOnly}
                tabIndex={props.readOnly ? -1 : 0}
            />
            <span>{props.label}</span>
        </label>
    )
}
