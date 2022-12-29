import { loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'
import path from 'path'

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
// })
export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    // process에서 타입에러가 뜨게된다.
    // @type/node를 설치해주자
    return {
        resolve: {
            alias: {
                data: path.resolve(__dirname, './src/data/'),
                pages: path.resolve(__dirname, './src/presentation/pages'),
                components: path.resolve(
                    __dirname,
                    './src/presentation/components'
                ),
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
    }
}
