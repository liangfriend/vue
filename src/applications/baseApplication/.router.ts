//不要重定向相同的路由，否则会死循环
const routes = {
  path: '/base',
  component: () => import('./views/index.vue'),
  // redirect: '/base',
  meta: { title: '基础管理' },
  children: []
};

export default routes;
