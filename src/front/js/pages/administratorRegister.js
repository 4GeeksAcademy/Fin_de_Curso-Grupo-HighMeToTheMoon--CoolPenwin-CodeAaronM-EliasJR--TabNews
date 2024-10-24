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
                navigate("/AdministratorLogin"); // Cambiado a la ruta principal
            }, 1500);
        });
    };

    return (
        <div
        className="container-fluid"
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh', // Asegura que cubra toda la altura de la pantalla
            width: '100vw', // Asegura que cubra todo el ancho
            margin: 0, // Elimina cualquier margen externo
            padding: 0,
            backgroundColor: '#e0e0e0', // Color de fondo gris
            fontFamily: 'Arial, sans-serif',
        }}
    >
        <div
            style={{
                backgroundColor: '#f5f5f5',
                width: '600px', // Aumenta el ancho
                padding: '40px', // Padding más amplio
                borderRadius: '20px', // Bordes redondeados
                boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)', // Sombra más suave
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                margin: '20px 0', // Agrega margen superior e inferior
            }}
        >
            <h2 className="text-center" style={{ margin: 0, fontWeight: 'normal', color: '#333' }}>
                Registrarse como Admin
            </h2>
            <form onSubmit={handleSubmit} className="mt-4">
                {['firstName', 'lastName', 'email', 'password'].map((field) => (
                    <div
                        key={field}
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
                        <label htmlFor={field} className="form-label" style={{ fontWeight: '600', color: '#555' }}>
                            {field === 'firstName' ? 'Nombre' : field === 'lastName' ? 'Apellido' : field === 'email' ? 'Correo Electrónico' : 'Contraseña'}
                        </label>
                        <input
                            type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                            className="form-control"
                            id={field}
                            value={field === 'firstName' ? firstName : field === 'lastName' ? lastName : field === 'email' ? email : password}
                            onChange={(e) => {
                                if (field === 'firstName') setFirstName(e.target.value);
                                else if (field === 'lastName') setLastName(e.target.value);
                                else if (field === 'email') setEmail(e.target.value);
                                else if (field === 'password') setPassword(e.target.value);
                            }}
                            required
                            style={{
                                border: 'none',
                                borderRadius: '5px', 
                                padding: '10px 0', 
                                backgroundColor: '#fff', 
                                outline: 'none', 
                            }}
                            onFocus={(e) => {
                                e.target.style.boxShadow = 'none'; 
                            }}
                        />
                    </div>
                ))}
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
                        transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.3s',
                        border: 'none',
                        fontSize: '18px',
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
                    Registrarse
                </button>
            </form>
            <p className="mt-3 text-center" style={{ fontSize: '16px', color: '#777' }}>
                ¿Ya tienes una cuenta?{' '}
                <Link to="/administratorLogin" style={{ color: '#f39c12', textDecoration: 'underline' }}>
                    Inicia sesión aquí
                </Link>
            </p>
        </div>
    </div>    
    );
};

export default AdministratorRegister;