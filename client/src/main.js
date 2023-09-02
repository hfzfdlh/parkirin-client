import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const pinia = createPinia()
const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId: '47275413988-tmnna2feu51be3c1jbojven5oue06s7m.apps.googleusercontent.com'
  })
app.use(VueSweetalert2);

pinia.use(({ store }) => {
    store.$router = markRaw(router)
  })

app.use(pinia)
app.use(router)

app.mount('#app')
