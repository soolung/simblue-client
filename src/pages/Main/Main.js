import './Main.scss';
import BannerData from "./banner.json";
import Banner from "../../components/Banner/Banner";
export default function Main(){
    
    return(
        <section>
            <Banner
                banner={BannerData.banners}
            />
        </section>
    )
}