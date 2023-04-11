import "./BannerManagement.scss";
import useModal from "../../hooks/useModal";
import ManageBannerModal from "../../components/Modal/ManageBannerModal/ManageBannerModal";
import BannerCard from "../../components/Banner/BannerCard/BannerCard";
import { getMyBanner } from "../../utils/api/banner";
import { useQuery } from "react-query";

export default function BannerManagement() {
  const { data } = useQuery("getMyBanner", getMyBanner);
  const { openModal } = useModal();

  return (
    <section className="bannermanage">
      <div className="section-header">
        <p className="section-header-title">배너 관리</p>
        <p className="section-header-description">내가 올린 배너를 관리해요.</p>
      </div>
      <div className="banner-mange-create">
        <button
          onClick={(e) => {
            openModal(<ManageBannerModal mode="register" />);
          }}
        >
          + 배너 등록
        </button>
      </div>
      <div className="banner-manage-card">
        {data?.bannerList.map((b) => (
          <BannerCard
            endDate={b.endDate}
            imageUri={b.imageUri}
            linkTo={b.linkTo}
            status={b.status}
            id={b.id}
          />
        ))}
      </div>
    </section>
  );
}
