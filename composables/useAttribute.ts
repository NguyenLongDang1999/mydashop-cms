// ** Third Party Imports
import { keepPreviousData, useQueries, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IAttributeForm, IAttributeList, IAttributeSearch, IAttributeTable } from '~/types/attribute.type'
import type { IDeleteRecord } from '~/types/core.type'

// ** State
const path = ref<string>(ROUTE.ATTRIBUTE)

export default function () {
    return {
        path
    }
}

export const useAttributeValueList = () => {
    // ** Data
    const attribute_id = ref<number[]>([])

    const attributeData = useQueries({
        queries: computed(() => attribute_id.value.map(_v => {
            return {
                queryKey: ['attributeValueList', _v],
                queryFn: () => useFetcher(`${path.value}/attribute-value-data-list/${_v}`)
            }
        }))
    })

    // ** Computed
    const attributeValueList = computed(() => attributeData.value)

    return {
        attribute_id,
        attributeValueList
    }
}

export const useAttributeDataTable = () => {
    // ** Data
    const search = reactive<IAttributeSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQueryFetch<IAttributeTable>(path.value, '', 'DataTable', search, {
        placeholderData: keepPreviousData
    })

    return {
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useAttributeDataList = () => {
    // ** useHooks
    const { data } = useQueryFetch<IAttributeList[]>(path.value)

    return computed(() => data.value || [])
}

export const useAttributeDetail = async () => {
    // ** useHooks
    const id = Number(useRoute().params.id)
    const { data, suspense } = useQueryFetch<IAttributeForm>(path.value, `/${id}`, 'Detail', { id })

    await suspense()

    return {
        data: computed(() => data.value as IAttributeForm || {})
    }
}

export const useAttributeFormInput = () => {
    const queryClient = useQueryClient()

    return useQueryMutation<IAttributeForm>(path.value, {
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

export const useAttributeFormDelete = () => {
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
