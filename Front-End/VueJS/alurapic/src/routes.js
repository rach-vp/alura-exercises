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
  {
    path: "/register/:id",
    name: "edit",
    component: Register,
    title: "Edition",
    menu: false
  },
  { path: "*", component: Home, menu: false }
];

export default routes;
