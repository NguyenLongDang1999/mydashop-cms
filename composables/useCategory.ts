// ** Third Party Imports
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { ICategoryForm, ICategoryList, ICategorySearch, ICategoryTable } from '~/types/category.type'
import type { IDeleteRecord } from '~/types/core.type'

// ** State
const path = ref<string>(ROUTE.CATEGORY)

export default function () {
    return {
        path
    }
}

export const useCategoryDataTable = () => {
    // ** Data
    const search = reactive<ICategorySearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQuery<ICategoryTable>({
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

export const useCategoryDataList = () => {
    // ** useHooks
    const { data } = useQuery<ICategoryList[]>({
        queryKey: [path.value + 'DataList'],
        queryFn: () => useFetcher(path.value + '/data-list')
    })

    return computed(() => data.value || [])
}

export const useCategoryRetrieve = async () => {
    // ** useHooks
    const { params } = useRoute()

    const { data, suspense } = useQuery<ICategoryForm>({
        queryKey: [path.value + 'Detail', params.id],
        queryFn: () => useFetcher(path.value + '/' + params.id)
    })

    await suspense()

    return {
        data: computed(() => data.value as ICategoryForm || {})
    }
}

export const useCategoryFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<ICategoryForm, Error, ICategoryForm>({
        mutationFn: body => useFetcher(body.id ? `${path.value}/${body.id}` : path.value, { method: body.id ? 'PATCH' : 'POST', body }),
        onSuccess: (_data, variables) => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })
            if (variables.id) queryClient.invalidateQueries({ queryKey: [`${path.value}Detail`, { id: variables.id }] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: error => useNotificationMessage(error.message)
    })
}

export const useCategoryFormDelete = () => {
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
