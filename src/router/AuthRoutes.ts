const AuthRoutes = {
  path: '/',
  component: () => import('@/layouts/auth/AdminLayout.vue'),
  meta: {
    auth: true,
  },
  redirect: '/dashboard',
  children: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/auth/dashboard/index.vue'),
    },
    {
      name: 'Typography',
      path: '/ui/typography',
      component: () => import('@/views/components/Typography.vue'),
    },
    {
      name: 'Shadow',
      path: '/ui/shadow',
      component: () => import('@/views/components/Shadow.vue'),
    },
    {
      name: 'Icons',
      path: '/icons',
      component: () => import('@/views/pages/Icons.vue'),
    },
    {
      name: 'Starter',
      path: '/sample-page',
      component: () => import('@/views/pages/SamplePage.vue'),
    },
  ],
};

export default AuthRoutes;
