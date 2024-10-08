import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../store/appContext'; // Ajusta la ruta según sea necesario
import { HomePage } from '../pages/homePage';

export const ProtectedRoute = () => {
    const { store } = useContext(Context);

    // Verifica si hay un token en el localStorage
    const token = localStorage.getItem("token");
    const isAuthenticated = token !== null;

    // Si el usuario está autenticado, renderiza HomePage; de lo contrario, redirige a /login
    return isAuthenticated ? <HomePage /> : <Navigate to="/login" />;
};