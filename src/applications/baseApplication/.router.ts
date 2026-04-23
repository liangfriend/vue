//不要重定向相同的路由，否则会死循环
const routes = {
    path: '/base',
    component: () => import('./views/index.vue'),
    redirect: '/base/widget',
    meta: {title: '基础管理'},
    children: [{
        name: 'typescript',
        path: '/base/typescript',
        component: () => import('./views/typescript/index.vue'),
        meta: {title: 'typescript'},
    }, {
        name: 'pitchDetect',
        path: '/base/pitchDetect',
        component: () => import('./views/pitchDetect/index.vue'),
        meta: {title: '音域检测'},
    }, {
        name: 'ai',
        path: '/base/ai',
        redirect: '/base/ai/deepseek',
        meta: {title: '大模型'},
        children: [{
            name: 'deepseek',
            path: '/base/ai/deepseek',
            component: () => import('./views/ai/deepseek.vue'),
            meta: {title: 'deepseek'}
        }]
    },
        {
            name: 'widget',
            path: '/base/widget',
            redirect: '/base/widget/liamVideo',
            meta: {title: '通用组件库'},
            children: [{
                name: 'liam-video',
                path: '/base/widget/liamVideo',
                component: () => import('./views/widget/liamVideoShow.vue'),
                meta: {title: '视频播放'}
            }]
        },
        {
            name: 'minecraft',
            path: '/base/minecraft',
            component: () => import('@/applications/threeApplication/views/minecraftDemo.vue'),
            meta: {title: 'CSS 3D 我的世界'},
        }, {
            name: 'webAr',
            path: '/base/webAr',
            component: () => import('./views/webAr/index.vue'),
            meta: {title: 'webAr'},
        }]
};

export default routes;
