import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CardArticle } from "../component/cardArticle";
import { Link } from "react-router-dom";

export const Article = () => {
	const { store, actions } = useContext(Context);
	
	useEffect(() => {
		actions.getDataArticle();
	}, []);
	
	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<h1 className="text-danger">Articles</h1>
			
			<Link to="/">
				<h2>Get back to home</h2>
			</Link>
			
			<Link to="/AddArticle">
				<button>Create Article</button>
			</Link>

			<div className="row d-flex flex-nowrap my-5" style={{ overflowX: "scroll" }}>
				{store.Articles.map((article, index) => (
					<CardArticle
						key={index}
						title={article.title}
						content={article.content}
						image={article.image}
						published_date={article.published_date}
						source={article.source}
						link={article.link}
						author={article.author}
						newspaper={article.newspaper}
						category={article.category}
						id={article.id}
					/>
				))}
			</div>

			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your Python backend is running)..." }
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
