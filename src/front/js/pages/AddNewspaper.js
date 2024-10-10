import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { CardNewspaper } from "../component/cardNewspaper";

export const AddNewspaper = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [logo, setLogo] = useState("");
	const [link, setLink] = useState("");
	const [id, setId] = useState(null); // Cambié a null inicialmente

	// Efecto para cargar los datos de edición desde store.temp
	useEffect(() => {
		if (store.temp && store.temp.id) {
			setName(store.temp.name);
			setDescription(store.temp.description);
			setLogo(store.temp.logo);
			setLink(store.temp.link);
			setId(store.temp.id); // Setea el id cuando editas un autor
		} else {
			console.log("Componente temporal vacío, agregando nuevo autor");
		}
	}, [store.temp]);

	// Cargar autores al montar el componente
	useEffect(() => {
		actions.getNewspaper();
	}, []);

	const handleSavePaper = (e) => {
		e.preventDefault();

		// Si el ID existe, editamos el autor, si no, creamos uno nuevo
		if (id) {
			actions.changeNewspaper({ name, description, logo, link, id });
		} else {
			actions.addNewspaper({ name, description, logo, link });
		}
		// Limpia el formulario después de guardar
		setName("");
		setDescription("");
		setLogo("");
		setLink("");
		setId(null); // Limpiar el ID para evitar conflictos
	};

	return (
		<div className="text-center mt-5">
			<h1>{id ? "Edit Newspaper" : "Add New Newspaper"}</h1> {/* Título dinámico dependiendo si estamos en modo edición o no */}

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
					<label htmlFor="logo" className="form-label">Logo URL</label>
					<input
						type="text"
						className="form-control"
						id="logo"
						value={logo}
						onChange={(e) => setLogo(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="link" className="form-label">Link URL</label>
					<input
						type="text"
						className="form-control"
						id="link"
						value={link}
						onChange={(e) => setLink(e.target.value)}
					/>
				</div>

				<button className="btn btn-primary" onClick={handleSavePaper}>
					{id ? "Update" : "Save"} {/* Cambia el texto dependiendo si estamos editando */}
				</button>
			</form>

			<Link to="/administratorHomePage">
				<h2>Get back to home</h2>
			</Link>

			<div className="row d-flex flex-nowrap my-5" style={{ overflowX: "scroll" }}>
				{store.Newspapers.map((newspaper, index) => (
					<CardNewspaper
						key={index}
						name={newspaper.name}
						description={newspaper.description}
						logo={newspaper.logo}
						link={newspaper.link}
						id={newspaper.id}
					/>
				))}
			</div>

			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your Python backend is running)..."}
			</div>
		</div>
	);
};