// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** State
const storageName = '/images-data/'

// ** Interface
interface IFileManagerFormInput {
    HttpCode: number
    Message: string
}

interface IFileManagerUploadFile {
    fileName: string
    fileRaw: File
}

interface IFileManagerDeleteFile {
    isFolder: boolean
    fileName: string
}

const key: string = 'file-manager:'

export const useFileManagerDataTable = () => {
    // ** useHooks
    const route = useRoute()
    const config = useRuntimeConfig()

    // ** Data
    const search = ref<string>('')

    // ** Computed
    const pathSplit = computed(() => (route.query.path as string)?.split(','))
    const pathName = computed(() => pathSplit.value?.join('/') || '/')

    const { data, isFetching, refetch } = useQuery<unknown[]>({
        queryKey: [key + pathName.value],
        queryFn: () => useLazyFetch(pathName.value + '/', {
            baseURL: config.public.bunnyApiBase + storageName,
            keepalive: true,
            server: false,
            headers: {
                Accesskey: config.public.bunnyAccessKey
            }
        })
    })

    // ** Watch
    watch(() => route.query, () => refetch())

    return {
        route,
        search,
        pathName,
        pathSplit,
        isFetching,
        dataTable: computed(() => data.value?.data?.filter(({ ObjectName }: { ObjectName: string }) => ObjectName.toLowerCase().includes(search.value?.toLowerCase() || '')) || [])
    }
}

export const useFileManagerCreateFolder = (isFolder = true) => {
    // ** useHooks
    const route = useRoute()
    const config = useRuntimeConfig()
    const queryClient = useQueryClient()

    // ** Computed
    const pathName = computed(() => (route.query.path as string)?.split(',').join('/') || '/')

    return useMutation<IFileManagerFormInput>({
        mutationFn: body => useLazyFetch(pathName.value + '/' + `${isFolder ? body + '/' : ''}`, {
            baseURL: config.public.bunnyApiBase + storageName,
            keepalive: true,
            server: false,
            method: 'PUT',
            headers: {
                Accesskey: config.public.bunnyAccessKey
            },
            body: {}
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key + pathName.value] })
            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotification(MESSAGE.ERROR)
    })
}

export const useFileManagerUploadFile = () => {
    // ** useHooks
    const route = useRoute()
    const config = useRuntimeConfig()
    const queryClient = useQueryClient()

    // ** Computed
    const pathName = computed(() => (route.query.path as string)?.split(',').join('/') || '/')

    return useMutation<IFileManagerFormInput, Error, IFileManagerUploadFile>({
        mutationFn: body => useLazyFetch(pathName.value + '/' + body.fileName, {
            baseURL: config.public.bunnyApiBase + storageName,
            method: 'PUT',
            headers: {
                Accesskey: config.public.bunnyAccessKey
            },
            body: body.fileRaw
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key + pathName.value] })
            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotification(MESSAGE.ERROR)
    })
}

export const useFileManagerDelete = () => {
    // ** useHooks
    const route = useRoute()
    const config = useRuntimeConfig()
    const queryClient = useQueryClient()

    // ** Computed
    const pathName = computed(() => (route.query.path as string)?.split(',').join('/') || '/')

    return useMutation<IFileManagerFormInput, Error, IFileManagerDeleteFile>({
        mutationFn: body => useLazyFetch(pathName.value + '/' + `${body.isFolder ? body.fileName + '/' : ''}`, {
            baseURL: config.public.bunnyApiBase + storageName,
            keepalive: true,
            server: false,
            method: 'DELETE',
            headers: {
                Accesskey: config.public.bunnyAccessKey
            },
            body: {}
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key + pathName.value] })
            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotification(MESSAGE.ERROR)
    })
}
