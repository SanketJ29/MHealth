import React from "react";
import Home from "./pages/Home";
import Audit from "./pages/Audit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Prediction from "./pages/Prediction";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/audit",
      element: <Audit/>,
    },
    {
      path: "/prediction",
      element: <Prediction/>,
    }
  ]);
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};
export default App;