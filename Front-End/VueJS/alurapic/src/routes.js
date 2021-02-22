import Home from "./components/Home";

const Register = () => System.import("./components/Register");

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
