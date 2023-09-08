const GuestRoutes = {
  path: '/',
  meta: {
    auth: false,
  },
  component: () => import('@/layouts/guest/GuestLayout.vue'),
  children: [
    {
      path: '',
      name: 'guest.home',
      component: () => import(`@/views/guest/pages/home/HomeIndex.vue`),
      meta: {
        name: 'Welcome',
      },
    },
    {
      path: '/login',
      name: 'guest.login',
      component: () => import(`@/views/guest/pages/login/LoginIndex.vue`),
      meta: {
        name: 'Login',
      },
    },
    {
      path: 'register',
      name: 'guest.register',
      component: () => import(`@/views/guest/pages/register/RegisterIndex.vue`),
      meta: {
        name: 'Register',
      },
    },
  ],
};

export default GuestRoutes;
