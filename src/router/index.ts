import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/views/Layout.vue"
import Login from "@/views/Login/Login.vue"
// import Registration from "@/views/Login/Registration.vue"
import Home from "@/views/HomePage.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      children:[
        {
          path: '/home',
          name: 'home',
          component: Home,
        }, {
          path: '/mall',
          name: 'mall',
          component: () => import("@/views/Mall/MallPage.vue"),
        },
      ]
    },{
      path: '/login',
      name: 'login',
      component: Login,
    }

  ]
})

export default router
