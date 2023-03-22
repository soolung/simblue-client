import "./Banner.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
SwiperCore.use([Pagination, Autoplay, EffectFade]);

function Banner(props) {
    console.log(props)
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
        {props?.banner?.map((b, index) => (
          <SwiperSlide key={index}>
            <Link to={props.linkTo}>
              <img className="banner--image" src={b.imageUri} alt="banner" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Link to="/bannermanage">
        <div className="banner-maker-button">
          <FaPen />
        </div>
      </Link>
    </div>
  );
}

export default Banner;
