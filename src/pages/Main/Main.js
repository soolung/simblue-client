import './Main.scss';
import BannerData from "./banner.json";
import Banner from "../../components/Banner/Banner";
import ListData from "./list.json";
import Applist from "../../components/Applist/Applist";
export default function Main(){
    return(
        <section>
            <Banner
                banner={BannerData.banners}
            />
            <Applist
                list={ListData.list}
            />
        </section>
    )
}