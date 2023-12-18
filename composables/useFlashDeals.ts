// ** Third Party Imports
import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
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
        path,
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useFlashDealFormInput = (methods: 'POST' | 'PATCH' = 'POST') => {
    const queryClient = useQueryClient()

    return useQueryMutation<IFlashDealsForm>(path.value, {
        onSuccess: (data, variables) => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })

            if (methods === 'PATCH') {
                queryClient.setQueryData([`${path.value}Detail`, { id: variables.id }], data)
            }

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    }, methods)
}

export const useFlashDealDetail = async () => {
    // ** useHooks
    const route = useRoute()
    const id = Number(route.params.id)
    const { data, suspense } = useQueryFetch<IFlashDealsForm>(path.value, `/${id}`, 'Detail', { id })

    await suspense()

    return {
        path,
        data: computed(() => data.value as IFlashDealsForm || {})
    }
}


export const useFlashDealFormDelete = () => {
    const queryClient = useQueryClient()

    return useQueryMutationDelete<number>(path.value + '/remove', {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataTable`] })
            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}
