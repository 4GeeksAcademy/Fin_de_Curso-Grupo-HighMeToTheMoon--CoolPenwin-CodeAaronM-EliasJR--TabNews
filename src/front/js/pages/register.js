import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";  // Accede al contexto

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    const { actions } = useContext(Context);  // Accede a las acciones desde el contexto
    const navigate = useNavigate();  // Hook para redirigir a otras páginas

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newUser = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        };

        actions.signup(newUser).then(() => {
            // Redirige al usuario a la página de inicio de sesión
            navigate("/login");
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Registrarse</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
            <p className="mt-3 text-center">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login">Inicia sesión aquí</Link>
            </p>
        </div>
    );
};

export default Register;
