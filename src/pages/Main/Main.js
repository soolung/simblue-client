import './Main.scss';
import BannerData from "./banner.json";
import Banner from "../../components/Banner/Banner";
import Application from "../../components/Application/Application";
import "swiper/scss";
import { useMutation, useQuery } from "react-query";
import { getAccessTokenByGoogle } from "../../utils/api/auth";
import { useEffect } from "react";
import queryString from "query-string";
import { useSetRecoilState } from "recoil";
import { userState } from "../../utils/atom/user";
import { getFourLatestApplications } from "../../utils/api/application";
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const { data } = useQuery('getFourLatestApplication', getFourLatestApplications);
  const { mutate } = useMutation(getAccessTokenByGoogle, {
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("authority", data.authority);
      localStorage.setItem("name", data.name);
      setUser({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        authority: data.authority,
        name: data.name,
      });

      if (!data?.login) {
        navigate('/signup')
      }
    },
    onError: () => {
      alert('error')
    }
  });

  useEffect(() => {
    const q = queryString.parse(window.location.search);
    if (q.code !== undefined&& !localStorage.name) {
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
            data?.applicationList?.map((a, index) => (
              <Application
                id={a.id}
                emoji={a.emoji}
                title={a.title}
                description={a.description}
                startDate={a.startDate}
                endDate={a.endDate}
                isAlways={a.isAlways}
                key={index}
              />
            ))
          }
        </div>
      </section>
    </>
  )
}