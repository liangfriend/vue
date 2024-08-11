import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// import router from "./router.ts";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createWebHashHistory, createRouter } from "vue-router";

import appVue from './App.vue'


const app = createApp(App);
async function set(){
    const modules = import.meta.glob("./applications/**/.router.ts");
// console.log(modules)


  const routes = [
  {
    path: "/",

    component: appVue,
      redirect: "/base",


    children: [],
  },
];

for (const path in modules) {
 const mod=await modules[path]()
     routes[0].children.push(...mod.default);
}

console.log(routes);
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
    app.use(router).use(ElementPlus).mount("#app");
}
set()

