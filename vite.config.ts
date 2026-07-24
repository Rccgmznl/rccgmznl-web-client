import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Node Types Required For path and __dirname
import path from 'path';
import { fileURLToPath } from 'url';


// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
            '@global': path.resolve(__dirname, 'src/global'),
            '@router': path.resolve(__dirname, 'src/router'),
            '@shared': path.resolve(__dirname, 'src/shared'),
        }
    },
});
