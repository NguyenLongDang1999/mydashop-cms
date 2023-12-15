// ** Third Party Imports
import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { ISliderForm, ISliderSearch, ISliderTable } from '~/types/slider.type'

// ** State
const path = ref<string>(ROUTE.SLIDER)

export default function () {
    return {
        path
    }
}

export const useSliderDataTable = () => {
    // ** Data
    const search = reactive<ISliderSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQueryFetch<ISliderTable>(path.value, '', 'DataTable', search, {
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

export const useSliderDetail = async () => {
    // ** useHooks
    const route = useRoute()
    const { data, suspense } = useQueryFetch<ISliderForm>(path.value, `/${route.params.id}`, 'Detail', { id: route.params.id })

    await suspense()

    return {
        path,
        data: computed(() => data.value as ISliderForm || {})
    }
}

export const useSliderFormInput = (methods: 'POST' | 'PATCH' = 'POST') => {
    const queryClient = useQueryClient()

    return useQueryMutation<ISliderForm>(path.value, {
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

export const useSliderFormDelete = () => {
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
