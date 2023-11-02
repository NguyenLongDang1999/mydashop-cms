// ** Third Party Imports
import { useQueries } from '@tanstack/vue-query'

// ** Types Imports
import type { IAttributeSearch } from '~/types/attribute.type'

// ** State
const path = ref<string>(ROUTE.ATTRIBUTE)
const attribute_id = ref<number[]>([])

const search = reactive<IAttributeSearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export default function () {
    return {
        path,
        search,
        attribute_id
    }
}

export const useAttributeValueList = () => {
    // ** Hooks
    const _fetcher = useFetchData()

    const queries = computed(() => attribute_id.value.map(_v => {
        return {
            queryKey: ['attributeValueList', _v],
            queryFn: () => _fetcher(`${path.value}/attribute-value-data-list/${_v}`),
            enabled: !!_v
        }
    }))

    return useQueries({ queries })
}
