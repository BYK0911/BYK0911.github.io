import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/main.scss'
import 'element-plus/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import ElementPlus from 'element-plus'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
