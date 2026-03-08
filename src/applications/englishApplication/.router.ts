const routes = {
  path: '/english',
  component: () => import('./index.vue'),
  meta: { title: '英语练习' },
  redirect: '/english/practice',
  children: [{
    name: 'english-practice',
    path: '/english/practice',
    component: () => import('./views/practice.vue'),
    meta: { title: '翻译与写作' }
  }]
}

export default routes
