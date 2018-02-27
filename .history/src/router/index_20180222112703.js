import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/page/login'), 'login'));

Vue.use(Router)

const router = [
  {
    path:'/',
    components: login
  },
]
