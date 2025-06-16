import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 9999,
        host: '0.0.0.0',
        open: true, // 可选，启动后自动打开浏览器
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    assetsInclude: ['**/*.gltf'],
    build: {
        assetsInlineLimit: 0 // 确保资源不会被内联
    }
});
