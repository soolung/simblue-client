import './Check.scss';

export default function Check(props) {

    return (
        <div className="check-wrapper">
            <input
                className={`check ${props.className}`}
                type="checkbox"
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
