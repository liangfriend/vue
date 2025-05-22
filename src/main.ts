import {createApp} from 'vue';
import './style.scss';
import App from './App.vue';
// import router from "./router.ts";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import {createWebHashHistory, createRouter, RouteRecordRaw} from 'vue-router';

import appVue from './App.vue';
import {createStore} from 'vuex';

import drag from '@/directives/drag.ts';

import chuangKeStore from '@/applications/ChuangKeApplication/chuangKeStore.ts';

//动态路由加载
async function routeSet() {
    const modules: Record<string, () => Promise<any>> = import.meta.glob('./applications/**/.router.ts');
    //动态路由设置和挂载
    const routes: RouteRecordRaw[] = [
        {
            path: '/',
            component: appVue,
            redirect: '/base',
            children: []
        }
    ];
    for (const path in modules) {
        const mod = await modules[path]();
        if (routes[0].children) {
            routes[0].children.push(mod.default);
        }
    }
    const router = createRouter({
        history: createWebHashHistory(),
        routes
    });
    return router;
}

function storeSet() {
    const store = createStore({
        modules: {
            chuangKeStore,
        }
    });
    return store;
}

//初始化函数，因为路由挂载是异步的，所以把这些包含在一个init函数中执行
async function init() {
    //路由设置
    const router = await routeSet();
    //全局变量设置
    const store = storeSet();
    const app = createApp(App);

    app.use(router).directive('drag', drag).use(ElementPlus).mount('#app');
}

//chuangkeApplication
//初始化
init();
