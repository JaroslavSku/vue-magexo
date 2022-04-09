import { createRouter, createWebHistory } from "vue-router";
import Products from "./components/Products.vue";
import Home from "./components/Home.vue";
const routes = [
  { path: "/", component: Home },
  {
    name: "Products",
    path: "/products/:name",
    component: Products,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
