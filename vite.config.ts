import { loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
// })
export default ({ mode }: { mode: string }) => {
    console.log(mode)
    console.log('----------------------------------------')

    const env = loadEnv(mode, process.cwd())
    // process에서 타입에러가 뜨게된다.
    // @type/node를 설치해주자
    return {
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
            svgr({
                exportAsDefault: true,
            }),
        ],
    }
}
