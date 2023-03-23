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
          <div className="banner-end-date">
            <p>{props.endDate.substr(0, 4)}년</p>
            <p>{props.endDate.substr(5, 2)}월</p>
            <p>{props.endDate.substr(8, 2)}일</p>
            {props.status === "DONE" ? <p>종료됨</p> : <p>종료 예정</p>}
          </div>
        </div>
        <div className="banner-card-text-bottom">
          {props?.linkTo?.length ? (
            <p>{props.linkTo}</p>
          ) : (
            <p>링크 이동 안 함</p>
          )}
          <div className="banner-card-pen">
            <HiPencil />
          </div>
        </div>
      </div>
    </div>
  );
}
