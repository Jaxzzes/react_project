import Home from "../pages/Home";
import Inventory from "../pages/Inventory"
import Services from "../pages/Services"
import About from "../pages/About";
import Contact from "../pages/Contact"
import Login from "../pages/Login";

export const MyRoutes = [
    {path: '/', component: Home, exact: true},
    {path: '/inventory', component: Inventory, exact: true},
    {path: '/services', component: Services, exact: true},
    {path: '/about', component: About, exact: true},
    {path: '/contact', component: Contact, exact: true},
    {path: '/login', component: Login, exact: true},
    // {path: '/posts/:id', component: PostIdPage, exact: true},
]

