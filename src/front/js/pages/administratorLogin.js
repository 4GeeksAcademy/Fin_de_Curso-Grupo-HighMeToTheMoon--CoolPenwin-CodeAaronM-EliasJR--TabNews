import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Ajusta la ruta según sea necesario

const AdministratorLogin = () => {
    const { actions } = useContext(Context); // Obtiene las acciones del store
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook para la navegación

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llama a la acción de inicio de sesión
            await actions.administratorLogin({ email, password });
            console.log("Inicio de sesión exitoso");
            // Redirigir a la página de Homepage después del inicio de sesión exitoso
            navigate("/AdministratorHomePage"); // Cambiado a la ruta de Homepage
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            // Manejo de errores, como mostrar un mensaje al usuario
            alert("Error en el inicio de sesión. Verifica tus credenciales.");
        }
    };

    return (
        <div
        className="container-fluid"
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh', 
            width: '100vw', 
            margin: 0, 
            padding: 0,
            backgroundColor: '#e0e0e0', 
            fontFamily: 'Arial, sans-serif',
        }}
    >
        <div
            style={{
                backgroundColor: '#f5f5f5',
                width: '400px', // Ancho de la caja
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                margin: '20px 0', 
            }}
        >
            <h2 className="text-center" style={{ margin: 0, textAlign: 'center' }}>
                Iniciar Sesión Admin
            </h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div
                    className="mb-3"
                    style={{
                        width: '100%',
                        borderRadius: '25px',
                        padding: '10px',
                        backgroundColor: '#eaeaea',
                        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.2s',
                    }}
                >
                    <label htmlFor="email" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ borderRadius: '5px' }}
                    />
                </div>
                <div
                    className="mb-3"
                    style={{
                        width: '100%',
                        borderRadius: '25px',
                        padding: '10px',
                        backgroundColor: '#eaeaea',
                        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.2s',
                    }}
                >
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ borderRadius: '5px' }}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        padding: '15px',
                        borderRadius: '25px',
                        backgroundColor: '#f39c12',
                        color: 'white',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        border: 'none',
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                    }}
                >
                    Iniciar Sesión
                </button>
            </form>
            <p className="mt-3 text-center">
                ¿No tienes una cuenta?{' '}
                <Link to="/administratorRegister">Regístrate aquí</Link>
            </p>
        </div>
    </div>
     
    );
};
export default AdministratorLogin;