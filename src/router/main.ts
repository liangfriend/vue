import * as VueRouter from 'vue-router'

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes:[{
        path: '/',
        component: () => ('../views/common/Layout.vue')
    }]
  
})

export default router