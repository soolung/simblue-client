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
                                    emoji={a.emoji}
                                    title={a.title}
                                    description={a.description}
                                    startDate={a.startDate}
                                    endDate={a.endDate}
                                    isAlways={a.isAlways}
                                />
                        ))
                    }
            </div>
        </section>
    )
}