// navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout(); // Llama a la acción de logout
        navigate("/login"); // Redirige a la página de login
    };

    return (
        <nav
        className="navbar navbar-expand-lg"
        style={{
            background: 'linear-gradient(45deg, #e2e6ea, #d3d9db)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}
    >
        <div className="container">
            <Link
                to="/"
                className="navbar-brand"
                style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#007bff',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                }}
            >
                TapNews
            </Link>

            
    
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                    
                    <button
                        className="btn"
                        style={{
                            backgroundColor: 'transparent',
                            color: '#6c757d',
                            border: 'none'
                        }}
                        onClick={() => actions.getArticleApiData()}
                    >
                        Traer datos de API
                    </button>
    
                    <Link to="/login">
                        <button
                            className="btn"
                            style={{
                                backgroundColor: 'transparent',
                                color: '#6c757d',
                                border: 'none'
                            }}
                        >
                            Iniciar Sesión
                        </button>
                    </Link>
    
                    <Link to="/AdministratorLogin">
                        <button
                            className="btn"
                            style={{
                                backgroundColor: 'transparent',
                                color: '#6c757d',
                                border: 'none'
                            }}
                        >
                            Iniciar Sesión Admin
                        </button>
                    </Link>
    
                    <button
                        className="btn d-flex align-items-center"
                        style={{
                            backgroundColor: 'transparent',
                            color: '#dc3545',
                            border: 'none',
                            padding: '0'
                        }}
                        onClick={handleLogout}
                    >
                        <i className="fas fa-sign-out-alt me-1"></i>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    </nav>
    )    
};