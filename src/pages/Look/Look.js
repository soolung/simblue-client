import "./Look.scss";
import {useEffect, useState} from "react";
import Categories from "./CategoryConstant";
import data from "./data.json";
import Application from "../../components/Application/Application";

export default function Look() {
    const [applications, setApplications] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(Categories.deadline);
    const categories = [Categories.deadline, Categories.latest, Categories.always];

    useEffect(() => {
        // reset data by selected category
    }, [selectedCategory])

    useEffect(() => {
        // set data first
        setApplications(data.applications);
    }, [])

    return (
        <>
            <section className="look">
                <div className="look-header">
                    <p className="look-header-title">둘러보기</p>
                    <p className="look-header-description">{selectedCategory.description}</p>
                </div>
                <div className="look-category-section">
                    {
                        categories.map(c => (
                            <p
                                className={`look-category-section-category ${selectedCategory === c ? 'selected' : ''}`}
                                onClick={() => setSelectedCategory(c)}
                            >
                                {c.text}
                            </p>
                        ))
                    }
                </div>
                <div className="look-application-section">
                    {
                        applications.map(a => (
                            <Application
                                title={a.title}
                                emoji={a.emoji}
                                description={a.description}
                                endDate={a.endDate}
                                isAlways={a.isAlways}
                            />
                        ))
                    }
                </div>
            </section>

        </>
    )
}
