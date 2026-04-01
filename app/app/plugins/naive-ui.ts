// // app/plugins/naive-ui.ts
// import { setup } from '@css-render/vue3-ssr'

// export default defineNuxtPlugin((nuxtApp) => {
//   // 处理 Naive UI SSR 样式
//   if (process.server) {
//     const { collect } = setup(nuxtApp.vueApp)
//     nuxtApp.hooks.hook('render:html', (html) => {
//       html.head.push(`<style data-css-render>${collect()}</style>`)
//     })
//   }
// })