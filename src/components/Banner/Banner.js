import './Banner.scss'
import {Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css/effect-fade";
import {Link} from "react-router-dom";

SwiperCore.use([Pagination, Autoplay, EffectFade])

function Banner(props){
    return(
        <div className='banner_tit'>
            <Swiper
                className='banner'
                loop={true}
                effect={"fade"}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{clickable: true}}
                autoplay={{delay: 2000}}
                watchOverflow={true}
            >
                {props.banner.map(b => (
                    <SwiperSlide>
                        <Link to ="">
                            <img className='banner--image' src={b.img} alt="banner"/>
                        </Link>
                    </SwiperSlide>
                ))
                }
            </Swiper>
        </div>
    )
}

export default Banner;