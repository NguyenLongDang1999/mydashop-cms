// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IDeleteRecord } from '~/types/core.type'
import type { IProductAttributeList } from '~/types/product-attribute.type'
import type { IProductBrandList } from '~/types/product-brand.type'
import type { IProductFormVariant, IProductList, IProductSearch, IProductTable } from '~/types/product.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT)

const queryKey = {
    dataTable: `${path.value}-data-table`,
    dataList: `${path.value}-data-list`,
    retrieve: `${path.value}-retrieve`,
    dataListCategory: `${path.value}-data-list-category`
}

export default function () {
    return {
        path
    }
}

export const useProductDataTable = () => {
    // ** Data
    const search = reactive<IProductSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching, suspense } = useQuery<IProductTable>({
        queryKey: [queryKey.dataTable, search],
        queryFn: () => useFetcher(path.value, { params: search }),
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

export const useProductDataList = () => {
    // ** useHooks
    const { data } = useQuery<IProductList[]>({
        queryKey: [queryKey.dataList],
        queryFn: () => useFetcher(path.value + '/data-list')
    })

    return computed(() => data.value || [])
}

export const useProductRetrieve = async () => {
    // ** useHooks
    const { params } = useRoute()

    const { data, suspense } = useQuery<IProductFormVariant>({
        queryKey: [queryKey.retrieve, params.id],
        queryFn: () => useFetcher(path.value + '/' + params.id)
    })

    await suspense()

    return {
        data: computed(() => data.value as IProductFormVariant || {})
    }
}

export const useProductFormInput = <T extends { id?: string } = IProductForm>() => {
    const queryClient = useQueryClient()

    return useMutation<T, Error, T>({
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

export const useProductFormDelete = () => {
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

export const useProductSelectedWithCategory = () => {
    // ** Data
    const endPoint = '/data-list-category'
    const category_id = ref<string>()

    // ** useHooks
    const { path: pathBrand } = useProductBrand()
    const { path: pathAttribute } = useProductAttribute()

    const { isFetching: isFetchingBrand, data: dataBrand } = useQuery<IProductBrandList[]>({
        queryKey: [pathBrand.value + queryKey.dataListCategory, category_id],
        queryFn: () => useFetcher(`${pathBrand.value + endPoint}/${category_id.value}`),
        enabled: () => !!category_id.value
    })

    const { isFetching: isFetchingAttribute, data: dataAttribute } = useQuery<IProductAttributeList[]>({
        queryKey: [pathAttribute.value + queryKey.dataListCategory, category_id],
        queryFn: () => useFetcher(`${pathAttribute.value + endPoint}/${category_id.value}`),
        enabled: () => !!category_id.value
    })

    const brandList = computed(() => dataBrand.value || [])
    const attributeList = computed(() => dataAttribute.value || [])

    return {
        category_id,
        brandList,
        isFetchingBrand,
        attributeList,
        isFetchingAttribute
    }
}
