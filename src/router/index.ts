import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "about" */ '../views/about/index.vue')
  },
  {
    path: '/doc',
    component: () => import(/* webpackChunkName: "doc" */ '../views/doc/index.vue')
  },
  {
    path: '/doc/:id',
    component: () => import(/* webpackChunkName: "doc-reader" */ '../views/doc-reader/index.vue')
  },
  {
    path: '/doc/:id/edit',
    component: () => import(/* webpackChunkName: "doc-editor" */ '../views/doc-editor/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
