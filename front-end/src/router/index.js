import { createRouter, createWebHistory } from 'vue-router'
import indexVue from "@/views/indexVue";

const routes = [
  {
    path: '/',
    name: 'index',
    component: indexVue,
    meta: { title: 'Stopper - best stop service in Estonia' }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
