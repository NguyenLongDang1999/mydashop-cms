// ** Types Imports
import type { ICouponsSearch } from '~/types/coupons.type'

// ** State
const path = ref<string>(ROUTE.COUPONS)

const search = reactive<ICouponsSearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export default function () {
    return {
        path,
        search
    }
}
