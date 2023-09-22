/* eslint-disable react-refresh/only-export-components */
import {Outlet, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import Home from "../Components/Home";
import {Link} from "react-router-dom";
import {AiOutlineHome} from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddExpense from "../Components/AddExpense";

const Root = () => {
    return <div className="flex flex-col h-screen justify-between bg-slate-900 ">
        <Outlet />

        <nav>
            <div className={`flex bg-slate-800 p-2 w-full justify-around rounded-t-xl`}>
                <Link to="/"  ><AiOutlineHome size={30} color={"white"} /></Link>
                <Link to="/add" ><IoIosAddCircleOutline size={32} color={"white"} /></Link>
                <AiOutlineHome size={30} color={"white"} />
                <AiOutlineHome size={30} color={"white"} />
            </div>
        </nav>
    </div>


}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} >
            <Route index element={<Home />} />
            <Route path="/add" element={<AddExpense />} />
        </Route>
    )
)

