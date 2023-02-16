import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'
import path from 'path'

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
// })
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    // process에서 타입에러가 뜨게된다.
    // @type/node를 설치해주자
    return {
        resolve: {
            alias: {
                src: path.resolve(__dirname, './src'),
                data: path.resolve(__dirname, './src/data/'),
                pages: path.resolve(__dirname, './src/pages'),
                components: path.resolve(__dirname, './src/components'),
                lib: path.resolve(__dirname, './src/lib'),
                hooks: path.resolve(__dirname, './src/hooks'),
                utils: path.resolve(__dirname, './src/utils'),
                types: path.resolve(__dirname, './src/types'),
                img: path.resolve(__dirname, './src/assets/images'),
            },
        },
        plugins: [
            react(),
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        api: env.VITE_API_HOST,
                    },
                },
            }),
        ],
        server: {
            proxy: {
                // Proxying websockets or socket.io
                '/chat-service/ws': {
                    target: 'ws://61.77.108.167:8000',
                    ws: true,
                },
            },
            define: {
                global: {},
            },
        },
    }
})
