import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
// import router from "./router.ts";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router';

import appVue from './App.vue';

type RouteModule = {
  default: RouteRecordRaw[];
};

const app = createApp(App);
async function set() {
  const modules = import.meta.glob<Promise<RouteModule>>('./applications/**/.router.ts');
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
    if (routes[0].children) routes[0].children.push(...mod.default);
  }
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  });

  //插件挂载
  app.use(router).use(ElementPlus).mount('#app');
}
set();
