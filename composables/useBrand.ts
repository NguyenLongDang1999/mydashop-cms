// ** Types Imports
import type { IBrandSearch } from '~/types/brand.type'

// ** State
const path = ref<string>(ROUTE.BRAND)

const search = reactive<IBrandSearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export default function () {
    return {
        path,
        search
    }
}
