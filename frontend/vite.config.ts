import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/need_to_change/' : '/',
    plugins: [react()],
    server: {
        host: true,
        port: 5173,
        allowedHosts: true,
        watch: {
            usePolling: true,
            interval: 100,
        },
        proxy: {
            '/need_to_change/api': {
                target: 'http://backend:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/need_to_change\/api/, '/api'),
            },
            '/api': {
                target: 'http://backend:8000',
                changeOrigin: true,
            },
        },
    },
}))
