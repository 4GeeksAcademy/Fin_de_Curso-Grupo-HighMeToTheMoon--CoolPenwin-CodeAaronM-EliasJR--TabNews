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
        <div
        className="container mt-5"
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#a0d9c9',
            padding: '40px',
            marginBottom: '62px',
        }}
    >
        <div
            style={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                padding: '30px',
                width: '500px', // Ancho mayor que el de inicio de sesión
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h2 className="text-center" style={{ margin: '0 0 20px', fontWeight: 'bold', color: '#333' }}>
                Registrarse
            </h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label" style={{ fontWeight: '600', color: '#555' }}>
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        style={{
                            border: 'none',
                            borderBottom: '2px solid #f39c12',
                            padding: '10px 0',
                            fontSize: '16px',
                            backgroundColor: '#fff',
                            outline: 'none',
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label" style={{ fontWeight: '600', color: '#555' }}>
                        Apellido
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        style={{
                            border: 'none',
                            borderBottom: '2px solid #f39c12',
                            padding: '10px 0',
                            fontSize: '16px',
                            backgroundColor: '#fff',
                            outline: 'none',
                        }}
                    />
                </div>
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
                >
                    Registrarse
                </button>
            </form>
            <p className="mt-3 text-center" style={{ fontSize: '16px', color: '#777' }}>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" style={{ color: '#f39c12', textDecoration: 'underline' }}>
                    Inicia sesión aquí
                </Link>
            </p>
        </div>
    </div>    
    );
};

export default Register;