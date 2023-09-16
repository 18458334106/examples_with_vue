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
          name:'Sass星空',
          component: ()=>import('@/views/components/sassStarSky.vue'),
        },
        {
          path:'particles',
          name:'Particles',
          component: ()=>import('@/views/components/ParticlesView/particles.vue'),
        },
        {
          path:'upload',
          name:'七牛云文件上传',
          component: ()=>import('@/views/components/uploadView/uploadView.vue'),
        },
        {
          path:'svgAnimation',
          name:'图标动画',
          component: ()=>import('@/views/components/svgAnimation.vue'),
        },
        {
          path:'gridAnimation',
          name:'宫格hover动画',
          component: ()=>import('@/views/components/gridAnimation.vue'),
        }
      ]
    }
]
 
export default createRouter({
  history: createWebHashHistory(),
  routes
})