const routes = {
  path: '/fabric',
  component: () => import('./views/index.vue'),
  redirect: '/fabric/one',
  meta: { title: 'fabric' },
  children: [{
    path: '/fabric/one',
    component: () => import('./views/fabricOne.vue'),
    meta: { title: 'fabric测试' },
    children: []
  }, {
    path: '/fabric/two',
    component: () => import('./views/fabricTwo.vue'),
    meta: {title: 'clipperjs测试'},
    children: []
  }]
};

export default routes;
