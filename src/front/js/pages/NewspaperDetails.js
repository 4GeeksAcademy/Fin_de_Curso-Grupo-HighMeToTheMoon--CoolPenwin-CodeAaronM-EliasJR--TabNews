// src/front/js/pages/NewspaperDetails.js
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { Context } from "../store/appContext";

export const NewspaperDetails = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); // Obtener el ID de la categoría desde la URL
    const [newspaper, setNewspaper] = useState(null);
    const navigate = useNavigate();

    // Cargar los datos de la categoría cuando se monta el componente
    useEffect(() => {
        const selectedNewspaper = store.categories.find(cat => cat.id === parseInt(id));
        if (selectedNewspaper) {
            setNewspaper(selectedNewspaper);
        }
    }, [id, store.categories]);

    if (!newspaper) {
        return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div className="container">
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>Newspaper Details</Card.Title>
                    <Card.Text><strong>ID:</strong> {newspaper.id}</Card.Text>
                    <Card.Text><strong>Name:</strong> {newspaper.name}</Card.Text>
                    <Card.Text><strong>Description:</strong> {newspaper.description}</Card.Text>
                    
                    <Link to={`/edit-newspaper/${newspaper.id}`}>
                        <Button variant="warning" className="mx-1">
                            Edit Newspaper
                        </Button>
                    </Link>
                    <Button variant="secondary" className="mx-1" onClick={() => navigate("/newspaper")}>
                        Atrás
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};
