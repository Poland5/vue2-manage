import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/components/HelloWorld')), 'HelloWorld');


const routes = [
  {
    path:'/',
    component: HelloWorld
  },
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
