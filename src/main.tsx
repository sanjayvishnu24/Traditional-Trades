 
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router';

import "react-toastify/dist/ReactToastify.css";
import { routes } from './Router';
import { ToastContainer } from "react-toastify";
console.log(window.location.pathname)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routes}>
    
  </RouterProvider>
);
