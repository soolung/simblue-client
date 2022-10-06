import './Main.scss';
import BannerData from "./banner.json";
import Banner from "../../components/Banner/Banner";
import ListData from "./list.json";
import Applist from "../../components/Applist/Applist";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, {Navigation} from 'swiper';
import "swiper/scss";
SwiperCore.use([Navigation]);

export default function Main(){
    return(
        <section>
            <Banner
                banner={BannerData.banners}
            />
            <div className='applist-swiperslide'>
                <Swiper
                spaceBetween={0}
                slidesPerView={4}
                navigation
                loop={true}
                >
                    {
                        ListData.list.map(li => (
                            <SwiperSlide className='swiper-slide-t'>
                                <Applist
                                    id={li.id}
                                    icon={li.icon}
                                    title={li.title}
                                    message={li.message}
                                    start_period={li.start_period}
                                    end_period={li.end_period}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}