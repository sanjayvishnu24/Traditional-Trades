import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Customer from "./components/Customer";

export const Dashboard = lazy(() => import("./Admin"));
 
export const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet></Outlet>
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<>cdsssa</>}>
            <Customer></Customer>
          </Suspense>
        ),
        
        
      },
    ],
  },
]);