import editor from './views/editor/index.vue';

const routes = {
    path: '/chuangKe',
    component: () => import('./views/index.vue'),
    meta: {title: '创客vue3版本'},
    redirect: '/chuangKe/index',
    children: [
        {
            name: '导航首页',
            path: '/chuangKe/index',
            component: () => import('./views/home/index.vue'),
        },
        {
            name: '编辑器',
            path: '/chuangKe/editor',
            component: () => import('./views/editor/index.vue'),
        },
        {
            name: '乐器图鉴',
            path: '/chuangKe/instrumentHandbook',
            component: () => import('./views/instrumentHandbook/index.vue'),
        }]
};

export default routes;
