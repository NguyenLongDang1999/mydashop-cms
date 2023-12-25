// ** Third Party Imports
import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IAttributeList } from '~/types/attribute.type'
import type { IBrandList } from '~/types/brand.type'
import type { IDeleteRecord } from '~/types/core.type'
import type { IProductForm, IProductList, IProductSearch, IProductTable } from '~/types/product.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT)

export const useProductDataTable = () => {
    // ** Data
    const search = reactive<IProductSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching, suspense } = useQueryFetch<IProductTable>(path.value, '', 'DataTable', search, {
        placeholderData: keepPreviousData
    })

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
    const { data } = useQueryFetch<IProductList[]>(path.value)

    return computed(() => data.value || [])
}

export const useProductDetail = async () => {
    // ** useHooks
    const id = Number(useRoute().params.id)
    const { data, suspense } = useQueryFetch<IProductForm>(path.value, `/${id}`, 'Detail', { id })

    await suspense()

    return {
        data: computed(() => data.value as IProductForm || {})
    }
}

export const useProductFormInput = () => {
    const queryClient = useQueryClient()

    return useQueryMutation<IProductForm>(path.value, {
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

export const useProductFormDelete = () => {
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

export const useProductSelectedWithCategory = () => {
    // ** Data
    const endPoint = '/data-list-category'
    const queryKey = 'DataListCategory'
    const category_id = ref<number>()

    // ** useHooks
    const { path: pathBrand } = useBrand()
    const { path: pathAttribute } = useAttribute()

    const { isFetching: isFetchingBrand, data: dataBrand } = useQueryFetch<IBrandList[]>(pathBrand.value, endPoint, queryKey, {}, {
        queryKey: [pathBrand.value + queryKey, category_id],
        queryFn: () => useFetcher(`${pathBrand.value + endPoint}/${category_id.value}`),
        enabled: computed(() => !!category_id.value)
    })

    const { isFetching: isFetchingAttribute, data: dataAttribute } = useQueryFetch<IAttributeList[]>(pathAttribute.value, endPoint, queryKey, {}, {
        queryKey: [pathAttribute.value + queryKey, category_id],
        queryFn: () => useFetcher(`${pathAttribute.value + endPoint}/${category_id.value}`),
        enabled: computed(() => !!category_id.value)
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
