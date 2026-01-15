import { createApp } from 'vue'
import router from '@/router'
import pinia from '@/store'
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// global css
import '@/assets/scss/main.scss'
import App from './App.vue'


const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
