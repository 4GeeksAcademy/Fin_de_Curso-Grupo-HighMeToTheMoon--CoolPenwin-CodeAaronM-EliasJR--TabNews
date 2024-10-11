import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { CardArticle } from "../component/cardArticle";

export const HomePage = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [userPreferredCategories, setUserPreferredCategories] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            actions.getHomepage();
            actions.getDataArticle();
            actions.loadCategories();
            actions.getUserPreferredCategories();
        }
    }, [actions, navigate]);

    useEffect(() => {
        if (store.userPreferredCategories.length > 0) {
            const preferredCategories = store.userPreferredCategories.map(cat => cat.category_id);
            setUserPreferredCategories(preferredCategories);
            setSelectedCategories(preferredCategories);
        }
    }, [store.userPreferredCategories]);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prevSelectedCategories => {
            if (prevSelectedCategories.includes(category)) {
                return prevSelectedCategories.filter(cat => cat !== category);
            } else {
                return [...prevSelectedCategories, category];
            }
        });
    };

    const savePreferences = async () => {
        await actions.saveUserPreferredCategories(selectedCategories);
        setShowPreferences(false); // Cerrar el modal después de guardar
    };

    const filteredArticles = selectedCategories.length > 0
        ? store.Articles.filter((article) => selectedCategories.includes(article.category.id))
        : store.Articles;

    return (
        <div className="container mt-5">
            <h1 className="text-danger">HomePage</h1>

            <div className="my-4">
                <button onClick={() => setShowFilters(!showFilters)} className="btn btn-info">
                    {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                </button>

                <button onClick={() => setShowPreferences(!showPreferences)} className="btn btn-warning mx-2">
                    {showPreferences ? "Ocultar Preferencias" : "Seleccionar Preferencias"}
                </button>
            </div>

            {showFilters && (
                <div className="my-4">
                    <button onClick={() => setSelectedCategories([])} className="btn btn-secondary mx-2">
                        Todas
                    </button>
                    {store.categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`btn mx-2 ${selectedCategories.includes(category.id) ? "btn-success" : "btn-primary"}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            )}

            {showPreferences && (
                <div className="preferences-modal">
                    <h3>Selecciona tus categorías preferidas</h3>
                    {store.categories.map((category, index) => (
                        <div key={index} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`category-${category.id}`}
                                checked={selectedCategories.includes(category.id)}
                                onChange={() => handleCategoryChange(category.id)}
                            />
                            <label className="form-check-label" htmlFor={`category-${category.id}`}>
                                {category.name}
                            </label>
                        </div>
                    ))}
                    <button className="btn btn-primary mt-3" onClick={savePreferences}>
                        Guardar Preferencias
                    </button>
                </div>
            )}

            <div className="row d-flex flex-nowrap my-5" style={{ overflowX: "scroll" }}>
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article, index) => (
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
                    ))
                ) : (
                    <p>No se encontraron artículos para las categorías seleccionadas.</p>
                )}
            </div>

            {store.homepageMessage ? (
                <p className="mt-4">{store.homepageMessage}</p>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};
