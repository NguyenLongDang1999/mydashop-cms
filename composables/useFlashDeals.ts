// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

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
    const { data, isFetching } = useQuery<IFlashDealsTable>({
        queryKey: [path.value + 'DataTable', search],
        queryFn: () => useFetcher(path.value, { params: search }),
        placeholderData: keepPreviousData
    })

    provide('search', search)

    return {
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useFlashDealDetail = async () => {
    // ** useHooks
    const id = Number(useRoute().params.id)

    const { data, suspense } = useQuery<IFlashDealsForm>({
        queryKey: [path.value + 'Detail', id],
        queryFn: () => useFetcher(path.value + '/' + id)
    })

    await suspense()

    return {
        data: computed(() => data.value as IFlashDealsForm || {})
    }
}

export const useFlashDealFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IFlashDealsForm, Error, IFlashDealsForm>({
        mutationFn: body => useFetcher(body.id ? `${path.value}/${body.id}` : path.value, { method: body.id ? 'PATCH' : 'POST', body }),
        onSuccess: (_data, variables) => {
            queryClient.refetchQueries({ queryKey: ['productDataTable'] })
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            if (variables.id) queryClient.invalidateQueries({ queryKey: [`${path.value}Detail`, { id: variables.id }] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}

export const useFlashDealFormDelete = () => {
    const queryClient = useQueryClient()

    return useMutation<IDeleteRecord, Error, IDeleteRecord>({
        mutationFn: body => useFetcher(`${path.value}/remove/${body.id}`, { method: 'PATCH' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataTable`] })

            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}
