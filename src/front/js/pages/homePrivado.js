import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext"; // Ajusta la ruta según sea necesario
import { useNavigate } from "react-router-dom";

export const HomePrivado = () => {
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
        }
    }, [actions, navigate]);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Bienvenido a la Homepage</h2>
            <div className="row d-flex flex-nowrap my-5" style={{ overflowX: "scroll" }}>
				{store.Articles.map((articles, index) => <CardNewspaper key={index}

					name={articles.name}
					description={articles.description}
					logo={articles.logo}
					link={articles.link}
					id={articles.id}

				/>)}
			</div>
            {store.homepageMessage ? (
                <p className="mt-4">{store.homepageMessage}</p>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};
