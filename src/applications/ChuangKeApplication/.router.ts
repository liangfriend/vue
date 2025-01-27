import editor from './views/editor.vue';
const routes = {
  path: '/chuangKeIndex',
  component: () => import('./views/index.vue'),
  meta: { title: '创客vue3版本' },
  children: [
    {
      name:'导航首页',
      path: '/chuangKeIndex/navigator',
      component: () => import('./views/navigator.vue'),
    },
    {
      name:'编辑器',
      path:'/chuangKeIndex/editor',
      component: () => import('./views/editor.vue'),
    }]
};

export default routes;
