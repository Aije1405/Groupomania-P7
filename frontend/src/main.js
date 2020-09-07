import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'


const store = createStore()

createApp(App)
.use(store)
.mount('#app');

