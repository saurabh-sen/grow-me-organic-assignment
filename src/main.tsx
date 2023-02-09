import App from './Routes/App'
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Details from "./Routes/Details"

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>something broke</div>,
  },
  {
    path: "/details",
    element: <Details />,
    errorElement: <div>something broke</div>,
  },
  {
    path: "*",
    element: <div>404</div>,    
  }
]);

// Render the app
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)