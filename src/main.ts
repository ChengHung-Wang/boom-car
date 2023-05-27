import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import App from '@/App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
