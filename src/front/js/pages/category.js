// src/front/js/pages/Category.js
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { Context } from "../store/appContext";
import Swal from "sweetalert2"; // Importar SweetAlert2

export const Category = () => {
    const { store, actions } = useContext(Context);

    // Cargar categorías al montar el componente
    useEffect(() => {
        actions.loadCategories();
    }, [actions]);

    // Función para eliminar una categoría
    const handleDeleteCategory = async (id) => {
        // Mostrar la alerta de confirmación antes de proceder
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Si se confirma, proceder con la eliminación
                await actions.deleteCategory(id);

                // Mostrar alerta de éxito al eliminar
                Swal.fire({
                    title: "Deleted!",
                    text: "The category has been deleted.",
                    icon: "success"
                });
            }
        });
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
                    {store.categories.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">
                                --- Add a new category ---
                            </td>
                        </tr>
                    ) : (
                        store.categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    <Link to={`/category-details/${category.id}`}>
                                        <Button variant="info" className="mx-1">
                                            Ver
                                        </Button>
                                    </Link>
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
