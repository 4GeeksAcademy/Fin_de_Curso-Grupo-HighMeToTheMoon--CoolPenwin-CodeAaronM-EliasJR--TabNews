import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { CardAuthor } from "../component/cardAuthor";
import { Link } from "react-router-dom";


export const Author = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getData()
	}, []);
	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<h1 className="text-danger">Authors</h1>
            <Link to="/">
						<h2>get back to home</h2>
					</Link>
			<Link to="/AddAuthor">
			<button>crear author</button>
					</Link>

			<div className="row d-flex flex-nowrap my-5" style={{ overflowX: "scroll" }}>
				{store.Authors.map((author, index) => <CardAuthor key={index}

					name={author.name}
					description={author.description}
					photo={author.photo}
					id={author.id}

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
		</div>
	);
};
