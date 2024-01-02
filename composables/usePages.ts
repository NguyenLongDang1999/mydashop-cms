// ** Third Party Imports
import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IPagesForm, IPagesSearch, IPagesTable } from '~/types/pages.type'

// ** State
const path = ref<string>(ROUTE.PAGES)

export const usePagesDataTable = () => {
    // ** Data
    const search = reactive<IPagesSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQueryFetch<IPagesTable>(path.value, '', 'DataTable', search, {
        placeholderData: keepPreviousData
    })

    return {
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const usePagesDetail = async () => {
    // ** useHooks
    const id = Number(useRoute().params.id)
    const { data, suspense } = useQueryFetch<IPagesForm>(path.value, `/${id}`, 'Detail', { id })

    await suspense()

    return {
        data: computed(() => data.value as IPagesForm || {})
    }
}

export const usePagesFormInput = () => {
    const queryClient = useQueryClient()

    return useQueryMutation<IPagesForm>(path.value, {
        onSuccess: (data, variables) => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })

            if (variables.id) {
                queryClient.invalidateQueries({ queryKey: [`${path.value}Detail`, { id: variables.id }] })
            }

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}

export const usePagesFormDelete = () => {
    const queryClient = useQueryClient()

    return useQueryMutationDelete<number>(path.value, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataTable`] })
            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    }, 'DELETE')
}
