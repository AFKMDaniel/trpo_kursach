import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/trpo_kursach/' : '/',
    resolve: {
      alias: { '@': '/src' },
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            sourceMap: true,
          },
        },
      }),
    ],
  };
});
