// ** Third Party Imports
import { useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { ICategoryForm, ICategoryList, ICategorySearch, ICategoryTable } from '~/types/category.type'

// ** State
const path = ref<string>(ROUTE.CATEGORY)
const key = `${path.value}:`

export default function () {
    return {
        path
    }
}

export const useCategoryDataTable = () => {
    const { query } = useRoute()

    // ** Data
    const search = reactive<ICategorySearch>({
        ...query,
        page: Number(query.page) || PAGE.CURRENT,
        pageSize: PAGE.SIZE
    })

    const watch = objectToQueryString(search)

    // ** useHooks
    const { data, pending: isFetching } = useFetchAPI<ICategoryTable>(path.value, {
        key: key + watch,
        watch: [watch],
        query: search
    })

    return {
        path,
        search,
        isFetching,
        dataTable: computed(() => data.value?.data || []),
        dataAggregations: computed(() => data.value?.aggregations || 0)
    }
}

export const useCategoryDataList = (immediate = true) => {
    // ** useHooks
    const { data } = useFetchAPI<ICategoryList[]>(`${path.value}/data-list`, {
        key: key + 'DataList',
        immediate
    })

    return computed(() => data.value || [])
}

export const useCategoryDetail = async () => {
    // ** useHooks
    const { id } = useRoute().params

    const { data } = await useFetchAPI<ICategoryForm>(`${path.value}/${id}`, {
        key: key + id,
        lazy: false
    })

    return {
        path,
        data: computed(() => data.value as ICategoryForm || {})
    }
}

export const useCategoryFormInput = (methods: 'POST' | 'PATCH' = 'POST') => {
    // const { data } = useFetchAPI<ICategoryForm>(path.value, {

    // })

    const queryClient = useQueryClient()

    return useQueryMutation<ICategoryForm>(path.value, {
        onSuccess: (data, variables) => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })

            if (methods === 'PATCH') {
                queryClient.invalidateQueries({ queryKey: [`${path.value}Detail`, { id: variables.id }] })
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
