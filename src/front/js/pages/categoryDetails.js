// src/front/js/pages/CategoryDetails.js
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { Context } from "../store/appContext";

export const CategoryDetails = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); // Obtener el ID de la categoría desde la URL
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();

    // Cargar los datos de la categoría cuando se monta el componente
    useEffect(() => {
        const selectedCategory = store.categories.find(cat => cat.id === parseInt(id));
        if (selectedCategory) {
            setCategory(selectedCategory);
        }
    }, [id, store.categories]);

    if (!category) {
        return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div className="container">
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>Category Details</Card.Title>
                    <Card.Text><strong>ID:</strong> {category.id}</Card.Text>
                    <Card.Text><strong>Name:</strong> {category.name}</Card.Text>
                    <Card.Text><strong>Description:</strong> {category.description}</Card.Text>
                    
                    <Link to={`/edit-category/${category.id}`}>
                        <Button variant="warning" className="mx-1">
                            Edit Category
                        </Button>
                    </Link>
                    <Button variant="secondary" className="mx-1" onClick={() => navigate("/category")}>
                        Atrás
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};
