// ** Types Imports
import type { IFlashDealsSearch } from '~/types/flash-deals.type'

// ** State
const path = ref<string>(ROUTE.FLASH_DEALS)

const search = reactive<IFlashDealsSearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export default function () {
    return {
        path,
        search
    }
}
