// ** Types Imports
import type { ICategorySearch } from '~/types/category.type'

// ** State
const path = ref<string>(ROUTE.CATEGORY)

const search = reactive<ICategorySearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export default function () {
    return {
        path,
        search
    }
}
