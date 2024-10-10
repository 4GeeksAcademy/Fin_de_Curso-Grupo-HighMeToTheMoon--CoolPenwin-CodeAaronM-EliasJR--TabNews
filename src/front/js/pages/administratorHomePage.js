import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext"; // Ajusta la ruta según sea necesario
import { useNavigate } from "react-router-dom";
import { CardArticle } from "../component/cardArticle";
import { Link } from "react-router-dom";

export const AdministratorHomePage = () => {
    const { store, actions } = useContext(Context); // Obtiene el store y las acciones
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(""); // Estado para categoría seleccionada

    useEffect(() => {
        const token = localStorage.getItem("token"); // Obtén el token de localStorage

        if (!token) {
            // Si no hay token, redirige a la página de inicio de sesión
            navigate("/administratorLogin");
        } else {
            // Si el token está presente, solicita el contenido de la homepage
            actions.getAdministratorHomepage();
            actions.getDataArticle();
        }
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
        <div className="container mt-5">
            <h1 className="text-danger">HOMEE privadoo admin</h1>

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
