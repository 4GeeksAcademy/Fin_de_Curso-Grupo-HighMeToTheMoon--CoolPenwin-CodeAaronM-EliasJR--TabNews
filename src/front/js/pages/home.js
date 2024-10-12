import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CardArticle } from "../component/CardArticle";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [selectedCategories, setSelectedCategories] = useState([]); // Estado para las categorías seleccionadas
    const [showFilters, setShowFilters] = useState(false); // Estado para mostrar u ocultar los filtros

    useEffect(() => {
        actions.getDataArticle();
        actions.loadCategories();
    }, []);

    // Función para manejar el cambio de categorías
    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            // Si la categoría ya está seleccionada, la quitamos
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            // Si la categoría no está seleccionada, la agregamos
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Filtrar artículos por las categorías seleccionadas
    const filteredArticles = selectedCategories.length > 0
        ? store.Articles.filter((article) => selectedCategories.includes(article.category.name))
        : store.Articles;

    return (
        <div className="text-center mt-5">
            <h1 className="text-danger">HOMEE</h1>
            <button className="btn btn-primary" onClick={()=>{actions.getArticleApiData()}}>traer datos de api</button>

            {/* Botón para mostrar u ocultar los filtros */}
            <div className="my-4">
                <button onClick={() => setShowFilters(!showFilters)} className="btn btn-info">
                    {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                </button>
            </div>

            {/* Filtros de categorías, mostrados sólo si `showFilters` es true */}
            {showFilters && (
                <div className="my-4">
                    <button onClick={() => setSelectedCategories([])} className="btn btn-secondary mx-2">
                        Todas
                    </button>
                    {store.categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryChange(category.name)}
                            className={`btn mx-2 ${selectedCategories.includes(category.name) ? "btn-success" : "btn-primary"}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            )}

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
