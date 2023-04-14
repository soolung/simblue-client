import "./GroupCard.scss";
export default function GroupCard(props) {
  const types = {
    YEAR: "👥",
    MAJOR: "🧑🏻‍💻",
    CLASS: "👩🏻‍🏫",
    ETC: "🎸",
  };
  return (
    <div className="group-card">
      <div className="group-card-card">
        <div className="group-card-top">
          <span className="emoji">{types[props.type]}</span>
          <p className="group-card-name">{props.name}</p>
        </div>
        <div className="group-card-bottom">
          <p className="group-card-num">{props.numberOfMember}명</p>
        </div>
      </div>
    </div>
  );
}
