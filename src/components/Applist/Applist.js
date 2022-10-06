import {Link} from "react-router-dom";
import './Applist.scss';
export default function Applist(props){
    return(
        <body className="applist-body">
        <div className="applist_main-div">
            <div className="applist-total">
                <div className="applist-total-swiper">
                    <a className="applist-totla-swiper-a">
                        <div className="applist-total-swiper--sip">
                            <Link to ={`/simblue/${props.id}`}>
                                <div className="list-swiper-div-total">
                                    <div className="list-swiper-div-title_ment">
                                        <div className="list-swiper-div-title">
                                            <div className="list-swiper-div-title-icon">
                                                <span className="list-swiper-div-title-icon-span">{props.icon}</span>
                                            </div>
                                            <div className="list-swiper-div-title-name">
                                                <span>{props.title}</span>
                                            </div>
                                        </div>
                                        <div className="list-swiper-div-ment">
                                            <span>{props.message}</span>
                                        </div>
                                    </div>
                                    <div className="list-swiper-div-day">
                                        <div className="list-swiper-div-day-time">
                                            <span className="list-swiper-div-day-time">
                                                - {props.end_period}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </a>
                </div>
            </div>  
        </div>
    </body>
    )
}