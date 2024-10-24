import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { CardNewspaper } from "../component/cardNewspaper";
import { Link } from "react-router-dom";


export const Newspaper = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getNewspaper()
	}, []);
	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<h1 className="text-danger">Newspapers</h1>
            <Link to="/administratorHomePage">
						<h2>get back to home</h2>
					</Link>
			<Link to="/AddNewspaper">
			<button>crear newspaper</button>
					</Link>

			<div className="row d-flex flex-nowrap my-5" style={{ overflowX: "scroll" }}>
				{store.Newspapers.map((newspaper, index) => <CardNewspaper key={index}

					name={newspaper.name}
					description={newspaper.description}
					logo={newspaper.logo}
					link={newspaper.link}
					id={newspaper.id}

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
