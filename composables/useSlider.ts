// ** Types Imports
import type { ISliderSearch } from '~/types/slider.type'

// ** State
const path = ref<string>(ROUTE.SLIDER)

const search = reactive<ISliderSearch>({
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
})

export default function () {
    return {
        path,
        search
    }
}
