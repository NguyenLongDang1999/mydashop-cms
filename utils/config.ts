const env = useRuntimeConfig()

export default {
    baseURL: env.public.apiBase,
    previewCDN: env.public.previewCdn
}
