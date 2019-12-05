import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path:'/login',
    name:'login',
    component:function () {
      return import('../views/Login.vue');
    }
  },
  {
    path:'/list',
    name:'list',
    component:function () {
      return import('../views/SearchResult.vue');
    }
  },
  {
    path:'/order',
    name:'order',
    component:function () {
      return import('../views/Order.vue');
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router
