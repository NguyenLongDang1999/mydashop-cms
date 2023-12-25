// ** Third Party Imports
import { keepPreviousData, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IDeleteRecord } from '~/types/core.type'
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
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useSliderDetail = async () => {
    // ** useHooks
    const id = Number(useRoute().params.id)
    const { data, suspense } = useQueryFetch<ISliderForm>(path.value, `/${id}`, 'Detail', { id })

    await suspense()

    return {
        data: computed(() => data.value as ISliderForm || {})
    }
}

export const useSliderFormInput = () => {
    const queryClient = useQueryClient()

    return useQueryMutation<ISliderForm>(path.value, {
        onSuccess: (data, variables) => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataList`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataTable`] })

            if (variables.id) {
                queryClient.invalidateQueries({ queryKey: [`${path.value}Detail`, { id: variables.id }] })
            }

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}

export const useSliderFormDelete = () => {
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
