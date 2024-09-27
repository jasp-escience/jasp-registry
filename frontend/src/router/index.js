import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Repositories from "../views/Repositories.vue";
import Profile from "../views/Profile.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/repositories", name: "Repositories", component: Repositories },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
