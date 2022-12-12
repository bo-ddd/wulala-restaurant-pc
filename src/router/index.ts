import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/views/Layout.vue"
import Login from "@/views/Login/Login.vue"
import Home from "@/views/HomePage.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/shoppercar',
          name: 'shoppercar',
          component: () => import("@/views/ShopperCar/shopperCar.vue")
        }, {
          path: '/',
          name: 'home',
          component: Home,
        }, {
          path: '/mall',
          name: 'mall',
          component: () => import("@/views/Mall/MallPage.vue"),
        },
        {
          path: '/personal',
          name: 'personal',
          component: () => import("@/views/personal/PersonalView.vue"),
          children:[
            {
              path: '/mineview',
              name: 'mineview',
              component: () => import("@/views/mine/MineView.vue"),
            },
            {
              path: '/orderview',
              name: 'orderview',
              component: () => import("@/views/order/OrderView.vue"),
            },
            {
              path: '/updatePersonalInfo',
              name: 'updatePersonalInfo',
              component: () => import("@/views/updateInformation/UpdatePersonalInfo.vue"),
            },
            {
              path: '/uploadAvatar',
              name: 'uploadAvatar',
              component: () => import("@/views/updateInformation/UploadAvatar.vue"),
            },
            
          ]
        },
        {
          path:'/settlement',
          name:'settlement',
          component:()=>import("@/views/ShopperCar/Settlement.vue")
        }, {
          path: '/classify',
          name: 'classify',
          component: () => import("@/views/classify/Classify.vue"),
        }, {
          path: '/shoppingDetalis',
          name: 'shoppingDetalis',
          component: () => import("@/views/shoppingDetails/ShoppingDetalis.vue"),
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: Login,
    }

  ]
})

export default router
