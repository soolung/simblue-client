import "./BannerManage.scss";
import useModal from "../../hooks/useModal";
import BannerMaker from "../../components/Modal/BannerMaker/BannerMaker";
import BannerCard from "../../components/Banner/BannerCard/BannerCard";
import { getMyBanner } from "../../utils/api/banner";
import { useQuery } from "react-query";

export default function BannerManage() {
  const { data } = useQuery("getMyBanner", getMyBanner);
  const { openModal } = useModal();

  return (
    <section className="bannermanage">
      <div className="section-header">
        <p className="section-header-title">배너 관리</p>
        <p className="section-header-description">내가 올린 배너를 관리해요.</p>
      </div>
      <div>
        <p
          onClick={(e) => {
            e.preventDefault();
            openModal(<BannerMaker title="배너 등록" />);
          }}
        >
          + 배너 등록
        </p>
      </div>
      <div className="banner-manage-card">
        {data?.bannerList.map((b) => (
          <BannerCard
            endDate={b.endDate}
            imageUri={b.imageUri}
            linkTo={b.linkTo}
            status={b.status}
          />
        ))}
      </div>
    </section>
  );
}
