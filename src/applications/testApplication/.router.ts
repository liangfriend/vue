const routes = {
    path: '/test',
    component: () => import('./index.vue'),
    meta: {title: 'test'},
    redirect: '/test/list',
    children: [{
        path: '/test/list',
        component: () => import('./views/list.vue'),
    }, {
        path: '/test/edit',
        component: () => import('./views/lyricsEdit.vue'),
    }]
};

export default routes;
