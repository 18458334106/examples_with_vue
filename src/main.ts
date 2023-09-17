import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from 'particles.vue3'
import { createPinia } from 'pinia'

import './permission.ts'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(Particles)
    .use(createPinia())
    .mount('#app')
