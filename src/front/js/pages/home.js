import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
			<Link to="/newspaper">
				<h1>ir a piriodico</h1>
			</Link>
			<Link to="/author">
				<h1>ir a author</h1>
			</Link>

			<div className="ml-auto">
					<Link to="/category">
						<button className="btn btn-primary">Ver Categorías</button>
					</Link>
				</div>
		</div>
	);
};
