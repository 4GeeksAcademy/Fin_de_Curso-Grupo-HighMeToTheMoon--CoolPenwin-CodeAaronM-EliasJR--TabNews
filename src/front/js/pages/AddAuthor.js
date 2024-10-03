import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { CardAuthor } from "../component/cardAuthor";

export const AddAuthor = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [photo, setPhoto] = useState("");
	const [id, setId] = useState(null); // Cambié a null inicialmente

	// Efecto para cargar los datos de edición desde store.temp
	useEffect(() => {
		if (store.temp && store.temp.id) {
			setName(store.temp.name);
			setDescription(store.temp.description);
			setPhoto(store.temp.photo);
			setId(store.temp.id); // Setea el id cuando editas un autor
		} else {
			console.log("Componente temporal vacío, agregando nuevo autor");
		}
	}, [store.temp]);

	// Cargar autores al montar el componente
	useEffect(() => {
		actions.getData();
	}, []);

	const handleSave = (e) => {
		e.preventDefault();

		// Si el ID existe, editamos el autor, si no, creamos uno nuevo
		if (id) {
			actions.changeAuthor({ name, description, photo, id });
		} else {
			actions.addAuthor({ name, description, photo });
		}
		// Limpia el formulario después de guardar
		setName("");
		setDescription("");
		setPhoto("");
		setId(null); // Limpiar el ID para evitar conflictos
	};

	return (
		<div className="text-center mt-5">
			<h1>{id ? "Edit Author" : "Add New Author"}</h1> {/* Título dinámico dependiendo si estamos en modo edición o no */}

			<form>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">Name</label>
					<input
						type="text"
						className="form-control"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="description" className="form-label">Description</label>
					<input
						type="text"
						className="form-control"
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="photo" className="form-label">Photo URL</label>
					<input
						type="text"
						className="form-control"
						id="photo"
						value={photo}
						onChange={(e) => setPhoto(e.target.value)}
					/>
				</div>

				<button className="btn btn-primary" onClick={handleSave}>
					{id ? "Update" : "Save"} {/* Cambia el texto dependiendo si estamos editando */}
				</button>
			</form>

			<Link to="/">
				<h2>Get back to home</h2>
			</Link>

			<div className="row d-flex flex-nowrap my-5" style={{ overflowX: "scroll" }}>
				{store.Authors.map((author, index) => (
					<CardAuthor
						key={index}
						name={author.name}
						description={author.description}
						photo={author.photo}
						id={author.id}
					/>
				))}
			</div>

			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your Python backend is running)..."}
			</div>
		</div>
	);
};