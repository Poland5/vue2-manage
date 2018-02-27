import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/lo')), 'lo');


const routes = [
  {
    path:'/',
    component: lo
  },
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
