const routes = {
  path: '/three',
  component: () => import('./views/index.vue'),
  redirect: '/three/one',
  meta: { title: '3D管理' },
  children: [
    {
      path: '/three/one',
      component: () => import('./views/threeOne.vue'),
      meta: { title: '基础渲染' },
      children: []
    },
    {
      path: '/three/two',
      component: () => import('./views/threeTwo.vue'),
      meta: { title: '导入模型' },
      children: []
    },
    {
      path: '/three/look',
      component: () => import('./views/look.vue'),
      meta: { title: '展示' },
      children: []
    },
    {
      path: '/three/minecraft',
      component: () => import('./views/minecraftDemo.vue'),
      meta: { title: 'CSS 3D 我的世界' },
      children: []
    }
  ]
};

export default routes;
