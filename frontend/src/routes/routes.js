//Layouts
import LayoutWeb from '../layouts/LayoutWeb';
import LayoutAdmin from '../layouts/LayoutAdmin';

//Admin Pages
import AdminHome from '../pages/Admin';
import AdminLogin from '../pages/Admin/LogIn';
import AdminUsers from '../pages/Admin/Users';
import AdminMenu from '../pages/Admin/Menu';
import AdminCursos from '../pages/Admin/Cursos';
import AdminPortfolio from '../pages/Admin/Portfolio';
import AdminBlog from '../pages/Admin/Blog';


//Pages
import Home from '../pages/Home';
import Cursos from '../pages/Cursos';
import Contact from '../pages/Contact';
import Portfolio from '../pages/Portfolio';
import Blog from '../pages/Blog';

//Error404

const routes = [
    {
        path: '/admin',
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: '/admin',
                component: AdminHome,
                exact: true
            },
            {
                path: '/admin/login',
                component: AdminLogin,
                exact: true
            },
            {
                path: '/admin/users',
                component: AdminUsers,
                exact: true
            },
            {
                path: '/admin/menu',
                component: AdminMenu,
                exact: true
            },
            {
                path:'/admin/cursos',
                component: AdminCursos,
                exact: true
            },
            {
                path: '/admin/portfolio',
                component: AdminPortfolio,
                exact: true
            },
            {
                path: '/admin/blog',
                component: AdminBlog,
                exact: true
            }
        ]
    },
    {
        path: '/',
        component: LayoutWeb,
        exact: false,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true
            },
            {
                path: '/courses',
                component: Cursos,
                exact: true
            },
            {
                path: '/portfolio',
                component: Portfolio,
                exact: true
            },
            {
                path: '/blog',
                component: Blog,
                exact: true
            },
            {
                path: "/blog/:url",
                component: Blog,
                exact: true
            },
            {
                path: '/contact',
                component: Contact,
                exact: true
            }
        ]
    }
];

export default routes;