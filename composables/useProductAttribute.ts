// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IDeleteRecord } from '~/types/core.type'
import type { IProductAttributeForm, IProductAttributeList, IProductAttributeSearch, IProductAttributeTable } from '~/types/product-attribute.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT_ATTRIBUTE)

const queryKey = {
    dataTable: `${path.value}-data-table`,
    dataList: `${path.value}-data-list`,
    retrieve: `${path.value}-retrieve`
}

export default function () {
    return {
        path
    }
}

export const useProductAttributeDataTable = () => {
    // ** Data
    const search = reactive<IProductAttributeSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQuery<IProductAttributeTable>({
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

export const useProductAttributeDataList = () => {
    // ** useHooks
    const { data } = useQuery<IProductAttributeList[]>({
        queryKey: [queryKey.dataList],
        queryFn: () => useFetcher(path.value + '/data-list')
    })

    return computed(() => data.value || [])
}

export const useProductAttributeRetrieve = async () => {
    // ** useHooks
    const { params } = useRoute()

    const { data, suspense } = useQuery<IProductAttributeForm>({
        queryKey: [queryKey.retrieve, params.id],
        queryFn: () => useFetcher(path.value + '/' + params.id)
    })

    await suspense()

    return {
        data: computed(() => data.value as IProductAttributeForm || {})
    }
}

export const useProductAttributeFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductAttributeForm, Error, IProductAttributeForm>({
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

export const useProductAttributeFormDelete = () => {
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
