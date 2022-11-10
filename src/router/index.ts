import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/views/Layout.vue"
import Login from "@/views/Login/Login.vue"
import Registration from "@/views/Login/Registration.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
    },{
      path: '/login',
      name: 'login',
      component: Login,
    },{
      path: '/registration',
      name: 'registration',
      component: Registration,
    },

  ]
})

export default router
