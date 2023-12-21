// ** State
const storageName = 'images-data/'

// ** Interface
interface IFileManagerFormInput {
    HttpCode: number
    Message: string
}

const key: string = 'file-manager:'

export default function () {
    return {
    }
}

export const useFileManagerDataTable = () => {
    // ** useHooks
    const route = useRoute()
    const config = useRuntimeConfig()

    // ** Data
    const search = ref<string>('')

    // ** Computed
    const checkPath = computed(() => route.params.path && route.params.path.length)
    const pathName = computed(() => checkPath.value ? `${(route.params.path as string[]).join('/')}/` : '')

    const { data, pending } = useLazyFetch<unknown[]>(storageName + pathName.value, {
        key: key + pathName.value,
        baseURL: config.public.bunnyApiBase,
        headers: {
            Accesskey: config.public.bunnyAccessKey
        },
        server: false,
        keepalive: true
    })

    return {
        route,
        search,
        pathName,
        isFetching: pending,
        dataTable: computed(() => data.value?.filter(_d => _d.ObjectName.toLowerCase().includes(search.value?.toLowerCase() || '')) || [])
    }
}

export const useFileManagerCreateFolder = async (folder_name: string, isFolder = true) => {
    // ** useHooks
    const route = useRoute()
    const config = useRuntimeConfig()

    // ** Computed
    const checkPath = computed(() => route.params.path && route.params.path.length)
    const pathName = computed(() => checkPath.value ? (route.params.path as string[]).join('/') + '/' + folder_name : folder_name)
    const pathKey = computed(() => checkPath.value ? `${(route.params.path as string[]).join('/')}/` : '')

    const { data, pending } = await useLazyFetch<IFileManagerFormInput>(storageName + pathName.value + (isFolder ? '/' : ''), {
        baseURL: config.public.bunnyApiBase,
        headers: {
            Accesskey: config.public.bunnyAccessKey
        },
        server: false,
        keepalive: true,
        method: 'PUT',
        body: {}
    })

    if (data.value?.HttpCode === 201) {
        useNotification(MESSAGE.SUCCESS)
        await refreshNuxtData(key + pathKey.value)
    }

    return {
        isFetching: pending
    }
}

export const useFileManagerUploadFile = async (folder_name: string, fileName: File) => {
    // ** useHooks
    const route = useRoute()
    const config = useRuntimeConfig()

    // ** Computed
    const checkPath = computed(() => route.params.path && route.params.path.length)
    const pathName = computed(() => checkPath.value ? (route.params.path as string[]).join('/') + '/' + folder_name : folder_name)
    const pathKey = computed(() => checkPath.value ? `${(route.params.path as string[]).join('/')}/` : '')

    const { data, pending } = await useLazyFetch<IFileManagerFormInput>(storageName + pathName.value, {
        baseURL: config.public.bunnyApiBase,
        headers: {
            Accesskey: config.public.bunnyAccessKey
        },
        method: 'PUT',
        body: fileName
    })

    if (data.value?.HttpCode === 201) {
        useNotification(MESSAGE.SUCCESS)
        await refreshNuxtData(key + pathKey.value)
    }

    return {
        isFetching: pending
    }
}

export const useFileManagerDelete = async (folder_name: string, isFolder = true) => {
    // ** useHooks
    const route = useRoute()
    const config = useRuntimeConfig()

    // ** Computed
    const checkPath = computed(() => route.params.path && route.params.path.length)
    const pathName = computed(() => checkPath.value ? (route.params.path as string[]).join('/') + '/' + folder_name : folder_name)
    const pathKey = computed(() => checkPath.value ? `${(route.params.path as string[]).join('/')}/` : '')

    const { data, pending } = await useLazyFetch<IFileManagerFormInput>(storageName + pathName.value + (isFolder ? '/' : ''), {
        baseURL: config.public.bunnyApiBase,
        headers: {
            Accesskey: config.public.bunnyAccessKey
        },
        server: false,
        keepalive: true,
        method: 'DELETE',
        body: {}
    })

    if (data.value?.HttpCode === 200) {
        useNotification(MESSAGE.SUCCESS)
        await refreshNuxtData(key + pathKey.value)
    }

    return {
        isFetching: pending
    }
}
