import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Repositories from "../views/Repositories.vue";
import CheckLogin from "../views/CheckLogin.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/dashboard", name: "CheckLogin", component: CheckLogin },
  { path: "/repositories", name: "Repositories", component: Repositories },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
