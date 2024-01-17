// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

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
    const { data, isFetching } = useQuery<IBrandTable>({
        queryKey: [path.value + 'DataTable', search],
        queryFn: () => useFetcher(path.value, { params: search }),
        placeholderData: keepPreviousData
    })

    provide('search', search)

    return {
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useBrandDataList = () => {
    // ** useHooks
    const { data } = useQuery<IBrandList[]>({
        queryKey: [path.value + 'DataList'],
        queryFn: () => useFetcher(path.value + '/data-list')
    })

    return computed(() => data.value || [])
}

export const useBrandDetail = async () => {
    // ** useHooks
    const id = Number(useRoute().params.id)

    const { data, suspense } = useQuery<IBrandForm>({
        queryKey: [path.value + 'Detail', id],
        queryFn: () => useFetcher(path.value + '/' + id)
    })

    await suspense()

    return {
        data: computed(() => data.value as IBrandForm || {})
    }
}

export const useBrandFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IBrandForm, Error, IBrandForm>({
        mutationFn: body => useFetcher(body.id ? `${path.value}/${body.id}` : path.value, { method: body.id ? 'PATCH' : 'POST', body }),
        onSuccess: (_data, variables) => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            if (variables.id) queryClient.invalidateQueries({ queryKey: [`${path.value}Detail`, { id: variables.id }] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}

export const useBrandFormDelete = () => {
    const queryClient = useQueryClient()

    return useMutation<IDeleteRecord, Error, IDeleteRecord>({
        mutationFn: body => useFetcher(`${path.value}/remove/${body.id}`, { method: 'PATCH' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataTable`] })

            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}
