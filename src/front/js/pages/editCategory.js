// src/front/js/pages/EditCategory.js
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importamos useNavigate para la redirección
import { Form, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const EditCategory = () => {
    const { store, actions } = useContext(Context); // Obtenemos el store y las acciones del contexto
    const { id } = useParams(); // Obtenemos el ID de la categoría desde la URL
    const navigate = useNavigate(); // Hook para navegar entre vistas

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    // Cargar los datos de la categoría cuando se monta el componente
    useEffect(() => {
        const category = store.categories.find(cat => cat.id === parseInt(id));
        if (category) {
            setFormData({
                name: category.name,
                description: category.description
            });
        }
    }, [id, store.categories]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Actualizar la categoría con los nuevos datos
                await actions.updateCategory(id, formData); // Llamamos la acción para actualizar la categoría
                Swal.fire("Saved!", "", "success");
                // Permanecemos en la vista de detalles
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    // Función para volver a la vista de categorías
    const handleGoBack = () => {
        navigate("/category"); // Redirige a la vista de categorías
    };

    return (
        <div className="container mt-4">
            <h2>Edit Category</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCategoryName">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCategoryDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Save Changes
                </Button>

                {/* Botón para volver a la vista de categorías */}
                <Button variant="secondary" className="mt-3 ms-2" onClick={handleGoBack}>
                    Volver
                </Button>
            </Form>
        </div>
    );
};
