// src/front/js/pages/UserCategories.js
import React, { useEffect, useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Context } from "../store/appContext";

export const UserCategories = () => {
    const { store, actions } = useContext(Context);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        actions.loadCategories();
    }, [actions]);

    const handleSelectCategory = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="container">
            <h1 className="display-4">User Categories</h1>

            <Button variant="primary" className="mb-3" onClick={handleShowModal}>
                Add Categories
            </Button>

            <hr className="my-4" />

            <div className="mt-3">
                <h4>Selected Categories:</h4>
                {selectedCategories.length === 0 ? (
                    <p>No categories selected.</p>
                ) : (
                    <ul>
                        {selectedCategories.map((id) => {
                            const category = store.categories.find(cat => cat.id === id);
                            return <li key={id}>{category.name}</li>;
                        })}
                    </ul>
                )}
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-wrap">
                        {store.categories.length === 0 ? (
                            <p className="text-center w-100">--- No categories available ---</p>
                        ) : (
                            store.categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategories.includes(category.id) ? "success" : "outline-primary"}
                                    className="m-2"
                                    onClick={() => handleSelectCategory(category.id)}
                                >
                                    {category.name}
                                </Button>
                            ))
                        )}
                    </div>

                    <h5 className="mt-4">Selected Categories:</h5>
                    {selectedCategories.length === 0 ? (
                        <p>No categories selected.</p>
                    ) : (
                        <ul>
                            {selectedCategories.map((id) => {
                                const category = store.categories.find(cat => cat.id === id);
                                return <li key={id}>{category.name}</li>;
                            })}
                        </ul>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};
