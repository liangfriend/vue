const routes = {
  path: '/test',
  component: () => import('./views/index.vue'),
  // redirect: '/test',
  meta: { title: 'test' },
  children: []
};

export default routes;
