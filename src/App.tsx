/* eslint-disable @typescript-eslint/no-unused-vars */
import {Link, Outlet, Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import Home from "./Components/Home";
import './App.css';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} >
        <Route index element={<Home />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

const Root = () => {
  return <>
    <Outlet />
    {/* change to nav component */}
    <div>
      <Link to="/" >Home</Link>
    </div>
  </>
}

export default App
