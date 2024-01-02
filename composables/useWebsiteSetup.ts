// ** Third Party Imports
import { useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IWebsiteSetupForm } from '~/types/website-setup'

// ** State
const path = ref<string>(ROUTE.WEBSITE_SETUP)

export const useWebsiteSetupDetail = async (slug: string) => {
    // ** useHooks
    const { data, suspense } = useQueryFetch<IWebsiteSetupForm>(path.value, '', 'Detail',
        { slug },
        {
            queryKey: [path.value + '-detail', slug]
        }
    )

    await suspense()

    return {
        data: computed(() => data.value as IWebsiteSetupForm || {})
    }
}

export const useWebsiteSetupSystem = async () => {
    // ** useHooks
    const { data, suspense } = useQueryFetch<IWebsiteSetupForm[]>(path.value, '/system', 'DataListSystem')

    await suspense()

    return {
        data: computed(() => data.value as IWebsiteSetupForm[] || [])
    }
}

export const useWebsiteSetupFormInput = () => {
    const queryClient = useQueryClient()

    return useQueryMutation<IWebsiteSetupForm>(path.value, {
        onSuccess: (data, variables) => {
            const appConfig = useAppConfig()

            appConfig.ui.primary = JSON.parse(variables.bulkData).website_colour

            queryClient.invalidateQueries({ queryKey: [path.value + 'DataListSystem'] })
            queryClient.invalidateQueries({ queryKey: [path.value + '-detail'] })
            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}
