import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const routeData = [
  {
    path: "/",
    element: <Register />,
    children: [],
    header: "register",
    location: "/register",
  },
  {
    path: "/login",
    element: <Login />,
    children: [],
    header: "login",
    location: "/login",
  },
  {
    path: "/home",
    element: <Home />,
    children: [],
    header: "home",
    location: "/home",
  },
];
