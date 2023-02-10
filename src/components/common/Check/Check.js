import './Check.scss';

export default function Check(props) {

    return (
        <label className={`check-label ${props.labelClassName ? props.labelClassName : ''}`}>
            <input
                className={`check ${props.className ? props.className : ''}`}
                type="checkbox"
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
