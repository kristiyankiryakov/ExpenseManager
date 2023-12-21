/* eslint-disable react-refresh/only-export-components */
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {Outlet, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import {Index as IncomeExpense} from '../Pages/IncomeExpense/Index';
import {Index as Home} from '../Pages/Home/Index';
import {Index as Details} from '../Pages/Details/Index';
import Login from "../Components/Login";
import Protected from "../Components/Protected";
import Register from "../Components/Register";
import {UserProvider} from '../context/userContext';
import Navigation from '../Components/Navigation';
import {Index as Profile} from '../Pages/Profile/Index';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Root = () => {
    return (
        <div className="flex flex-col h-screen justify-between bg-slate-900 ">
            <Outlet />
            <Navigation />
        </div>
    )
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<UserProvider><Root /></UserProvider>} >
            <Route index element={<ThemeProvider theme={darkTheme} > <Protected><Home /></Protected> </ThemeProvider>} />
            <Route path="/add" element={<Protected><IncomeExpense /></Protected>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details" element={<Protected><Details /></Protected>} />
            <Route path="/profile" element={<Protected><Profile /></Protected>} />
            <Route path="*" element={<h1>Wrong path component</h1>} />
        </Route>
    )
)

