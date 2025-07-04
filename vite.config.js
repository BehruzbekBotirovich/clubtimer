import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import {fileURLToPath, URL} from 'node:url'

export default defineConfig(({_command, mode}) => {
    return {
        plugins: [
            vue(),
            Components({
                resolvers: [
                    AntDesignVueResolver({
                        importStyle: false
                    })
                ]
            })
        ],
        server: {
            port: 3000,
            proxy: {
                '/api': {
                    target: 'https://clubtimer-back.onrender.com',
                    // target: 'http://localhost:5000',
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, '/api/')
                },
            }
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id
                                .toString()
                                .split('node_modules/')[1]
                                .split('/')[0]
                                .toString()
                        }
                    }
                }
            }
        },
        define: {
            __VUE_PROD_DEVTOOLS__: mode === 'development'
        }
    }
})
