// src/front/js/pages/Category.js
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { Context } from "../store/appContext"; // Asegúrate de importar el contexto

export const Category = () => {
    const { store, actions } = useContext(Context); // Obtén el store y las acciones del contexto

    // Cargar categorías al montar el componente
    useEffect(() => {
        actions.loadCategories();
    }, [actions]);

    // Función para eliminar una categoría
    const handleDeleteCategory = async (id) => {
        await actions.deleteCategory(id);
        actions.loadCategories(); // Carga las categorías nuevamente después de eliminar
    };

    return (
        <div className="container">
            <h1 className="display-4">Categories</h1>
            <Link to="/add-category">
                <Button variant="primary" className="mb-3">
                    Add Category
                </Button>
            </Link>

            <hr className="my-4" />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {store.categories.length > 0 ? (
                        store.categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    <Link to={`/edit-category/${category.id}`}>
                                        <Button variant="warning" className="mx-1">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button variant="danger" onClick={() => handleDeleteCategory(category.id)} className="mx-1">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                <h5>Añade una nueva categoría</h5>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Link to="/">
                <Button variant="secondary" className="mt-4">
                    Back home
                </Button>
            </Link>
        </div>
    );
};
