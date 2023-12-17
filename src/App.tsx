/* eslint-disable @typescript-eslint/no-unused-vars */
import {RouterProvider} from "react-router-dom";
import './App.css';
import {router} from "./routes/routes.tsx";
import {Flowbite} from 'flowbite-react';
import 'flowbite';

function App() {

  return (
    <>
      <Flowbite theme={{dark: true}} >
        {/* <DarkThemeToggle /> */}
        <RouterProvider router={router} />
      </Flowbite>
    </>
  )
}



export default App
