// ** Third Party Imports
import { useQuery } from '@tanstack/vue-query'
import type { IProductSearch, IProductTable } from '~/types/product.type'

// ** Types Imports

// ** State
const path = ref<string>(ROUTE.PRODUCT)

const search = reactive<IProductSearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export default function () {
    return {
        path,
        search
    }
}

export const useProductSelected = async () => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { data, isLoading, isFetching, suspense } = useQuery<IProductTable>({
        queryKey: [`${path.value}DataTable`, search],
        queryFn: () => _fetcher(path.value, { params: search }),
        keepPreviousData: true
    })

    await suspense()

    // ** Computed
    const dataTable = computed(() => data.value?.data || [])
    const dataAggregations = computed(() => data.value?.aggregations || 0)

    return {
        isLoading,
        isFetching,
        dataTable,
        dataAggregations
    }
}
