import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: function (tag) { return tag.startsWith('a-'); },
                },
            },
        }),
    ],
    server: {
        port: 9999,
        host: '0.0.0.0',
        open: true, // 可选，启动后自动打开浏览器
        // https: {
        //     key: fs.readFileSync(path.resolve(__dirname, './key.pem')),
        //     cert: fs.readFileSync(path.resolve(__dirname, './cert.pem'))
        // }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    assetsInclude: ['**/*.gltf', '**/*.fset3'],
    build: {
        assetsInlineLimit: 0 // 确保资源不会被内联
    }
});
