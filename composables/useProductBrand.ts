// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IDeleteRecord } from '~/types/core.type'
import type { IProductBrandForm, IProductBrandSearch, IProductBrandTable } from '~/types/product-brand.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT_BRAND)
const queryKey = {
    dataTable: `${path.value}-data-table`,
    dataList: `${path.value}-data-list`,
    retrieve: `${path.value}-retrieve`,
}

export default function () {
    return {
        path
    }
}

export const useProductBrandDataTable = () => {
    // ** Data
    const search = reactive<IProductBrandSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQuery<IProductBrandTable>({
        queryKey: [queryKey.dataTable, search],
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

export const useProductBrandRetrieve = async () => {
    // ** useHooks
    const { params } = useRoute()

    const { data, suspense } = useQuery<IProductBrandForm>({
        queryKey: [queryKey.retrieve, params.id],
        queryFn: () => useFetcher(path.value + '/' + params.id)
    })

    await suspense()

    return {
        data: computed(() => data.value as IProductBrandForm || {})
    }
}

export const useProductBrandFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductBrandForm, Error, IProductBrandForm>({
        mutationFn: body => useFetcher(body.id ? `${path.value}/${body.id}` : path.value, { method: body.id ? 'PATCH' : 'POST', body }),
        onSuccess: (_data, variables) => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataTable] })
            queryClient.invalidateQueries({ queryKey: [queryKey.dataList] })
            if (variables.id) queryClient.invalidateQueries({ queryKey: [queryKey.retrieve, variables.id] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: error => useNotificationMessage(error.message)
    })
}

export const useProductBrandFormDelete = () => {
    const queryClient = useQueryClient()

    return useMutation<IDeleteRecord, Error, IDeleteRecord>({
        mutationFn: body => useFetcher(`${path.value}/${body.id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey.dataList] })
            queryClient.invalidateQueries({ queryKey: [queryKey.dataTable] })

            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}
