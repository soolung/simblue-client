import "./Main.scss";
import Banner from "../../components/Banner/Banner";
import Application from "../../components/Application/Application";
import "swiper/scss";
import { useQuery } from "react-query";
import { getFourLatestApplications } from "../../utils/api/application";

export default function Main() {
  const { data } = useQuery(
    "getFourLatestApplication",
    getFourLatestApplications
  );

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
