import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CardArticle } from "../component/cardArticle";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [selectedCategory, setSelectedCategory] = useState(""); // Estado para categoría seleccionada

    useEffect(() => {
        actions.getDataArticle();
		actions.loadCategories();
    }, []);

    // Función para manejar el cambio de categoría
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // Filtrar artículos por la categoría seleccionada
    const filteredArticles = selectedCategory
        ? store.Articles.filter((article) => article.category.name === selectedCategory)
        : store.Articles;

    return (
        <div className="text-center mt-5">
            <h1 className="text-danger">HOMEE</h1>

            {/* Botones para seleccionar la categoría */}
            <div className="my-4">
                <button onClick={() => handleCategoryChange("")} className="btn btn-secondary mx-2">
                    Todas
                </button>
                {store.categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleCategoryChange(category.name)}
                        className="btn btn-primary mx-2"
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Lista de artículos filtrados */}
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
                    />
                ))}
            </div>
        </div>
    );
};
