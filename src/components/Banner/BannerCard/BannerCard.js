import "./BannerCard.scss";
import { HiPencil } from "react-icons/hi";
import useModal from '../../../hooks/useModal';
import ManageBannerModal from '../../Modal/ManageBannerModal/ManageBannerModal';

export default function BannerCard({ id, status, imageUri, endDate, linkTo }) {
  const { openModal } = useModal();

  return (
    <div className="banner-card">
      <div className="banner-card-card">
        <div className="banner-card-image">
          <img src={imageUri} alt="배너 미리보기" />
        </div>
        <div className="banner-card-text">
          <div className="banner-card-text-top">
            {status === "DONE" ? (
              <p className="close-icon">마감</p>
            ) : (
              <p className="progress-icon">진행 중</p>
            )}
            <div className="banner-end-date">
              <p>{endDate.substr(0, 4)}년</p>
              <p>{endDate.substr(5, 2)}월</p>
              <p>{endDate.substr(8, 2)}일</p>
              {status === "DONE" ? <p>종료됨</p> : <p>종료 예정</p>}
            </div>
          </div>
          <div className="banner-card-text-bottom">
            {linkTo?.length ? (
              <p>{linkTo}</p>
            ) : (
              <p>링크 이동 안 함</p>
            )}
            <button
              className="banner-card-pen"
              onClick={() => openModal(
                <ManageBannerModal
                  mode="update"
                  data={{
                    id: id,
                    status: status,
                    imageUri: imageUri,
                    endDate: endDate,
                    linkTo: linkTo
                  }}
                />
              )}
            >
              <HiPencil />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
