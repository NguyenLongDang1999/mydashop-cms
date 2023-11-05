// ** Types Imports
import type { IFlashSaleSearch } from '~/types/flash-sale.type'

// ** State
const path = ref<string>(ROUTE.FLASH_SALE)

const search = reactive<IFlashSaleSearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export default function () {
    return {
        path,
        search
    }
}
