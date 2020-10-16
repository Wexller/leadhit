import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'auth',
    meta: {layout: 'empty'},
    component: () => import('./pages/Auth.vue')
  },
  {
    path: '/analytics',
    name: 'analytics',
    meta: {layout: 'empty'},
    component: () => import('./pages/Analytics.vue')
  },
]

const router = new  Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // Проверка наличия записи в localStorage
  if (to.path === '/analytics') {
    const siteId = localStorage.getItem('leadhit-site-id');

    if (!siteId) {
      next('/')
    }
  }

  next()
})

export default router