import "./BannerCard.scss";
import { HiPencil } from "react-icons/hi";
export default function BannerCard(props) {
  return (
    <div className="banner-card">
      <div className="banner-card-image">
        <img src={props.imageUri} />
      </div>
      <div className="banner-card-text">
        <div className="banner-card-text-top">
          {props.stauts === "DONE" ? (
            <p className="close-icon">마감</p>
          ) : (
            <p className="progress-icon">진행 중</p>
          )}
          <p className="banner-end-date">
            <a>{props.endDate.substr(0, 4)}년</a>
            <a>{props.endDate.substr(5, 2)}월</a>
            <a>{props.endDate.substr(8, 2)}일</a>
            {props.status === "DONE" ? <a>종료됨</a> : <a>종료 예정</a>}
          </p>
        </div>
        <div className="banner-card-text-bottom">
          {props?.linkTo?.length > 0 ? (
            <p>{props.linkTo}</p>
          ) : (
            <p>링크 이동 안 함</p>
          )}
          <p className="banner-card-pen">
            <HiPencil />
          </p>
        </div>
      </div>
    </div>
  );
}
