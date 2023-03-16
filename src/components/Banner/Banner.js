import "./Banner.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import useModal from "../../hooks/useModal";
import BannerMaker from "../Modal/BannerMaker/BannerMaker";
SwiperCore.use([Pagination, Autoplay, EffectFade]);

function Banner(props) {
  const { openModal } = useModal();

  return (
    <div className="banner_tit">
      <Swiper
        className="banner"
        loop={true}
        effect={"fade"}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          type: "none",
        }}
        autoplay={{ delay: 5000 }}
        watchOverflow={true}
      >
        {props.banner.map((b, index) => (
          <SwiperSlide key={index}>
            <Link to="">
              <img className="banner--image" src={b.img} alt="banner" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="banner-maker-button">
        <FaPen
          onClick={(e) => {
            e.preventDefault();
            openModal(<BannerMaker title="배너 등록" />);
          }}
        />
      </div>
    </div>
  );
}

export default Banner;
