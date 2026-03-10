const routes = {
    path: '/scene',
    component: () => import('./index.vue'),
    meta: {title: '场景编辑器'},
    redirect: '/scene/editor',
    children: [{
        path: '/scene/editor',
        component: () => import('./views/editor.vue'),
    }]
};

export default routes;
