// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IWebsiteSetupForm } from '~/types/website-setup'

// ** State
const path = ref<string>(ROUTE.WEBSITE_SETUP)

export const useWebsiteSetupDetail = async (slug: string) => {
    // ** useHooks
    const { data, suspense } = useQuery<IWebsiteSetupForm>({
        queryKey: [path.value + '-detail', slug],
        queryFn: () => useFetcher(path.value, {
            params: { slug }
        })
    })

    await suspense()

    return {
        data: computed(() => data.value as IWebsiteSetupForm || {})
    }
}

export const useWebsiteSetupSystem = async () => {
    // ** useHooks
    const { data, suspense } = useQuery<IWebsiteSetupForm[]>({
        queryKey: [path.value + 'DataListSystem'],
        queryFn: () => useFetcher(path.value + '/system')
    })

    await suspense()

    // ** Computed
    const valueData = computed(() => data.value?.reduce((acc, item) => {
        acc[item.slug] = item.value

        return acc
    }, {} as Record<string, string>))

    return {
        valueData,
        data: computed(() => data.value as IWebsiteSetupForm[] || [])
    }
}

export const useWebsiteSetupFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IWebsiteSetupForm, Error, IWebsiteSetupForm>({
        mutationFn: body => useFetcher(body.id ? `${path.value}/${body.id}` : path.value, { method: body.id ? 'PATCH' : 'POST', body }),
        onSuccess: (data, variables) => {
            if (variables.bulkData) {
                const appConfig = useAppConfig()

                appConfig.ui.primary = JSON.parse(variables.bulkData).website_colour
            }

            queryClient.invalidateQueries({ queryKey: [path.value + 'DataListSystem'] })
            queryClient.invalidateQueries({ queryKey: [path.value + '-detail'] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}
