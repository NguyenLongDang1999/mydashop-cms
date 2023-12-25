// ** Third Party Imports
import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IBrandForm, IBrandList, IBrandSearch, IBrandTable } from '~/types/brand.type'
import type { IDeleteRecord } from '~/types/core.type'

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
    const id = Number(useRoute().params.id)
    const { data, suspense } = useQueryFetch<IBrandForm>(path.value, `/${id}`, 'Detail', { id })

    await suspense()

    return {
        data: computed(() => data.value as IBrandForm || {})
    }
}

export const useBrandFormInput = () => {
    const queryClient = useQueryClient()

    return useQueryMutation<IBrandForm>(path.value, {
        onSuccess: (data, variables) => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })

            if (variables.id) {
                queryClient.invalidateQueries({ queryKey: [`${path.value}Detail`, { id: variables.id }] })
            }

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}

export const useBrandFormDelete = () => {
    const queryClient = useQueryClient()

    return useQueryMutation<IDeleteRecord>(path.value + '/remove', {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataTable`] })
            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}
