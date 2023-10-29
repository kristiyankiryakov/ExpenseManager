/* eslint-disable react-refresh/only-export-components */
import {Outlet, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import Home from "../Components/Home";
import {Link} from "react-router-dom";
import AddExpense from "../Components/AddExpense";
import Login from "../Components/Login";
import Protected from "../Components/Protected";
import Register from "../Components/Register";
import {UserProvider} from '../context/userContext';
import Details from "../Components/Details";
import {faHouse, faChartSimple, faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const Root = () => {
    return <div className="flex flex-col h-screen justify-between bg-slate-900 ">
        <Outlet />

        <nav className="bg-slate-900" >
            <div className={`flex bg-slate-800 p-2 w-full justify-around rounded-t-xl`}>
                <Link to="/"  ><FontAwesomeIcon icon={faHouse} color="white" size="2xl" /></Link>
                <Link to="/add" ><FontAwesomeIcon icon={faCirclePlus} color="white" size="2xl" /></Link>
                <Link to="/details" ><FontAwesomeIcon icon={faChartSimple} color="white" size="2xl" /></Link>
                <Link to="/details" ><FontAwesomeIcon icon={faChartSimple} color="white" size="2xl" /></Link>
            </div>
        </nav>
    </div>


}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<UserProvider><Root /></UserProvider>} >
            <Route index element={<Protected><Home /></Protected>} />
            <Route path="/add" element={<Protected><AddExpense /></Protected>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details" element={<Protected><Details /></Protected>} />
        </Route>
    )
)

