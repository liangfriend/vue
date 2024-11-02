const routes = [
  {
    path: '/base',
    component: () => import('./views/index.vue'),
    redirect: '/base/one',
    meta: { title: '基础管理' },
    children: [
      {
        path: '/base/one',
        component: () => import('./views/Edit.vue'),
        meta: { title: '课件编辑' }
      },
      {
        path: '/base/two',
        component: () => import('./views/Show.vue'),
        meta: { title: '课件展示' }
      },
      {
        path: '/base/test',
        component: () => import('./views/Test.vue'),
        meta: { title: '测试草纸' }
      }
    ]
  }
];
export default routes;
