import { createApp } from 'vue'
import VueRouter from 'router'
import Accueil from '../views/accueil.vue'
import Signup from '../views/signup.vue'
import Login from '../views/login.vue'
import User from '../views/user.vue'
import Wall from '../views/wall.vue'

createApp(App)
.use(router)


const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/wall',
    name: 'Wall',
    component: Wall
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router 