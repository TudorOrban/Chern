import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/globals.css'
import AuthService from './services/auth.service'

const app = createApp(App);

app.config.globalProperties.$authService = new AuthService();

app.use(store)
   .use(router)
   .mount('#app')
