import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: () => import('../views/accueil.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/user.vue')
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/posts.vue')
  }
]

const router = new VueRouter({ routes })

export default router