import "./Look.scss";
import { useEffect, useState } from "react";
import Categories from "./CategoryConstant";
import Application from "../../components/Application/Application";
import { useQuery } from "react-query";
import { getApplications } from "../../utils/api/application";

export default function Look() {
  const [selectedCategory, setSelectedCategory] = useState(Categories.deadline);
  const categories = [
    Categories.deadline,
    Categories.latest,
    Categories.always,
  ];
  const { data, refetch } = useQuery(
    "getApplications",
    () => getApplications(selectedCategory.uri),
    {
      onSuccess: () => {},
    }
  );

  useEffect(() => {
    refetch();
  }, [selectedCategory]);

  return (
    <>
      <section className="look">
        <div className="section-header">
          <p className="section-header-title">둘러보기</p>
          <p className="section-header-description">
            {selectedCategory.description}
          </p>
        </div>
        <div className="look-category-section">
          {categories.map((c, index) => (
            <p
              className={`look-category-section-category ${
                selectedCategory === c ? "selected" : ""
              }`}
              onClick={() => setSelectedCategory(c)}
              key={index}
            >
              {c.text}
            </p>
          ))}
        </div>
        {data?.length > 0 ? (
          <div className="look-application-section">
            {data?.map((a, index) => (
              <Application
                id={a.id}
                title={a.title}
                emoji={a.emoji}
                description={a.description}
                endDate={a.endDate}
                status={a.status}
                key={index}
              />
            ))}
          </div>
        ) : (
          <p className="none">{selectedCategory.description}이 없습니다.</p>
        )}
      </section>
    </>
  );
}
