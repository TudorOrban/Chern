import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/globals.css'
import AuthService from './services/auth.service'
import { loadFAIcons } from './fa.icons.loading'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

loadFAIcons();

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.config.globalProperties.$authService = new AuthService();

app.use(store)
   .use(router)
   .mount('#app')
