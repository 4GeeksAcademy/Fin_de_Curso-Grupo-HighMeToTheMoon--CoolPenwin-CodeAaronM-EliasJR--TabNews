import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Register from "./register";
import { CardNewspaper } from "../component/cardNewspaper";

export const Home = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getNewspaper()
	}, []);

	return (
		<div className="text-center mt-5">
	
	

			<div className="row d-flex flex-nowrap my-5" style={{ overflowX: "scroll" }}>
				{store.Articles.map((articles, index) => <CardNewspaper key={index}

					name={articles.name}
					description={articles.description}
					logo={articles.logo}
					link={articles.link}
					id={articles.id}

				/>)}
			</div>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
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
			<div className="ml-auto">
				<Link to="/category">
					<button className="btn btn-primary">Ver Categorías</button>
				</Link>
			</div>
		</div>
	);
};
