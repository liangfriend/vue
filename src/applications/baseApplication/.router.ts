const routes = [
  {
    path: '/base',
    component: () => import('./views/index.vue'),
    redirect: '/base/one',
    meta: { title: '基础管理' },
    children: [
      {
        path: '/base/one',
        component: () => import('./views/baseOne.vue'),
        meta: { title: '基础1' }
      },
      {
        path: '/base/two',
        component: () => import('./views/baseTwo.vue'),
        meta: { title: '文件上传' }
      }
    ]
  }
];
export default routes;
