import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { CardArticle } from "../component/cardArticle";

export const AddArticle = () => {
    const { store, actions } = useContext(Context);

    // Estados locales para manejar datos de autores, periódicos y categorías
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [published_date, setPublishedDate] = useState("");
    const [source, setSource] = useState("");
    const [link, setLink] = useState("");
    const [author_id, setAuthor_id] = useState("");
    const [newspaper_id, setNewspaper_id] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [id, setId] = useState(null);

    // Efecto para cargar los datos de edición desde store.temp
    useEffect(() => {
        if (store.temp && store.temp.id) {
            setTitle(store.temp.title);
            setContent(store.temp.content);
            setImage(store.temp.image);
            setPublishedDate(store.temp.published_date);
            setSource(store.temp.source);
            setLink(store.temp.link);
            setAuthor_id(store.temp.author_id);
            setNewspaper_id(store.temp.newspaper);
            setCategory_id(store.temp.category);
            setId(store.temp.id); // Setea el id cuando editas un artículo
        }
    }, [store.temp]);

    useEffect(() => {
        actions.getData(); 
        actions.loadCategories();
        actions.getNewspaper();
        actions.getDataArticle();
    }, []);

    const handleSave = (e) => {
        e.preventDefault();

        const newArticle = {
            title,
            content,
            image,
            published_date,
            source,
            link,
            author_id,
            newspaper_id,
            category_id,
        };
        console.log(newArticle)
        // Si el ID existe, editamos el artículo, si no, creamos uno nuevo
        if (id) {
            actions.changeArticle({ ...newArticle, id });
        } else {
            actions.addArticle(newArticle);
        }

        // Limpiar el formulario después de guardar
        setTitle("");
        setContent("");
        setImage("");
        setPublishedDate("");
        setSource("");
        setLink("");
        setAuthor_id("");
        setNewspaper_id("");
        setCategory_id("");
        setId(null); // Limpiar el ID para evitar conflictos
    };

    return (
        <div className="text-center mt-5">
            <h1>{id ? "Edit Article" : "Add New Article"}</h1>

            <form>
                {/* Title */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Content */}
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                {/* Image URL */}
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>

                {/* Published Date */}
                <div className="mb-3">
                    <label htmlFor="published_date" className="form-label">Published Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="published_date"
                        value={published_date}
                        onChange={(e) => setPublishedDate(e.target.value)}
                    />
                </div>

                {/* Source */}
                <div className="mb-3">
                    <label htmlFor="source" className="form-label">Source</label>
                    <input
                        type="text"
                        className="form-control"
                        id="source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                    />
                </div>

                {/* Link */}
                <div className="mb-3">
                    <label htmlFor="link" className="form-label">Link</label>
                    <input
                        type="text"
                        className="form-control"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>

                {/* Author */}
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle btn-warning" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            author
                        </a>
                        <ul className="dropdown-menu">
                            {store.Authors.map((auth, index) => (
                                <li key={index}>
                                    <p
                                        className="dropdown-item mb-1"
                                        href="#"
                                        onClick={() => setAuthor_id(auth.id)}
                                    >
                                        {auth.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newspaper */}
                <div className="mb-3">
                    <label htmlFor="newspaper" className="form-label">Newspaper</label>
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle btn-warning" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            newspaper
                        </a>
                        <ul className="dropdown-menu">
                            {store.Newspapers.map((news, index) => (
                                <li key={index}>
                                    <p
                                        className="dropdown-item mb-1"
                                        href="#"
                                        onClick={() => setNewspaper_id(news.id)}
                                    >
                                        {news.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle btn-warning" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            categories
                        </a>
                        <ul className="dropdown-menu">
                            {store.categories.map((cat, index) => (
                                <li key={index}>
                                    <p
                                        className="dropdown-item mb-1"
                                        href="#"
                                        onClick={() => setCategory_id(cat.id)}
                                    >
                                        {cat.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button className="btn btn-primary" onClick={handleSave}>
                    {id ? "Update" : "Save"}
                </button>
            </form>

            <Link to="/">
                <h2>Get back to home</h2>
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
                    author={article.author.name}
                    newspaper={article.newspaper.name}
                    category={article.category.name}
                    id={article.id}
                />
                ))}
            </div>

            <div className="alert alert-info">
                {store.message || "Loading message from the backend (make sure your Python backend is running)..."}
            </div>
        </div>
    );
};
