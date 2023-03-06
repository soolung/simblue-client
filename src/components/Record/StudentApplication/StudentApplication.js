export default function StudentApplication(props) {
  return (
    <>
      <div>
        <div>
          <p>
            <p>
              <a>{props.emoji}</a>
              <a>{props.title}</a>
            </p>
            <p>
                {props.repliedAt} 에 신청함
            </p>
          </p>
          <p></p>
        </div>
      </div>
    </>
  );
}

