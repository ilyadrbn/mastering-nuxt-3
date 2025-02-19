export default defineNuxtConfig({
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
        },
    },
    compatibilityDate: "2024-04-03",
    devtools: { enabled: false },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    typescript: {
        typeCheck: true,
    },
    modules: ["@vueuse/nuxt", "@nuxt/eslint", "@nuxtjs/supabase"],
    supabase: {
        redirect: false,
    },
});
