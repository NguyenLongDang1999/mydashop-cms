// ** Third Party Imports
import { keepPreviousData, useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IDeleteRecord } from '~/types/core.type'
import type { IProductAttributeValuesForm, IProductAttributeValuesSearch, IProductAttributeValuesTable } from '~/types/product-attribute.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT_ATTRIBUTE_VALUES)
const queryKey = {
    dataTable: `${path.value}-data-table`,
    dataList: `${path.value}-data-list`,
    dataValueCategory: `${path.value}-data-value-category`,
}

export default function () {
    return {
        path
    }
}

export const useProductAttributeValuesDataTable = () => {
    // ** Data
    const search = reactive<IProductAttributeValuesSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQuery<IProductAttributeValuesTable>({
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

export const useProductAttributeValuesFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IProductAttributeValuesForm, Error, IProductAttributeValuesForm>({
        mutationFn: body => useFetcher(body.id ? `${path.value}/${body.id}` : path.value, { method: body.id ? 'PATCH' : 'POST', body }),
        onSuccess: (_data, variables) => {
            queryClient.refetchQueries({ queryKey: [queryKey.dataTable] })
            queryClient.invalidateQueries({ queryKey: [queryKey.dataList] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: error => useNotificationMessage(error.message)
    })
}

export const useProductAttributeValuesFormDelete = () => {
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

export const useProductAttributeValueList = () => {
    // ** Data
    const attribute_id = ref<string[]>([])

    const attributeData = useQueries({
        queries: computed(() => attribute_id.value.map(_v => {
            return {
                queryKey: [queryKey.dataValueCategory, _v],
                queryFn: () => useFetcher(`${path.value}/attribute-value-data-list/${_v}`)
            }
        }))
    })

    // ** Computed
    const attributeValueList = computed(() => attributeData.value)

    return {
        attribute_id,
        attributeValueList
    }
}
