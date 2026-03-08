const routes = {
  path: '/restaurant',
  component: () => import('./index.vue'),
  meta: { title: '东北小镇餐厅' },
  redirect: '/restaurant/game',
  children: [{
    name: 'restaurant-game',
    path: '/restaurant/game',
    component: () => import('./views/game.vue'),
    meta: { title: '经营' }
  }]
}

export default routes
