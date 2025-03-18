const routes = {
  path: '/fabric',
  component: () => import('./views/index.vue'),
  redirect: '/fabric/one',
  meta: { title: 'fabric' },
  children: [{
    path: '/fabric/one',
    component: () => import('./views/fabricOne.vue'),
    meta: { title: '测试使用' },
    children: []
  }]
};

export default routes;
