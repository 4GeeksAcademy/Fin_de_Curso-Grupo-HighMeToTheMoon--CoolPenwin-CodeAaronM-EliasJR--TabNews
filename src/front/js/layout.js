import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home"; // Asegúrate de tener tu componente Home
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Category } from "./pages/category";
import { AddCategory } from "./pages/addCategory";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { EditCategory } from "./pages/editCategory";
import { CategoryDetails } from "./pages/categoryDetails";
import { AddAuthor } from "./pages/AddAuthor";
import Register from "./pages/register";
import Login from "./pages/login";
import { Author } from "./pages/Author";
import { HomePage } from "./pages/homePage"; // Cambié esto para que coincida con el nombre correcto
import { ProtectedRoute } from "./component/protectedRoute";
import Logout from "./pages/logout";
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
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Category />} path="/category" />
                        <Route path="/category-details/:id" element={<CategoryDetails />} />
                        <Route element={<AddCategory />} path="/add-category" />
                        <Route path="/edit-category/:id" element={<EditCategory />} />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<ProtectedRoute />} path="/homePage">
                            <Route element={<HomePage />} /> {/* Asegúrate de que HomePage está correctamente importado */}
                        </Route>
                        <Route element={<ProtectedRoute />} path="/logout"> 
                            <Route element={<Logout />} />
                        </Route>
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
