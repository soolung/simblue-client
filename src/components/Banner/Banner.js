import "./Banner.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { HiPencil } from "react-icons/hi";
import { getBanner } from "../../utils/api/banner";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../../utils/atom/user";

SwiperCore.use([Pagination, Autoplay, EffectFade]);

function Banner(props) {
  const { data } = useQuery("getBanner", getBanner);
  const user = useRecoilValue(userState);

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
        {data?.bannerList?.map((b, index) => (
          <SwiperSlide key={index}>
            {b.linkTo ? (
              <Link to={b?.linkTo}>
                <img className="banner--image" src={b.imageUri} alt="banner" />
              </Link>
            ) : (
              <img className="banner--image" src={b.imageUri} alt="banner" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>{" "}
      <div className="banner-register-button-div">
        {user?.authority === "ROLE_TEACHER" ? (
          <Link to="/bannermanage">
            <div className="banner-register-button">
              <HiPencil />
            </div>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Banner;
