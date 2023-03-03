import "./ApplicationBoard.scss";
import { HiPencil } from "react-icons/hi";
export default function ApplicationBoard(props) {
  return (
    <>
      <div className="AppBoard">
        <div className="AppBoard-com">
          <div className="AppBoard-top">
            <p>{props.emoji}</p>
            <p>{props.title}</p>
          </div>
          <div className="AppBoard-bottom">
            <p>
              <p>
                
              </p>
              <p>{props.replyId}개의 신청</p>
            </p>
            <p>
              <HiPencil />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
