const routes = {
    path: '/model',
    component: () => import('./views/index.vue'),
    redirect: '/model/cnn/demo',
    meta: {title: 'AI 模型学习'},
    children: [{
        name: 'cnn',
        path: '/model/cnn',
        redirect: '/model/cnn/demo',
        meta: {title: 'CNN'},
        children: [{
            name: 'cnn-demo',
            path: '/model/cnn/demo',
            component: () => import('./views/cnn/demo.vue'),
            meta: {title: '卷积神经网络'},
        }],
    }, {
        name: 'mlp',
        path: '/model/mlp',
        redirect: '/model/mlp/demo',
        meta: {title: 'MLP'},
        children: [{
            name: 'mlp-demo',
            path: '/model/mlp/demo',
            component: () => import('./views/mlp/demo.vue'),
            meta: {title: '全连接网络'},
        }],
    }, {
        name: 'rnn',
        path: '/model/rnn',
        redirect: '/model/rnn/demo',
        meta: {title: 'RNN'},
        children: [{
            name: 'rnn-demo',
            path: '/model/rnn/demo',
            component: () => import('./views/rnn/demo.vue'),
            meta: {title: '循环神经网络'},
        }],
    }, {
        name: 'attention',
        path: '/model/attention',
        redirect: '/model/attention/demo',
        meta: {title: 'Attention'},
        children: [{
            name: 'attention-demo',
            path: '/model/attention/demo',
            component: () => import('./views/attention/demo.vue'),
            meta: {title: '缩放点积注意力'},
        }],
    }, {
        name: 'transformer',
        path: '/model/transformer',
        redirect: '/model/transformer/demo',
        meta: {title: 'Transformer'},
        children: [{
            name: 'transformer-demo',
            path: '/model/transformer/demo',
            component: () => import('./views/transformer/demo.vue'),
            meta: {title: '架构与注意力'},
        }],
    }],
};

export default routes;
