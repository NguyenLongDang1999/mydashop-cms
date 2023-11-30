// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IProductSearch, IProductTable, IProductUpload } from '~/types/product.type'

// ** State
const path = ref<string>(ROUTE.PRODUCT)
const galleryURL = reactive<IProductUpload[]>([])

const search = reactive<IProductSearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export default function () {
    return {
        path,
        search,
        galleryURL
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
        (body: Partial<IProductUpload> & { id?: number, image_id?: number }) => {
            const formData = new FormData()

            for (const item in body) {
                formData.append(item, (body as Record<string, string>)[item])
            }

            return body.image_id ?
                _fetcher(`${path.value}/${body.id}/upload/${body.image_id}`, { method: 'PATCH', body: formData }) :
                _fetcher(`${path.value}/${body.id}/upload`, { method: 'POST', body: formData })
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
