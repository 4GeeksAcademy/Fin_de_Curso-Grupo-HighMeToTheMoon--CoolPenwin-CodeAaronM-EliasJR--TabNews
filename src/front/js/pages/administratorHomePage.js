import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { CardArticle } from "../component/CardArticle";
export const AdministratorHomePage = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/administratorLogin");
        } else {
            actions.getAdministratorHomepage();
            actions.getDataArticle();
            actions.loadCategories();
        }
    }, []);

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const filteredArticles = selectedCategories.length > 0
        ? store.Articles.filter((article) => selectedCategories.includes(article.category.name))
        : store.Articles;

    return (
        <div className="container mt-5">
            <h1 className="text-danger">HOMEE privadoo admin</h1>
            <button className="btn btn-primary" onClick={() => actions.getArticleApiData()}>traer datos de api</button>

            <div className="row d-flex flex-nowrap my-5" style={{ overflowX: "scroll" }}>
                {filteredArticles.map((article, index) => (
                    <CardArticle
                        key={index}
                        title={article.title}
                        content={article.content}
                        image={article.image}
                        published_date={article.published_date}
                        source={article.source}
                        link={article.link}
                        author={article.author}
                        newspaper={article.newspaper}
                        category={article.category}
                        id={article.id}
                        showEditButton={true} // Asegúrate de que esto esté presente
                        showDeleteButton={true} // Asegúrate de que esto esté presente
                    />
                ))}
            </div>
        </div>
    );
};