// src/front/js/pages/AddNewspaper.js
import React, { useState, useContext } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Context } from "../store/appContext"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { Link } from "react-router-dom";

export const AddNewspaper = () => {
    const { actions } = useContext(Context);
    const [newNewspaper, setNewNewspaper] = useState({ name: "", description: "" });
    const [showModal, setShowModal] = useState(false); // Estado para el modal
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.newNewspaper(newNewspaper);

        // Muestra el modal de confirmación
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/categories"); // Redirigir a la vista de categorías al cerrar el modal
    };

    return (
        <div className="container">
            <h1 className="display-4">Add New Newspaper</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="newspaperName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter newspaper name"
                        value={newNewspaper.name}
                        onChange={(e) => setNewNewspaper({ ...newNewspaper, name: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="newspaperDescription" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter newspaper description"
                        value={newNewspaper.description}
                        onChange={(e) => setNewNewspaper({ ...newNewspaper, description: e.target.value })}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Add Newspaper
                </Button>
            </Form>

            {/* Modal de confirmación */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Newspaper Added</Modal.Title>
                </Modal.Header>
                <Modal.Body>Nueva categoría añadida correctamente.</Modal.Body>
                <Modal.Footer>
                <Link to="/newspaper">
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
