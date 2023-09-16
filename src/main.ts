import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from 'particles.vue3'
createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(Particles)
    .mount('#app')
