// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IDeleteRecord } from '~/types/core.type'
import type { IPagesForm, IPagesSearch, IPagesTable } from '~/types/pages.type'

// ** State
const path = ref<string>(ROUTE.PAGES)

export const usePagesDataTable = () => {
    // ** Data
    const search = reactive<IPagesSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQuery<IPagesTable>({
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

export const usePagesDetail = async () => {
    // ** useHooks
    const id = Number(useRoute().params.id)

    const { data, suspense } = useQuery<IPagesForm>({
        queryKey: [path.value + 'Detail', id],
        queryFn: () => useFetcher(path.value + '/' + id)
    })

    await suspense()

    return {
        data: computed(() => data.value as IPagesForm || {})
    }
}

export const usePagesFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IPagesForm, Error, IPagesForm>({
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

export const usePagesFormDelete = () => {
    const queryClient = useQueryClient()

    return useMutation<IDeleteRecord, Error, IDeleteRecord>({
        mutationFn: body => useFetcher(`${path.value}/${body.id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataTable`] })

            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}
