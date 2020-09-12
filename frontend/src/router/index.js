import Vue from 'vue'
import VueRouter from 'vue-router'

import Signup from '../views/signup.vue'
import Login from '../views/login.vue'
import User from '../views/user.vue'
import Wall from '../views/wall.vue'
import store from '../store/index.js'



Vue.use(VueRouter)


const routes = [

  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { requiresVisitor: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { requiresAuth: true }
  },
  {
    path: '/wall',
    name: 'Wall',
    component: Wall,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLoggedIn) {
      next({
        name: 'Wall',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
})

export default router 