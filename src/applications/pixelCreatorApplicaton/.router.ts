const routes = {
  path: '/pixel',
  component: () => import('./index.vue'),
  meta: { title: '像素画创建器' },
  redirect: '/pixel/editor',
  children: [{
    name: 'pixel-editor',
    path: '/pixel/editor',
    component: () => import('./views/editor.vue'),
    meta: { title: '编辑器' }
  }]
}

export default routes
