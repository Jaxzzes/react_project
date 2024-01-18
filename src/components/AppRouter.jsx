import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
// import { MyRoutes } from "../router/index.js";
import Home from "../pages/Home";
import Inventory from "../pages/Inventory"
import Services from "../pages/Services"
import About from "../pages/About";
import Contact from "../pages/Contact"
import Login from "../pages/Login";

function AppRouter() {

    const routes = [
        { path: '/home', component: Home, exact: true },
        { path: '/inventory', component: Inventory, exact: true },
        { path: '/services', component: Services, exact: true },
        { path: '/about', component: About, exact: true },
        { path: '/contact', component: Contact, exact: true },
        { path: '/login', component: Login, exact: true },
        // {path: '/posts/:id', component: PostIdPage, exact: true},
    ];

    return (
        <Routes>
            {routes.map(route => <Route
                key={route.path}
                element={<route.component />}
                path={route.path}
                exact={route.exact} />
            )}
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
}

export default AppRouter;