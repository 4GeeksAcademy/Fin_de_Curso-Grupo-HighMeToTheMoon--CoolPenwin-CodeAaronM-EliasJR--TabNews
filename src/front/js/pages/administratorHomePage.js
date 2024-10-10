import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext"; // Ajusta la ruta según sea necesario
import { useNavigate } from "react-router-dom";
import { CardArticle } from "../component/cardArticle";
import { Link } from "react-router-dom";


export const AdministratorHomePage = () => {
    const { store, actions } = useContext(Context); // Obtiene el store y las acciones
    const navigate = useNavigate();

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

    return (
        <div className="container mt-5">
            			<h1 className="text-danger">HOMEE privadoo admin</h1>
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
            <div className="ml-auto mb-2">
				<Link to="/author">
					<button className="btn btn-primary">Ver autores</button>
				</Link>
			</div>
			<div className="ml-auto mb-2">
				<Link to="/newspaper">
					<button className="btn btn-primary">ir a Periodicos</button>
				</Link>
			</div>
			<div className="ml-auto mb-2">
				<Link to="/category">
					<button className="btn btn-primary">Ver Categorías</button>
				</Link>
			</div>
			<div className="ml-auto mb-2">
				<Link to="/article">
					<button className="btn btn-primary">ir a Articulos</button>
				</Link>
			</div>
        </div>
    );
};
