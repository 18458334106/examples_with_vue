import { createRouter, createWebHistory } from 'vue-router'
import AppMain from "@/layout/AppMain/AppMain.vue"
import { getExamples } from '@/api/examples'
import { ref } from 'vue'
import type{ Router } from 'vue-router'
export let asyncRoutes = ref([] as any[])
let router:Router;
const routes = [
  {
    path: '/',
    redirect: '/home',
    name:'all',
    component: AppMain,
    children:[
      { path: '/home', component: () => import('@/views/Home/Home.vue'), hidden:true,name:'Home' },
      { path: '/about', component: () => import('@/views/About/About.vue'), hidden:true,name:'About' },
      { path: '/msg', component: () => import('@/views/Message/Message.vue'), hidden:true,name:'Msg' },
      { path: '/chat', component: () => import('@/views/Chat/Chat.vue'), hidden:true,name:'Chat' },
    ]
  }
]

router = createRouter({
  history: createWebHistory(),
  routes
})

const getAsyncRoutes = async () => {
  const data = await getExamples()
  data.forEach((item:any) => {
    let obj = {
      path:item.path,
      name:item.name,
      component:() => import(`@/views/components/${item.path}.vue`),
      hidden:false
    }
    routes[0].children.push(obj)
    router.addRoute('all',obj)
    asyncRoutes.value.push(obj)
  });
}

getAsyncRoutes()

export default router