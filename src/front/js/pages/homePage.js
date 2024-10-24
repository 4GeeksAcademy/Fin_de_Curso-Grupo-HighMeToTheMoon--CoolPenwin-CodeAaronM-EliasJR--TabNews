import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { CardArticle } from "../component/CardArticle";

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
        
        <div className="container">  
        <div className="d-flex justify-content-between align-items-center mt-4">
            <h1 className="text-danger ms-2" style={{ fontSize: '2rem', fontWeight: 'bold' }}>HOME User</h1>
    
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