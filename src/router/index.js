// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/coordinator'
  },
  {
    path: '/coordinator',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Coordinator',
        component: () => import(/* webpackChunkName: "coordinator" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/obrigado',
    name: 'Obrigado',
    component: () => import('@/views/Obrigado.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
