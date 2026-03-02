const routes = {
    path: '/cnn',
    component: () => import('./index.vue'),
    meta: { title: '卷积神经网络学习' },
    redirect: '/cnn/mlp',
    children: [{
        path: '/cnn/demo',
        component: () => import('./views/demo.vue'),
        meta: { title: 'CNN 示例' }
    }, {
        path: '/cnn/mlp',
        component: () => import('./views/mlpDemo.vue'),
        meta: { title: 'MLP 全连接示例' }
    }]
};

export default routes;
