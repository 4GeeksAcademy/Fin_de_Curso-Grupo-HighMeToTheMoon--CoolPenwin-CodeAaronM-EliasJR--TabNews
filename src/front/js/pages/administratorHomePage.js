import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext"; // Ajusta la ruta según sea necesario
import { useNavigate } from "react-router-dom";
import { CardArticle } from "../component/cardArticle";
import { Link } from "react-router-dom";

export const AdministratorHomePage = () => {
    const { store, actions } = useContext(Context); // Obtiene el store y las acciones
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState([]); // Estado para categorías seleccionadas
    const [showFilters, setShowFilters] = useState(false); // Estado para mostrar u ocultar los filtros

    useEffect(() => {
        const token = localStorage.getItem("token"); // Obtén el token de localStorage

        if (!token) {
            // Si no hay token, redirige a la página de inicio de sesión
            navigate("/administratorLogin");
        } else {
            // Si el token está presente, solicita el contenido de la homepage
            actions.getAdministratorHomepage();
            actions.getDataArticle();
            actions.loadCategories();
        }
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
        <div className="container mt-5">
            <h1 className="text-danger">HOMEE privadoo admin</h1>
            <button className="btn btn-primary" onClick={actions.getArticleApiData()}>traer datos de api</button>

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

            {/* Navegación a otras páginas */}
            <div className="ml-auto mb-2">
                <Link to="/author">
                    <button className="btn btn-primary">Ver autores</button>
                </Link>
            </div>
            <div className="ml-auto mb-2">
                <Link to="/newspaper">
                    <button className="btn btn-primary">Ir a Periódicos</button>
                </Link>
            </div>
            <div className="ml-auto mb-2">
                <Link to="/category">
                    <button className="btn btn-primary">Ver Categorías</button>
                </Link>
            </div>
            <div className="ml-auto mb-2">
                <Link to="/article">
                    <button className="btn btn-primary">Ir a Artículos</button>
                </Link>
            </div>
        </div>
    );
};
