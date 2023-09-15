import { createRouter, createWebHashHistory } from 'vue-router'
import layout from "@/layout/index.vue"
 
const routes = [
    { 
      path: '/',
      redirect: '/home',
      component: layout,
      children:[
        { path: '/home', component: () => import('@/views/Home/Home.vue'),hidden:true },
        { path: '/about', component: () => import('@/views/About/About.vue'),hidden:true },
        {
          path:'sassStarSky',
          name:'SassStarSky',
          component: ()=>import('@/views/components/sassStarSky.vue'),
        },
        // {
        //   path:'particles',
        //   name:'Particles',
        //   component: ()=>import('@/views/components/ParticlesView/particles.vue'),
        // },
        {
          path:'upload',
          name:'Upload',
          component: ()=>import('@/views/components/uploadView/uploadView.vue'),
        }
      ]
    }
]
 
export default createRouter({
  history: createWebHashHistory(),
  routes
})