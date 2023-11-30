// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { IProductSearch, IProductTable } from '~/types/product.type'

// ** Types Imports

// ** State
const path = ref<string>(ROUTE.PRODUCT)
const galleryURL = reactive<{ slug: string, image_uri: File }[]>([])

const search = reactive<IProductSearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export default function () {
    return {
        path,
        search
    }
}

export const useProductSelected = async () => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { data, isLoading, isFetching, suspense } = useQuery<IProductTable>({
        queryKey: [`${path.value}DataTable`, search],
        queryFn: () => _fetcher(path.value, { params: search }),
        keepPreviousData: true
    })

    await suspense()

    // ** Computed
    const dataTable = computed(() => data.value?.data || [])
    const dataAggregations = computed(() => data.value?.aggregations || 0)

    return {
        isLoading,
        isFetching,
        dataTable,
        dataAggregations
    }
}

export const useProductUpload = () => {
    // ** Hooks
    const _fetcher = useFetchData()
    const queryClient = useQueryClient()

    const { isLoading, mutateAsync: dataFormInput } = useMutation(
        (body: Partial<T> & { id?: number }) => {
            const formData = new FormData()

            for (const item in body) {
                const value = (body as Record<string, string>)[item]
                if (value) formData.append(item, value)
            }

            // if (imageURL.value) formData.append('image_uri', imageURL.value)

            formData.delete('id')

            return _fetcher(`${path}/${body.id}`, { method: 'PATCH', body: formData })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [`${path}Detail`] })
                useNotification('Đã lưu dữ liệu thành công!')
            },
            onError: () => useNotification('Bị lỗi trong quá trình xử lý!', true)
        })

    return {
        isLoading,
        dataFormInput
    }
}
