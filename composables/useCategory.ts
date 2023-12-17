// ** Third Party Imports
import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { ICategoryForm, ICategoryList, ICategorySearch, ICategoryTable } from '~/types/category.type'

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
    const { data, isFetching } = useQueryFetch<ICategoryTable>(path.value, '', 'DataTable', search, {
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

export const useCategoryDataList = () => {
    // ** useHooks
    const { data } = useQueryFetch<ICategoryList[]>(path.value)

    return computed(() => data.value || [])
}

export const useCategoryDetail = async () => {
    // ** useHooks
    const route = useRoute()
    const id = Number(route.params.id)
    const { data, suspense } = useQueryFetch<ICategoryForm>(path.value, `/${id}`, 'Detail', { id })

    await suspense()

    return {
        path,
        data: computed(() => data.value as ICategoryForm || {})
    }
}

export const useCategoryFormInput = (methods: 'POST' | 'PATCH' = 'POST') => {
    const queryClient = useQueryClient()

    return useQueryMutation<ICategoryForm>(path.value, {
        onSuccess: (data, variables) => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })

            if (methods === 'PATCH') {
                queryClient.setQueryData([`${path.value}Detail`, { id: variables.id }], data)
            }

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    }, methods)
}

export const useCategoryFormDelete = () => {
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
