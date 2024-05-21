import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import userStore from './stores/userStore.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App).use(router).use(ElementPlus).use(userStore)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')