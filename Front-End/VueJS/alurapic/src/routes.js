import Home from "./components/Home";
import Register from "./components/Register";

const routes = [
  { path: "", name: "home", component: Home, title: "Home", menu: true },
  {
    path: "/register",
    name: "register",
    component: Register,
    title: "Register",
    menu: true
  },
  { path: "*", component: Home, menu: false }
];

export default routes;
