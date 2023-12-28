// ** Third Party Imports
import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IDeleteRecord } from '~/types/core.type'
import type { IFlashDealsForm, IFlashDealsSearch, IFlashDealsTable } from '~/types/flash-deals.type'

// ** State
const path = ref<string>(ROUTE.FLASH_DEALS)

export default function () {
    return {
        path
    }
}

export const useFlashDealDataTable = () => {
    // ** Data
    const search = reactive<IFlashDealsSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQueryFetch<IFlashDealsTable>(path.value, '', 'DataTable', search, {
        placeholderData: keepPreviousData
    })

    return {
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useFlashDealFormInput = () => {
    const queryClient = useQueryClient()

    return useQueryMutation<IFlashDealsForm>(path.value, {
        onSuccess: (data, variables) => {
            queryClient.refetchQueries({ queryKey: ['productDataTable'] })
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

export const useFlashDealDetail = async () => {
    // ** useHooks
    const id = Number(useRoute().params.id)
    const { data, suspense } = useQueryFetch<IFlashDealsForm>(path.value, `/${id}`, 'Detail', { id })

    await suspense()

    return {
        data: computed(() => data.value as IFlashDealsForm || {})
    }
}


export const useFlashDealFormDelete = () => {
    const queryClient = useQueryClient()

    return useQueryMutation<IDeleteRecord>(path.value + '/remove', {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataTable`] })
            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}
