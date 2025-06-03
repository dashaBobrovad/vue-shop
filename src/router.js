import { createWebHistory, createRouter } from 'vue-router';
import Home from './pages/Home.vue';
import Favorites from './pages/Favorites.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/fav', component: Favorites },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
