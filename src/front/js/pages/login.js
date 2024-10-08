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
        <div className="container mt-5">
            <h2 className="text-center">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
            <p className="mt-3 text-center">
                ¿No tienes una cuenta?{" "}
                <Link to="/register">Regístrate aquí</Link>
            </p>
        </div>
    );
};

export default Login;
