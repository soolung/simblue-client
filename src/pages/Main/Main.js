import "./Main.scss";
import Banner from "../../components/Banner/Banner";
import Application from "../../components/Application/Application";
import "swiper/scss";
import { useMutation, useQuery } from "react-query";
import { getAccessTokenByGoogle } from "../../utils/api/auth";
import { useEffect } from "react";
import queryString from "query-string";
import { getFourLatestApplications } from "../../utils/api/application";
import { useNavigate } from "react-router-dom";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from "../../utils/constant/user.constant";
import { Storage } from "../../utils/storage/storage";

export default function Main() {
  const navigate = useNavigate();
  const { data } = useQuery(
    "getFourLatestApplication",
    getFourLatestApplications
  );
  const { mutate } = useMutation(getAccessTokenByGoogle, {
    onSuccess: (data) => {
      Storage.setItem(ACCESS_TOKEN, data.accessToken);
      Storage.setItem(REFRESH_TOKEN, data.refreshToken);
      if (!data?.login) {
        navigate("/signup");
      }
    },
    onError: () => {
      alert("error");
    },
  });

  useEffect(() => {
    const q = queryString.parse(window.location.search);
    if (q.code !== undefined && !localStorage.name) {
      mutate(q.code);
    }
  }, []);

  return (
    <>
      <section className="main">
        <Banner />
        <div></div>
        <div className="latest-application-list">
          {data?.applicationList?.map((a, index) => (
            <Application
              id={a.id}
              emoji={a.emoji}
              title={a.title}
              description={a.description}
              startDate={a.startDate}
              endDate={a.endDate}
              status={a.status}
              key={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}
