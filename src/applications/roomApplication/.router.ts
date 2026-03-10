const routes = {
    path: '/room',
    component: () => import('./index.vue'),
    meta: { title: '建筑编辑器' },
    redirect: '/room/editor',
    children: [{
        path: '/room/editor',
        component: () => import('./views/editor.vue'),
        meta: { title: '房间编辑' }
    }]
};

export default routes;
