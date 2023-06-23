import { createApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import App from '@/App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import i18n from './services/i18n'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

const app = createApp(App)

// element-plus icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.use(createPinia());
app.use(ElementPlus);
app.use(i18n);
app.use(router);

app.mount('#app')
