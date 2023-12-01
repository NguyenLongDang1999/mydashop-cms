// ** Third Party Imports
import { useMutation, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IProductUpload } from '~/types/product.type'

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
