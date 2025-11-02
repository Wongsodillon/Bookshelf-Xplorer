import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public/build',
        assetsDir: 'static',
        manifest: 'manifest.json',
        emptyOutDir: true
    },
})