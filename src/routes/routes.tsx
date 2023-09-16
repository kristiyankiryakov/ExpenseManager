import {Link} from "react-router-dom";
import Home from "../Components/Home";
import {Outlet, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";

const Root = () => {
    return <>
        <Outlet />
        {/* change to nav component */}
        <div>
            <Link to="/" >Home</Link>
        </div>
    </>
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} >
            <Route index element={<Home />} />
        </Route>
    )
)

