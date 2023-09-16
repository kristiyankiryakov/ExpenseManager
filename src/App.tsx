/* eslint-disable @typescript-eslint/no-unused-vars */
import {RouterProvider} from "react-router-dom";
import './App.css';
import {router} from "./routes/routes.tsx";

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}



export default App
