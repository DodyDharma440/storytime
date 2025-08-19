// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Storytime",
    },
  },
  srcDir: "src/",
  serverDir: "server/",
  css: ["~/assets/scss/main.scss"],
  components: {
    dirs: [],
  },
  icon: {
    mode: "svg",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/config" as *;',
        },
      },
    },
  },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/icon", "@pinia/nuxt"],
});