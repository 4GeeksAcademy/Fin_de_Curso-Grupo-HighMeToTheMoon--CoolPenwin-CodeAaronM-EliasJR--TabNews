import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Ajusta la ruta según sea necesario

const Login = () => {
    const { actions } = useContext(Context); // Obtiene las acciones del store
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook para la navegación

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llama a la acción de inicio de sesión
            await actions.login({ email, password });
            console.log("Inicio de sesión exitoso");
            // Redirigir a la página de Homepage después del inicio de sesión exitoso
            navigate("/homePage"); // Cambiado a la ruta de Homepage
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            // Manejo de errores, como mostrar un mensaje al usuario
            alert("Error en el inicio de sesión. Verifica tus credenciales.");
        }
    };

    return (
        <div
    className="container mt-5"
    style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#a0d9c9',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        marginBottom: '60px',
    }}
>
    <div
        style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '30px',
            width: '400px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
    >
        <h2 className="text-center" style={{ margin: '0 0 20px', fontWeight: 'bold', color: '#333' }}>
            Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ fontWeight: '600', color: '#555' }}>
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        border: 'none', 
                        borderBottom: '2px solid #f39c12', 
                        padding: '10px 0',
                        fontSize: '16px',
                        backgroundColor: '#fff',
                        outline: 'none',
                        transition: 'border-bottom 0.3s, transform 0.3s',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderBottom = '2px solid #007bff';
                        e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderBottom = '2px solid #f39c12';
                        e.target.style.transform = 'translateY(0)';
                    }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{ fontWeight: '600', color: '#555' }}>
                    Contraseña
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        border: 'none',
                        borderBottom: '2px solid #f39c12', 
                        padding: '10px 0', 
                        fontSize: '16px',
                        backgroundColor: '#fff',
                        outline: 'none',
                        transition: 'border-bottom 0.3s, transform 0.3s',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderBottom = '2px solid #007bff';
                        e.target.style.transform = 'translateY(-2px)'; 
                    }}
                    onBlur={(e) => {
                        e.target.style.borderBottom = '2px solid #f39c12';
                        e.target.style.transform = 'translateY(0)'; 
                    }}
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                style={{
                    width: '100%',
                    padding: '15px',
                    borderRadius: '30px',
                    backgroundColor: '#f39c12',
                    color: 'white',
                    border: 'none',
                    transition: 'background-color 0.3s, transform 0.2s',
                }}
                onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                }}
            >
                Iniciar Sesión
            </button>
        </form>
        <p className="mt-3 text-center" style={{ fontSize: '16px', color: '#777' }}>
            ¿No tienes una cuenta?{" "}
            <Link to="/register" style={{ color: '#f39c12', textDecoration: 'underline' }}>
                Regístrate aquí
            </Link>
        </p>
    </div>
</div>
    );
};

export default Login;