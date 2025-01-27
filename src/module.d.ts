declare module '*.gltf' {
  const value: any;
  export default value;
}
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

