// ** Types Imports
import type { IProductSearch } from '~/types/product.type'

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
