/* eslint-disable react-refresh/only-export-components */
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {Outlet, Route, createBrowserRouter, createRoutesFromElements, useLocation} from "react-router-dom";
import {Index as IncomeExpense} from '../Pages/IncomeExpense/Index.tsx';
import {Index as Home} from "../Pages/Home/Index.tsx";
import {Index as Details} from "../Pages/Details/Index.tsx";
import {Index as Profile} from "../Pages/Profile/Index.tsx";
import Login from "../Components/Login.tsx";
import Protected from "../Components/Protected.tsx";
import Register from "../Components/Register.tsx";
import Navigation from '../Components/Navigation.tsx';
import useUserStore from '../stores/userStore.tsx';
import Cookies from 'js-cookie'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Root = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const {user} = useUserStore();
    const token = Cookies.get('jwt');
    return (
        <div className={`flex flex-col h-screen justify-between ${isHomePage ? 'bg-cover bg-home-background' : 'bg-slate-900'}`}>
            <Outlet />
            {(user && token) && < Navigation />}
        </div>
    )
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<ThemeProvider theme={darkTheme} ><Root /></ThemeProvider>} >
            <Route index element={<Protected><Home /></Protected>} />
            <Route path="/add" element={<Protected><IncomeExpense /></Protected>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details" element={<Protected><Details /></Protected>} />
            <Route path="/profile" element={<Protected><Profile /></Protected>} />
            <Route path="*" element={<h1>Wrong path component</h1>} />
        </Route>
    )
)

