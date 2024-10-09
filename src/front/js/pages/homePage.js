import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext"; // Ajusta la ruta según sea necesario
import { useNavigate } from "react-router-dom";
import { CardArticle } from "../component/cardArticle";


export const HomePage = () => {
    const { store, actions } = useContext(Context); // Obtiene el store y las acciones
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token"); // Obtén el token de localStorage

        if (!token) {
            // Si no hay token, redirige a la página de inicio de sesión
            navigate("/login");
        } else {
            // Si el token está presente, solicita el contenido de la homepage
            actions.getHomepage();
            actions.getDataArticle();
        }
    }, []);

    return (
        <div className="container mt-5">
            			<h1 className="text-danger">HOMEE privadoo</h1>
			<div className="row d-flex flex-nowrap my-5" style={{ overflowX: "scroll" }}>
				{store.Articles.map((article, index) => (
					<CardArticle
						key={index}
						title={article.title}
						content={article.content}
						image={article.image}
						published_date={article.published_date}
						source={article.source}
						link={article.link}
						author={article.author.name}
						newspaper={article.newspaper.name}
						category={article.category.name}
						id={article.id}
					/>
				))}
			</div>
            {store.homepageMessage ? (
                <p className="mt-4">{store.homepageMessage}</p>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};
