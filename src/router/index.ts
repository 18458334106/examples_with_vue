import { createRouter, createWebHashHistory } from 'vue-router'
import layout from "@/layout/index.vue"
 
const routes = [
    { 
      path: '/',
      component: layout,
      children:[
        { path: '/home', component: () => import('@/views/Home/Home.vue') },
        { path: '/about', component: () => import('@/views/About/About.vue') },
      ]
    }
]
 
export default createRouter({
  history: createWebHashHistory(),
  routes
})