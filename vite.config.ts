import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import Icons from 'unplugin-icons/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import IconsResolver from 'unplugin-icons/resolver'
import tailwind from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
      vueTemplate: true,
    }),
    Components({
      dirs: ['./src/components'],
      dts: true,
      deep: true,
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
      ],
    }),
    DefineOptions({
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/node_modules/],
    }),
    Icons({
      // experimental
      autoInstall: true,
    }),
    Layouts({
      layoutsDirs: './src/layouts/',
    }),
    Pages({
      dirs: ['./src/pages'],
      onRoutesGenerated: routes => [
        ...routes,
      ],
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [tailwind],
    }
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  server: {
    port: 3000
  }
})
