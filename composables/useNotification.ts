export default function (description = 'Thao tác thành công!') {
    // ** Hooks
    const toast = useToast()

    toast.add({
        title: 'Thành Công',
        description,
        icon: 'i-heroicons-check-circle'
    })
}

export const useNotificationError = (description = 'Có lỗi xảy ra. Vui lòng kiểm tra lại!') => {
    // ** Hooks
    const toast = useToast()

    toast.add({
        title: 'Thất Bại',
        description: description,
        icon: 'i-heroicons-x-circle',
        color: 'red'
    })
}

export const useNotificationMessage = (message: string) => {
    switch (message) {
        case MESSAGE_ERROR.CONFLICT:
            return useNotificationError('Dữ liệu này đã tồn tại trong hệ thống!')

        default:
            return useNotificationError()
    }
}
