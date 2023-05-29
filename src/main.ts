import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSocketIO from 'vue-3-socket.io'

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

const socketIO = new VueSocketIO({
    debug: import.meta.env.DEV,
    connection: import.meta.env.VITE_SOCKET_URL + ':' + import.meta.env.VITE_SOCKET_PORT,
    options: {
        // @ts-ignore
        autoConnect: false
    } //Optional options
});

app.use(createPinia())
app.use(socketIO)
app.use(ElementPlus)
app.use(router)

app.mount('#app')
