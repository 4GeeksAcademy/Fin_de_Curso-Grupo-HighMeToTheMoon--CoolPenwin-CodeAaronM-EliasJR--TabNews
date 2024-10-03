import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Category } from "./pages/category";
import { AddCategory } from "./pages/addCategory"; // Importa AddCategory aquí
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { AddAuthor } from "./pages/AddAuthor";
import { Author } from "./pages/Author";
//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/"/>
                        <Route element={<Demo />} path="/demo"/>
                        <Route element={<Single />} path="/single/:theid"/>
                        <Route element={<Category />} path="/category"/>
                        <Route element={<AddCategory />} path="/add-category"/> {/* Añade esta línea */}
                        <Route element={<Author />} path="/author"/>
                        <Route element={<AddAuthor />} path="/AddAuthor"/>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
