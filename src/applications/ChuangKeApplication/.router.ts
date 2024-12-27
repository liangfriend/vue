const routes = {
  path: '/chuangke',
  component: () => import('./views/index.vue'),
  // redirect: '/test',
  meta: { title: '创客vue3版本' },
  children: []
};

export default routes;
