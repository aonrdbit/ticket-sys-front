import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import fr from "element-ui/src/locale/lang/fr";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
    path:"/register",
    name:"register",
    component:function () {
      return import('../views/Register');
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
  },
  {
    path:'/user',
    name:'user',
    component:function () {
      return import('../views/User.vue');
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
    if (to.path==='/order' && (token === null || token === '')) {
      next('/login');
    } else {
      next();
    }
  }
});
export default router
