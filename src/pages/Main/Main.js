import './Main.scss';
import BannerData from "./banner.json";
import Banner from "../../components/Banner/Banner";
import ListData from "./list.json";
import Application from "../../components/Application/Application";
import "swiper/scss";
import {useMutation} from "react-query";
import {getAccessTokenByGoogle} from "../../utils/api/auth";
import {useEffect, useState} from "react";
import queryString from "query-string";
import SignUpModal from "../../components/Modal/Signup/SignUpModal";
import {useRecoilState, useSetRecoilState} from "recoil";
import {userState} from "../../utils/atom/user";

export default function Main() {
    const setUser = useSetRecoilState(userState);
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const {mutate} = useMutation(getAccessTokenByGoogle, {
        onSuccess: (data) => {
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("authority", data.authority);
            setUser({
                token: data.accessToken,
                authority: data.authority
            })
            setSignUpModalOpen(true)
        },
        onError: () => {
            alert('error')
        }
    });

    useEffect(() => {
        const q = queryString.parse(window.location.search);
        if (q.code !== undefined) {
            mutate(q.code)
        }
    }, [])

    return (
        <>
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
            <SignUpModal
                isOpen={isSignUpModalOpen}
                closeModal={() => setSignUpModalOpen(false)}
            />
        </>
    )
}
