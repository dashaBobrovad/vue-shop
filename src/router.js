import { createWebHistory, createRouter } from 'vue-router';
import Home from './pages/Home.vue';
import Favorites from './pages/Favorites.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/fav', name: 'favorite', component: Favorites },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
