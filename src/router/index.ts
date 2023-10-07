import { createRouter, createWebHashHistory } from 'vue-router'
import layout from "@/layout/index.vue"
import AppMain from "@/layout/AppMain/AppMain.vue"
const routes = [
    {
      path: '/',
      redirect: '/main',
      component: layout,
      children:[
        {
          path: '/main',
          component: AppMain,
          redirect: '/main/home',
          hidden:true,
          children:[
            {
              path:'home',
              hidden:true,
              component: ()=>import('@/views/Home/Home.vue'),
            },
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
        },
        { path: '/about', component: () => import('@/views/About/About.vue'),hidden:true }
      ]
    }
]
 
export default createRouter({
  history: createWebHashHistory(),
  routes
})