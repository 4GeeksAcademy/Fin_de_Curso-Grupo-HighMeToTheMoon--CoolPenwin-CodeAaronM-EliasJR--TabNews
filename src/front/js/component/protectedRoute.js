import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../store/appContext'; // Ajusta la ruta según sea necesario
import { HomePrivado } from '../pages/homePrivado';

export const ProtectedRoute = () => {
    const { store } = useContext(Context);

    // Verifica si hay un token en el localStorage
    const token = localStorage.getItem("token");
    const isAuthenticated = token !== null;

    // Si el usuario está autenticado, renderiza HomePrivado; de lo contrario, redirige a /login
    return isAuthenticated ? <HomePrivado /> : <Navigate to="/login" />;
};