const routes = [
  {
    path: '/three',
    component: () => import('./views/index.vue'),
    redirect: '/three/one',
    meta: { title: '3D管理' },
    children: [
      {
        path: '/three/one',
        component: () => import('./views/threeOne.vue'),
        meta: { title: '基础渲染' }
      },
      {
        path: '/three/two',
        component: () => import('./views/threeTwo.vue'),
        meta: { title: '导入模型' }
      }
    ]
  }
];
export default routes;
