// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        'nuxt-lodash',
        '@nuxtjs/google-fonts',
        '@vueuse/nuxt',
        '@nuxt/ui',
        '@vee-validate/nuxt',
        '@samk-dev/nuxt-vcalendar'
    ],
    ssr: false,
    googleFonts: {
        prefetch: true,
        preconnect: true,
        families: {
            'Quicksand': [400, 500, 600, 700]
        }
    },
    tailwindcss: {
        configPath: 'tailwind.config.ts'
    },
    lodash: {
        prefix: '_',
        prefixSkip: ['string'],
        upperAfterPrefix: false
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE
        }
    }
})
