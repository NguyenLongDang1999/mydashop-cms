// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IAttributeValuesForm, IAttributeValuesSearch, IAttributeValuesTable } from '~/types/attribute.type'
import type { IDeleteRecord } from '~/types/core.type'

// ** State
const path = ref<string>(ROUTE.ATTRIBUTE_VALUES)

export const useAttributeValuesDataTable = () => {
    // ** Data
    const search = reactive<IAttributeValuesSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQuery<IAttributeValuesTable>({
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

export const useAttributeValuesFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IAttributeValuesForm, Error, IAttributeValuesForm>({
        mutationFn: body => useFetcher(body.id ? `${path.value}/${body.id}` : path.value, { method: body.id ? 'PATCH' : 'POST', body }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: error => useNotificationMessage(error.message)
    })
}

export const useAttributeValuesFormDelete = () => {
    const queryClient = useQueryClient()

    return useMutation<IDeleteRecord, Error, IDeleteRecord>({
        mutationFn: body => useFetcher(`${path.value}/remove/${body.id}`, { method: 'PATCH' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataTable`] })

            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}
