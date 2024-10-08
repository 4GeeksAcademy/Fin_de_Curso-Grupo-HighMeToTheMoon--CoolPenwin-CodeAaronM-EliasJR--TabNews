import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext"; // Ajusta la ruta según sea necesario";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        // Llama a la acción de cierre de sesión
        actions.logout();
        // Redirige a la página de inicio de sesión
        navigate("/login");
    }, [actions, navigate]);

    return <div className="container mt-5"><h2>Cerrando sesión...</h2></div>;
};

export default Logout;
