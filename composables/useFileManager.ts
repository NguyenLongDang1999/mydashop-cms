// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** State
const path = ref<string>(ROUTE.FILE_MANAGER)
const pathURL = ref<string>('')

export const useFileManagerDataTable = () => {
    // ** Data
    const search = ref<string>()

    // ** Computed
    const pathSplit = computed(() => pathURL.value.split(','))

    // ** useHooks
    const { data, isFetching } = useQuery<{ ObjectName: string }[]>({
        queryKey: [path.value + 'DataTable', pathURL],
        queryFn: () => useFetcher(path.value, {
            params: { path: pathURL.value }
        }),
        placeholderData: keepPreviousData
    })

    return {
        search,
        isFetching,
        pathURL,
        pathSplit,
        dataTable: computed(() => data.value?.filter(({ ObjectName }: { ObjectName: string }) => ObjectName.toLowerCase().includes(search.value?.toLowerCase() || '')) || [])
    }
}

export const useFileManagerCreateFolder = () => {
    const queryClient = useQueryClient()

    return useMutation<{ folder_name: string }, Error, { folder_name: string }>({
        mutationFn: body => useFetcher(path.value, {
            method: 'POST',
            body,
            params: { path: pathURL.value }
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`, pathURL] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationMessage(MESSAGE.ERROR)
    })
}

export const useFileManagerUploadFile = () => {
    const queryClient = useQueryClient()

    return useMutation<File, Error, FormData>({
        mutationFn: body => useFetcher(path.value, {
            method: 'PUT',
            body,
            params: { path: pathURL.value }
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`, pathURL] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationMessage(MESSAGE.ERROR)
    })
}

export const useFileManagerDelete = () => {
    const queryClient = useQueryClient()

    return useMutation<{ folder_name: string, is_folder: boolean }, Error, { folder_name: string, is_folder: boolean }>({
        mutationFn: body => useFetcher(path.value, {
            method: 'DELETE',
            body,
            params: { path: pathURL.value }
        }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`, pathURL] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationMessage(MESSAGE.ERROR)
    })
}
