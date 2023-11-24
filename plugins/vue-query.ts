import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query'
import { QueryClient, VueQueryPlugin, dehydrate, hydrate } from '@tanstack/vue-query'

export default defineNuxtPlugin(nuxt => {
    const vueQueryState = useState<DehydratedState | null>('vue-query')

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
                retry: 1,
                staleTime: 5 * (60 * 1000),
                cacheTime: 10 * (60 * 1000)
            },
            mutations: {
                retry: 1
            }
        }
    })

    const options: VueQueryPluginOptions = { queryClient }

    nuxt.vueApp.use(VueQueryPlugin, options)

    if (process.server) {
        nuxt.hooks.hook('app:rendered', () => {
            vueQueryState.value = dehydrate(queryClient)
        })
    }

    if (process.client) {
        nuxt.hooks.hook('app:created', () => {
            hydrate(queryClient, vueQueryState.value)
        })
    }
})
