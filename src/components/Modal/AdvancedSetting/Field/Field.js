import "./Field.scss";

export default function Field({name, setting}) {
  return (
    <div className="field">
      <dt className="name">
        {name}
      </dt>
      <dd className="setting">{setting}</dd>
    </div>
  )
}
