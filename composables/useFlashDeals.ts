// ** Third Party Imports
import { useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IFlashDealsForm, IFlashDealsSearch } from '~/types/flash-deals.type'

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

export const useFlashDealFormInput = (methods: 'POST' | 'PATCH' = 'POST') => {
    const queryClient = useQueryClient()

    return useQueryMutation<IFlashDealsForm>(path.value, {
        onSuccess: (data, variables) => {
            queryClient.refetchQueries({ queryKey: [`${path.value}DataTable`] })
            queryClient.invalidateQueries({ queryKey: [`${path.value}DataList`] })

            if (methods === 'PATCH') {
                queryClient.setQueryData([`${path.value}Detail`, { id: variables.id }], data)
            }

            useNotification(MESSAGE.SUCCESS)
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    }, methods)
}
