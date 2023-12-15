// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Interface
interface ICrudTable<T> {
    params?: Partial<T>
}

const imageURL = ref()

export default function () {
    return {
        imageURL
    }
}

export const useCrudDataList = <T>(path: string, subPath = '/data-list', subKey = 'DataList') => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { isLoading, data } = useQuery<T[]>({
        queryKey: [path + subKey],
        queryFn: () => _fetcher(path + subPath)
    })

    // ** Computed
    const dataList = computed(() => data.value || [])

    return { dataList, isLoading }
}

export const useCrudDataTable = <T, U>(path: string, params: ICrudTable<U>) => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { data, isLoading, isFetching } = useQuery<T>({
        queryKey: [`${path}DataTable`, params.params],
        queryFn: () => _fetcher(path, { params: params.params }),
        keepPreviousData: true
    })

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

export const useCrudDetail = async <T>(path: string, id: number | string) => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { data: row, isLoading, suspense } = useQuery<T>({
        queryKey: [`${path}Detail`, id],
        queryFn: () => _fetcher(`${path}/${id}`)
    })

    // ** Computed
    const data = computed(() => row.value as T)

    await suspense()

    return {
        data,
        isLoading
    }
}

export const useCrudFormInput = <T>(path: string) => {
    // ** Hooks
    const _fetcher = useFetchData()
    const queryClient = useQueryClient()

    const { isLoading, mutateAsync: dataFormInput } = useMutation(
        async (body: Partial<T> & { id?: number }) => {
            const formData = new FormData()

            for (const item in body) {
                const value = (body as Record<string, string>)[item]
                if (value) formData.append(item, value)
            }

            if (imageURL.value) formData.append('image_uri', imageURL.value)

            formData.delete('id')

            return body.id ?
                _fetcher(`${path}/${body.id}`, { method: 'PATCH', body: imageURL.value ? formData : body }) :
                _fetcher(`${path}`, { method: 'POST', body: imageURL.value ? formData : body })
        },
        {
            onSuccess: () => {
                queryClient.refetchQueries({ queryKey: [`${path}DataTable`] })
                queryClient.invalidateQueries({ queryKey: [`${path}Detail`] })
                queryClient.invalidateQueries({ queryKey: [`${path}DataList`] })
                useNotification('Đã lưu dữ liệu thành công!')

                imageURL.value = undefined
            },
            onError: () => useNotification('Bị lỗi trong quá trình xử lý!', true)
        })

    return {
        isLoading,
        dataFormInput
    }
}
