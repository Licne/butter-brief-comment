import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],

  // ==============================================
  build: {
    transpile: ["naive-ui", "vueuc", "@css-render/vue3-ssr"],
  },

  vite: {
    // 解决 VResizeObserver CommonJS 错误
    ssr: {
      noExternal: ["naive-ui", "vueuc", "@css-render/vue3-ssr"],
    },
    // 修复 Vite 依赖预编译
    optimizeDeps: {
      include: ["vueuc", "naive-ui"],
    },
    // ==============================================

    plugins: [
      AutoImport({
        imports: [
          "vue",
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
        dts: "app/auto-imports.d.ts",
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: true,
      }),
    ],
  },

  css: ["~/assets/css/tailwind.css", "~/assets/scss/main.scss"],
});