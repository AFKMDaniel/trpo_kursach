import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default {
  resolve: {
    alias: {
      shared: '/src/shared',
      entities: '/src/entities',
      features: '/src/features',
      widgets: '/src/widgets',
      pages: '/src/pages',
      app: '/src/app',
    },
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
