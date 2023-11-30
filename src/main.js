import './assets/main.scss'

import { createApp } from 'vue'
import pinia from '@/stores/index'

import App from './App.vue'
import router from './router'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

app.use(pinia)
app.use(router)

app.mount('#app')
