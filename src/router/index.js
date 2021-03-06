import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const addShops = r => require.ensure([], () => r(require('@/page/addShops')), 'addShops');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
  {
    path:'/',
    component: login
  },
  {
    path: '/manage',
    component: manage,
    name: '',
    children:[{
      path: '',
      component: home,
      meta: [],
    },{
      path: '/userList',
      component: userList,
      meta: ["数据管理","用户列表"],
    },{
      path: '/foodList',
      component: foodList,
      meta: ["数据管理","食物列表"],
    },{
      path: '/shopList',
      component: shopList,
      meta: ["数据管理","商家列表"],
    },{
      path: '/addGoods',
      component: addGoods,
      meta: ["添加数据","添加商品"],
    },{
      path: '/orderList',
      component: orderList,
      meta: ["数据管理","订单列表"],
    },{
      path: '/adminList',
      component: adminList,
      meta: ["数据管理","管理员列表"],
    },{
      path: '/addShops',
      component: addShops,
      meta: ["添加数据","添加商铺"],
    },{
      path: '/visitor',
      component: visitor,
      meta: ["图表","用户分布"]
    },{
      path: '/vueEdit',
      component: vueEdit,
      meta: ["编辑","文本编辑"]
    },{
      path: '/adminSet',
      component: adminSet,
      meta: ["设置","管理员设置"]
    },{
      path: '/explain',
      component: explain,
      meta: ["说明","说明"]
    }]
  }
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
