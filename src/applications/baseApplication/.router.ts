import indexVue from './views/index.vue'

const routes = [{
      path: '/base',
      component:()=>import('./views/index.vue')
    }]
export default routes