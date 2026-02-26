import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ command, mode }) => {
    // Load env file from root directory
    const env = loadEnv(mode, path.resolve(__dirname, '..'), '')
    const basePath = process.env.BASE_PATH || env.BASE_PATH || '/template-base/'

    return {
        base: command === 'build' ? basePath : '/',
        plugins: [react()],
        define: {
            'import.meta.env.VITE_BASE_PATH': JSON.stringify(basePath),
        },
        server: {
            host: true,
            port: 5173,
            watch: {
                usePolling: true,
                interval: 100,
            },
            proxy: {
                [`${basePath}api`]: {
                    target: 'http://backend:8000',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(new RegExp(`^${basePath.replace(/\//g, '\\/')}api`), '/api'),
                },
                '/api': {
                    target: 'http://backend:8000',
                    changeOrigin: true,
                },
            },
        },
    }
})
