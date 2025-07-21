// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/coordinator'
  },
  {
    path: '/coordinator',
    name: 'Coordinator',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "coordinator" */ '@/views/Home.vue'),
      }
    ]
  },
  {
    path: '/roadmap',
    name: 'Roadmap',
    component: () => import('@/layouts/roadmap/Roadmap.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Roadmap.vue'),
      }
    ]
  },
  {
    path: '/obrigado',
    name: 'Obrigado',
    component: () => import('@/views/Obrigado.vue')
  },
  {
    path: '/obrigado-roadmap',
    name: 'ObrigadoRoadmap',
    component: () => import('@/views/ObrigadoRoadmap.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
