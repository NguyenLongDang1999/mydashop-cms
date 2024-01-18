// ** Third Party Imports
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

// ** Types Imports
import type { IOrdersSearch, IOrdersTable } from '~/types/orders.type'

// ** State
const path = ref<string>(ROUTE.ORDERS)

export const useOrdersDataTable = () => {
    // ** Data
    const search = reactive<IOrdersSearch>({
        page: PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    // ** useHooks
    const { data, isFetching } = useQuery<IOrdersTable>({
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

export const useOrdersDetail = async () => {
    // ** useHooks
    const id = Number(useRoute().params.id)

    const { data, suspense } = useQuery<ICategoryForm>({
        queryKey: [path.value + 'Detail', id],
        queryFn: () => useFetcher(path.value + '/' + id)
    })

    await suspense()

    return {
        data: computed(() => data.value as ICategoryForm || {})
    }
}
