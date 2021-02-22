import Vue from "vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import { ValidationProvider, extend } from "vee-validate";
import { required } from 'vee-validate/dist/rules'
import App from "./App.vue";
import routes from "./routes";
import "./directives/Transform";

Vue.use(VueResource);
Vue.http.options.root = "http://localhost:3000";
Vue.use(VueRouter);

const router = new VueRouter({ routes, mode: "history" });

extend('required', {...required, message: 'This field is required' });

Vue.component('validation-provider', ValidationProvider);

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
