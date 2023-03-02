import "./Owner.scss";

export default function Owner({ name, onDelete }) {
  return (
    <div className="owner">
      <img
        alt="profile-image"
        src="/images/basic-profile-image.svg"
        className="profile-image"
      />
      <div className="teacher">
        <span>{name}</span>
        <span className="light">선생님</span>
      </div>
      <img
        alt="delete"
        src="/images/cancel.svg"
        className="delete"
        onClick={onDelete}
      />
    </div>
  )
}
