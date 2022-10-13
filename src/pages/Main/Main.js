import './Main.scss';
import BannerData from "./banner.json";
import Banner from "../../components/Banner/Banner";
import ListData from "./list.json";
import Application from "../../components/Application/Application";
import "swiper/scss";

export default function Main(){
    return(
        <section>
            <Banner
                banner={BannerData.banners}
            />
            <div className='latest-application-list'>
                    {
                        ListData.list.map(a => (
                                <Application
                                    id={a.id}
                                    icon={a.icon}
                                    title={a.title}
                                    message={a.message}
                                    start_period={a.start_period}
                                    endDate={a.endDate}
                                />
                        ))
                    }
            </div>
        </section>
    )
}
