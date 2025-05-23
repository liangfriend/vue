import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  assetsInclude: ['**/*.gltf'], //确保vite能正确处理.gltf文件
  build: {
    assetsInlineLimit: 0 // 确保资源不会被内联
  }
});
