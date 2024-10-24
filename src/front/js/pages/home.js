import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CardArticle } from "../component/CardArticle";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [selectedCategories, setSelectedCategories] = useState([]); // Estado para las categorías seleccionadas
    const [showFilters, setShowFilters] = useState(false); // Estado para mostrar u ocultar los filtros

    useEffect(() => {
        actions.checkAndFetchData();
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
            <div className="container">  
            <div className="d-flex justify-content-between align-items-center mt-4">
                <h1 className="text-danger ms-2" style={{ fontSize: '2rem', fontWeight: 'bold' }}>HOME</h1>
        
                {/* Botón para mostrar u ocultar los filtros */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="btn btn-info"
                >
                    {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                </button>
            </div>
        
            {/* Filtros de categorías, mostrados sólo si `showFilters` es true */}
            {showFilters && (
                <div className="my-4">
                    <button
                        onClick={() => setSelectedCategories([])}
                        className="btn btn-secondary mx-2"
                    >
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
        
        <div className="container-fluid">
        <div className="row">
            <div className="d-flex flex-wrap mt-2">
                {filteredArticles.map((article, index) => (
                    <div 
                        key={index} 
                        className="col-12 col-sm-6 col-md-4 col-lg-3" 
                        style={{ padding: "10px" }}
                    >
                        <div className="card h-100">
                            <img 
                                src={article.image} 
                                className="card-img-top" 
                                alt={article.title} 
                                style={{ height: "200px", objectFit: "cover" }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title" style={{ fontSize: "1.2rem" }}>
                                    {article.title}
                                </h5>
                                <p className="card-text" style={{ fontSize: "0.9rem" }}>
                                    {article.content}
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">{article.published_date}</small>
                                </p>
                            </div>
                            <div className="card-footer text-center">
                                <a 
                                    href={article.link} 
                                    className="btn btn-primary"
                                    style={{ padding: "8px 15px", borderRadius: "5px", transition: "background-color 0.3s, color 0.3s" }}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    Leer más
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    
        </div>
        
        );
};