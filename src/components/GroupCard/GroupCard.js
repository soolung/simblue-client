import "./GroupCard.scss";
export default function GroupCard(props) {
  console.log(props);
  return (
    <div className="group-card">

      <div className="group-card-card">
        <div className="group-card-top">
          {props.type === "YEAR" ? (
            <p className="group-icon">👥</p>
          ) : props.type === "MAJOR" ? (
            <p className="group-icon">🧑🏻‍💻</p>
          ) : props.type === "CLASS" ? (
            <p className="group-icon">👩🏻‍🏫</p>
          ) : (
            <p className="group-icon">🎸</p>
          )}

          <p className="group-card-name">{props.name}</p>
        </div>
        <div className="group-card-bottom">
          <p className="group-card-num">{props.numberOfMember}명</p>
        </div>
      </div>
    </div>
  );
}
