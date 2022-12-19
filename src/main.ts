import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// createApp(App).use(store).use(router).mount('#app')
const app = createApp(App).use(store)
app.use(router)
app.use(VueAxios,axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount("#app")
