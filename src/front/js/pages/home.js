import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Register from "./register";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
			<div className="ml-auto mb-2">
				<Link to="/author">
					<button className="btn btn-primary">Ver autores</button>
				</Link>
			</div>
			<div className="ml-auto mb-2">
			<Link to="/newspaper">
				<button className="btn btn-primary">ir a Periodicos</button>
			</Link>
			</div>
			<div className="ml-auto mb-2">
				<Link to="/category">
					<button className="btn btn-primary">Ver Categorías</button>
				</Link>
			</div>
			<div className="ml-auto mb-2">
			<Link to="/article">
				<button className="btn btn-primary">ir a Articulos</button>
			</Link>
			</div>
		</div>
	);
};
