import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/pokedex/index",
    name: 'PokedexView',
    component: () => import('../views/pokedex/PokedexView.vue')
  },
  {
    path: "/pokedex/form",
    name: "PokedexForm",
    component: () => import("../components/pokedex/Create.vue")
  },
  {
    path: "/pokedex/edit",
    name: "PokedexEdit",
    component: () => import("../components/pokedex/Edit.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
