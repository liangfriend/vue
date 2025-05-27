import editor from './views/editor.vue';

const routes = {
    path: '/chuangKe',
    component: () => import('./views/index.vue'),
    meta: {title: '创客vue3版本'},
    redirect: '/chuangKe/editor',
    children: [
        {
            name: '导航首页',
            path: '/chuangKe/navigator',
            component: () => import('./views/navigator.vue'),
        },
        {
            name: '编辑器',
            path: '/chuangKe/editor',
            component: () => import('./views/editor.vue'),
        }]
};

export default routes;
