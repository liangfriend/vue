import { createWebHashHistory, createRouter } from "vue-router";

import appVue from './App.vue'

const modules = import.meta.glob("./applications/**/.router.ts");
// console.log(modules)
async function set() {
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
  return router
}

 
export default set();
