// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Storytime",
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "page",
      mode: "out-in",
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
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
      BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
    },
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
  nitro: {
    devProxy: {
      "/api/backend": {
        target: process.env.NUXT_PUBLIC_BACKEND_BASE_URL,
        changeOrigin: true,
      },
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "nuxt-tiptap-editor",
    "vue3-carousel-nuxt",
  ],
});
