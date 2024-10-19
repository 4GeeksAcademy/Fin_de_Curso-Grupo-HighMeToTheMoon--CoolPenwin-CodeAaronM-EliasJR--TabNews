import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";  // Importa el contexto global
import Swal from "sweetalert2";  // Importa SweetAlert2

const AdministratorRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    const { actions } = useContext(Context);  // Accede a las acciones desde el contexto
    const navigate = useNavigate();  // Hook para redirigir a otras páginas

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Construye el objeto con los datos del usuario
        const newUser = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        };

        // Llama a la función signup desde flux
        actions.administratorSignup(newUser).then(() => {
            // Muestra la alerta de éxito centrada cuando se registre correctamente
            Swal.fire({
                position: "center",  // Coloca la alerta en el centro de la pantalla
                icon: "success",
                title: "¡Administrador registrado correctamente!",
                showConfirmButton: false,
                timer: 2000,
            });

            // Redirige al usuario a la página principal después de 1.5 segundos
            setTimeout(() => {
                navigate("/"); // Cambiado a la ruta principal
            }, 1500);
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Registrarse como admin</h2>
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
                <Link to="/administratorLogin">Inicia sesión aquí</Link>
            </p>
        </div>
    );
};

export default AdministratorRegister;
