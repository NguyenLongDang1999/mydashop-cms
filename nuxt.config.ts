// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        'nuxt-lodash',
        '@unocss/nuxt',
        '@nuxtjs/google-fonts',
        '@vueuse/nuxt',
        '@nuxt/ui',
        '@vee-validate/nuxt'
    ],
    ssr: false,
    unocss: {
        preflight: false
    },
    css: [
        '@unocss/reset/tailwind-compat.css'
    ],
    googleFonts: {
        prefetch: true,
        preconnect: true,
        families: {
            'Quicksand': [400, 500, 600, 700]
        }
    },
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        }
    },
    lodash: {
        prefix: '_',
        prefixSkip: ['string'],
        upperAfterPrefix: false
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false
        }
    ],
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE,
            previewCdn: process.env.NUXT_PUBLIC_BUNNY_CDN_URL
        }
    }
})
