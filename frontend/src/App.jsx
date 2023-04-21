import React from "react";
import Home from "./pages/Home";
import Audit from "./pages/Audit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/audit",
      element: <Audit/>,
    }
  ]);
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};
export default App;