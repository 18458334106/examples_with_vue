import { createRouter, createWebHistory } from 'vue-router'
import AppMain from "@/layout/AppMain/AppMain.vue"
 
const routes = [
    {
      path: '/',
      redirect: '/home',
      component: AppMain,
      children:[
        { path: '/home', component: () => import('@/views/Home/Home.vue'), hidden:true },
        { path: '/about', component: () => import('@/views/About/About.vue'), hidden:true },
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
        },
        {
          path:'cssFilter',
          name:'CSS滤镜效果',
          component: ()=>import('@/views/components/cssFilter.vue')
        },
        {
          path:'imgColorThief',
          name:'图片调色盘',
          component: ()=>import('@/views/components/imgColorThief.vue')
        },
        {
          path:'waterFull',
          name:'纯CSS瀑布流布局',
          component: ()=>import('@/views/components/waterFull.vue')
        }
      ]
    }
]
 
export default createRouter({
  history: createWebHistory(),
  routes
})