// src/front/js/pages/AddCategory.js
import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Context } from "../store/appContext"; // Asegúrate de que la ruta sea correcta
import { useNavigate, Link } from "react-router-dom"; // Importa useNavigate y Link
import Swal from "sweetalert2"; // Importa SweetAlert2

export const AddCategory = () => {
    const { actions } = useContext(Context);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.newCategory(newCategory);

        // Muestra la alerta de éxito centrada en la pantalla
        Swal.fire({
            position: "center", // Cambia la posición a centro
            icon: "success",
            title: "New category added",
            showConfirmButton: false,
            timer: 1500
        });

        // Redirigir a la vista de categorías después de la alerta
        setTimeout(() => {
            navigate("/category");
        }, 1500);
    };

    return (
        <div className="container">
            <h1 className="display-4">Add New Category</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="categoryName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter category name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="categoryDescription" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter category description"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    />
                </Form.Group>
                <div className="d-flex justify-content-between mt-3">
                    <Button variant="primary" type="submit">
                        Add Category
                    </Button>
                    <Link to="/category">
                        <Button variant="secondary">
                            Back to Categories
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
};
