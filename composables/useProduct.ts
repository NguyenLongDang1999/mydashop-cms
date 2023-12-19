// ** Third Party Imports
import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IAttributeList } from '~/types/attribute.type'
import type { IBrandList } from '~/types/brand.type'
import type { IProductForm, IProductList, IProductSearch, IProductTable, IProductUpload } from '~/types/product.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT)
const galleryURL = reactive<IProductUpload[]>([])

export default function () {
    return {
        path,
        galleryURL
    }
}

export const useProductUpload = () => {
    // // ** Hooks
    // const _fetcher = useFetchData()
    // const queryClient = useQueryClient()

    // const { isLoading, mutateAsync: dataFormInput } = useMutation(
    //     (body: Partial<IProductUpload> & { id?: number, image_id?: number }) => {
    //         const formData = new FormData()

    //         for (const item in body) {
    //             formData.append(item, (body as Record<string, string>)[item])
    //         }

    //         return body.image_id ?
    //             _fetcher(`${path.value}/${body.id}/upload/${body.image_id}`, { method: 'PATCH', body: formData }) :
    //             _fetcher(`${path.value}/${body.id}/upload`, { method: 'POST', body: formData })
    //     },
    //     {
    //         onSuccess: () => {
    //             queryClient.invalidateQueries({ queryKey: [`${path}Detail`] })
    //             useNotification('Đã lưu dữ liệu thành công!')
    //         },
    //         onError: () => useNotification('Bị lỗi trong quá trình xử lý!', true)
    //     })

    // return {
    //     isLoading,
    //     dataFormInput
    // }
}

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
        path,
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
    const route = useRoute()
    const id = Number(route.params.id)
    const { data, suspense } = useQueryFetch<IProductForm>(path.value, `/${id}`, 'Detail', { id })

    await suspense()

    return {
        path,
        data: computed(() => data.value as IProductForm || {})
    }
}

export const useProductFormInput = (methods: 'POST' | 'PATCH' = 'POST') => {
    const queryClient = useQueryClient()

    return useQueryMutation<IProductForm>(path.value, {
        onSuccess: (data, variables) => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataList`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataTable`] })

            if (methods === 'PATCH') {
                queryClient.invalidateQueries({ queryKey: [`${path.value}Detail`, { id: variables.id }] })
            }

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    }, methods)
}

export const useProductFormDelete = () => {
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
