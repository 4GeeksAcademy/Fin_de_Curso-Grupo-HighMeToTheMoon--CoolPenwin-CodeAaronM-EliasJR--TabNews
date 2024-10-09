import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { UserCategories } from "./userCategory";
import { CardArticle } from "../component/cardArticle";


export const Home = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getDataArticle();
	}, []);
	return (
		<div className="text-center mt-5">
			<h1 className="text-danger">HOMEE</h1>
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
						author={article.author.name}
						newspaper={article.newspaper.name}
						category={article.category.name}
						id={article.id}
					/>
				))}
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
