// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IDeleteRecord } from '~/types/core.type'
import type { IHomeProductFlashDealsSearch, IProductFlashDealsForm, IProductFlashDealsList, IProductFlashDealsSearch, IProductFlashDealsTable } from '~/types/product-flash-deals.type'
import type { IProductGenerateVariant, IProductTable } from '~/types/product.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT_FLASH_DEALS)

const queryKey = {
    dataTable: `${path.value}-data-table`,
    dataList: `${path.value}-data-list`,
    retrieve: `${path.value}-retrieve`,
    flashDataTable: `${path.value}-flash-deals-data-table`
}

export default function () {
    return {
        path
    }
}

export const useProductFlashDealsDataTable = () => {
    // ** Data
    const search = reactive<IProductFlashDealsSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQuery<IProductFlashDealsTable>({
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

export const useProductFlashDealsRetrieve = async () => {
    // ** useHooks
    const { params } = useRoute()
    const { productVariants } = useProduct()

    const { data, suspense } = useQuery<IProductFlashDealsForm>({
        queryKey: [queryKey.retrieve, params.id],
        queryFn: () => useFetcher(path.value + '/' + params.id)
    })

    await suspense()

    productVariants.value = data.value?.productVariants as IProductGenerateVariant[]

    return {
        data: computed(() => data.value as IProductFlashDealsForm || {})
    }
}

export const useProductFlashDealsDataList = () => {
    // ** useHooks
    const { data } = useQuery<IProductFlashDealsList[]>({
        queryKey: [queryKey.dataList],
        queryFn: () => useFetcher(path.value + '/data-list')
    })

    return computed(() => data.value || [])
}

export const useProductFlashDealsTableList = () => {
    const search = reactive<IHomeProductFlashDealsSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching, suspense } = useQuery<IProductTable>({
        queryKey: [queryKey.flashDataTable, search],
        queryFn: () => useFetcher(path.value + '/product-table-list', { params: search }),
        placeholderData: keepPreviousData
    })

    provide('search', search)

    return {
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0),
        suspense
    }
}

export const useProductFlashDealsFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductFlashDealsForm, Error, IProductFlashDealsForm>({
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

export const useProductFlashDealsFormDelete = () => {
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
