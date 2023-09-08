import { createRouter, createWebHistory } from 'vue-router';
// import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import GuestRoutes from '@/router/GuestRoutes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/Error404.vue'),
    },
    GuestRoutes,
    // MainRoutes,
    AuthRoutes,
  ],
});

router.beforeEach((to, from, next) => {
  console.log('to', to);
  console.log('from', from);
  console.log('next', next);
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  console.log('publicPages', publicPages);
  console.log('authRequired', authRequired);
  console.log('loggedIn', loggedIn);
  console.log('!loggedIn', !loggedIn);

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next('/login');
    return;
  } else {
    next();
  }
});

export { router };
