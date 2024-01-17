// ** Third Party Imports
import { keepPreviousData, useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IAttributeForm, IAttributeList, IAttributeSearch, IAttributeTable, IAttributeValues } from '~/types/attribute.type'
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
    const { data, isFetching } = useQuery<IAttributeTable>({
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

export const useAttributeDataList = () => {
    // ** useHooks
    const { data } = useQuery<IAttributeList[]>({
        queryKey: [path.value + 'DataList'],
        queryFn: () => useFetcher(path.value + '/data-list')
    })

    return computed(() => data.value || [])
}

export const useAttributeDetail = async () => {
    // ** useHooks
    const id = Number(useRoute().params.id)

    const { data, suspense } = useQuery<IAttributeForm>({
        queryKey: [path.value + 'Detail', id],
        queryFn: () => useFetcher(path.value + '/' + id)
    })

    await suspense()

    return {
        data: computed(() => data.value as IAttributeForm || {})
    }
}

export const useAttributeFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IAttributeForm, Error, IAttributeForm>({
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

export const useAttributeValuesFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<IAttributeValues, Error, IAttributeValues>({
        mutationFn: body => useFetcher(`${path.value}/attribute-values`, { method: 'POST', body }),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: [`${path.value}Detail`, { id: variables.id }] })

            useNotification(MESSAGE.DELETE)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}

export const useAttributeFormDelete = () => {
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
