export default function (description = 'Unknown', isFailed = false) {
    // ** Hooks
    const toast = useToast()

    toast.add({
        title: isFailed ? 'Thất Bại' : 'Thành Công',
        description: description,
        icon: isFailed ? 'i-heroicons-x-circle' : 'i-heroicons-check-circle',
        color: isFailed ? 'red' : undefined
    })
}
