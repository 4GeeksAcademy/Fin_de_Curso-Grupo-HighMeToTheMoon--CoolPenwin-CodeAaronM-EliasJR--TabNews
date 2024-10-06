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
import { EditCategory } from "./pages/editCategory";
import { CategoryDetails } from "./pages/categoryDetails";
import { AddAuthor } from "./pages/AddAuthor";
import { Author } from "./pages/Author";
import { AddNewspaper } from "./pages/AddNewspaper";
import { Newspaper } from "./pages/Newspaper";
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
                        <Route path="/category-details/:id" element={<CategoryDetails />} />
                        <Route element={<AddCategory />} path="/add-category"/>
                        <Route path="/edit-category/:id" element={<EditCategory />} />
                        <Route element={<Author />} path="/author"/>
                        <Route element={<AddAuthor />} path="/AddAuthor"/>
                        <Route element={<Newspaper />} path="/newspaper"/>
                        <Route element={<AddNewspaper />} path="/AddNewspaper"/>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
