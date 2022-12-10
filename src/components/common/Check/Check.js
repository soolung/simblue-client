import './Check.scss';

export default function Check(props) {

    return (
        <label className="check-label">
            <input
                className={`check ${props.className}`}
                type="checkbox"
                checked={props.isChecked}
                onChange={props.onChange}
                value={props.value}
      z          name={props.name}
                id={props.id}
            />
            <span>{props.label}</span>
        </label>
    )
}
