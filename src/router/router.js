import { createRouter, createWebHistory } from "vue-router";

// Game related components
import GamePage from "../pages/GamePage.vue"
import NotFound from "../pages/NotFoundPage.vue";

// Define route groups
const gameRoutes = [
  {
    path: "/",
    name: "GamePage",
    component: GamePage,
    meta: {
      title: "Tetris Game"
    }
  }
];

// System routes
const systemRoutes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "Page Not Found"
    }
  }
];

const routes = [...gameRoutes, ...systemRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
