import './Radio.scss';

export default function Radio(props) {

    return (
        <div className="radio-wrapper">
            <input
                className={`radio ${props.className}`}
                type="radio"
                checked={props.isChecked}
                onChange={props.onChange}
                value={props.value}
                name={props.name}
                id={props.id}
            />
            <span>{props.label}</span>
        </div>
    )
}
