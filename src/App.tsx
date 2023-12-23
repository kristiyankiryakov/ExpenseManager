/* eslint-disable @typescript-eslint/no-unused-vars */
import {RouterProvider} from "react-router-dom";
import './App.css';
import {router} from "./routes/routes.tsx";
import {Flowbite} from 'flowbite-react';
import 'flowbite';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Flowbite theme={{dark: true}} >
          {/* <DarkThemeToggle /> */}
          <RouterProvider router={router} />
        </Flowbite>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}



export default App
