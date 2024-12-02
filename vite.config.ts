import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default {
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
} satisfies UserConfig;
