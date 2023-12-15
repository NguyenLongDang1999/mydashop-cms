// ** Third Party Imports
import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IBrandForm, IBrandList, IBrandSearch, IBrandTable } from '~/types/brand.type'

// ** State
const path = ref<string>(ROUTE.BRAND)


export default function () {
    return {
        path
    }
}

export const useBrandDataTable = () => {
    // ** Data
    const search = reactive<IBrandSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQueryFetch<IBrandTable>(path.value, '', 'DataTable', search, {
        placeholderData: keepPreviousData
    })

    return {
        path,
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useBrandDataList = () => {
    // ** useHooks
    const { data } = useQueryFetch<IBrandList[]>(path.value)

    return computed(() => data.value || [])
}

export const useBrandDetail = async () => {
    // ** useHooks
    const route = useRoute()
    const { data, suspense } = useQueryFetch<IBrandForm>(path.value, `/${route.params.id}`, 'Detail', { id: route.params.id })

    await suspense()

    return {
        path,
        data: computed(() => data.value as IBrandForm || {})
    }
}

export const useBrandFormInput = (methods: 'POST' | 'PATCH' = 'POST') => {
    const queryClient = useQueryClient()

    return useQueryMutation<IBrandForm>(path.value, {
        onSuccess: (data, variables) => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataList`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataTable`] })

            if (methods === 'PATCH') {
                queryClient.setQueryData([`${path.value}Detail`, { id: variables.id }], data)
            }

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    }, methods)
}

export const useBrandFormDelete = () => {
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
