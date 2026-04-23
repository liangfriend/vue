import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import * as fs from "node:fs";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith('a-'),
                },
            },
        }),
    ],
    server: {
        port: 9999, // 指定开发服务器端口
        host: '0.0.0.0', // 可选，允许局域网访问
        open: true, // 可选，启动后自动打开浏览器
        https: {
            key: fs.readFileSync(path.resolve(__dirname, './key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, './cert.pem'))
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    assetsInclude: ['**/*.gltf', '**/*.fset3'], //确保vite能正确处理.gltf文件
    build: {
        assetsInlineLimit: 0 // 确保资源不会被内联
    }
});
