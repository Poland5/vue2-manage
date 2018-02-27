import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/page/login'), 'login'));

Vue.use(Router)

const routes = [
  {
    path:'/',
    components: login
  },
]

//重新定向
export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})
