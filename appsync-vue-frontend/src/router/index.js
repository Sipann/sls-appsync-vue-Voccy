import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '@/views/Dashboard.vue'
import ListWords from '@/views/ListWords.vue'
import UserPreferences from '@/views/UserPreferences.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: false, unAuthenticatedOnly: false },
  },
  {
    path: '/auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth.vue'),
    children: [
      {
        path: 'signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "auth" */ '@/components/Auth/Signup.vue'),
        meta: { requiresAuth: false, unAuthenticatedOnly: true },
      },
      {
        path: 'confirmSignup',
        name: 'confirmSignup',
        component: () => import(/* webpackChunkName: "auth" */ '@/components/Auth/ConfirmSignup.vue'),
        meta: { requiresAuth: false, unAuthenticatedOnly: true },
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => import(/* webpackChunkName: "auth" */ '@/components/Auth/Signin.vue'),
        meta: { requiresAuth: false, unAuthenticatedOnly: true },
      },
      {
        path: 'resetPassword',
        name: 'resetPassword',
        component: () => import(/* webpackChunkName: "auth" */ '@/components/Auth/ResetPassword.vue'),
        meta: { requiresAuth: false, unAuthenticatedOnly: true },
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, unAuthenticatedOnly: false },
  },
  {
    path: '/list',
    name: 'list',
    component: ListWords,
    meta: { requiresAuth: true, unAuthenticatedOnly: false },
  },
  {
    path: '/preferences',
    name: 'preferences',
    component: UserPreferences,
    meta: { requiresAuth: true, unAuthenticatedOnly: false }, 
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser();
      next();
    } catch (e) {
      next({ name: 'signin' });
    }
  }
  next();
});

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.unAuthenticatedOnly)) {
    try {
      await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser();
      next({ name: 'dashboard' });
    } catch (e) {
      next();
    }
  }
  next();
});

export default router
