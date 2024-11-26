/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
/// <reference types="unplugin-icons/types/vue" />
/// <reference types="global.d.ts" />
/// <reference types="dayjs" />
/// <reference types="vite-plugin-pwa/client" />

import type { } from './auto-imports.d.ts'
import type { } from './components.d.ts'

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    action?: string
    subject?: string
    layoutWrapperClasses?: string
  }
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'

    const component: DefineComponent<{}, {}, unknown>
    export default component
}