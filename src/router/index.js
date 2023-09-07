import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/search/",
    name: "search_no_param",
    component: () => import("../views/SearchPage.vue"),
  },
  {
    path: "/search/:nickname",
    name: "search",
    component: () => import("../views/SearchPage.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("../views/ErrorPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "error" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
