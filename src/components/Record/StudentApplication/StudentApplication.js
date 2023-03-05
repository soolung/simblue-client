export default function StudentApplication(props) {
  return (
    <>
      <div className="teacher-application" onClick={props.navigateManagement}>
        <div className="application-title">
          <span className="emoji application-title-icon">{props.emoji}</span>
          <span className="application-title-title">{props.title}</span>
        </div>
        <p className="application-comment">{props.description}</p>
        <p className="application-end-date">
          - {props.isAlways ? "상시" : props.endDate}
        </p>
      </div>
    </>
  );
}
