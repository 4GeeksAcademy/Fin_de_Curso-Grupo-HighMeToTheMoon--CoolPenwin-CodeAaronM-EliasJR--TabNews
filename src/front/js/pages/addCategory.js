// src/front/js/pages/AddCategory.js
import React, { useState, useContext } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Context } from "../store/appContext"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { Link } from "react-router-dom";

export const AddCategory = () => {
    const { actions } = useContext(Context);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });
    const [showModal, setShowModal] = useState(false); // Estado para el modal
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.newCategory(newCategory);

        // Muestra el modal de confirmación
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/categories"); // Redirigir a la vista de categorías al cerrar el modal
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
                <Button variant="primary" type="submit" className="mt-3">
                    Add Category
                </Button>
            </Form>

            {/* Modal de confirmación */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Category Added</Modal.Title>
                </Modal.Header>
                <Modal.Body>Nueva categoría añadida correctamente.</Modal.Body>
                <Modal.Footer>
                <Link to="/category">
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
