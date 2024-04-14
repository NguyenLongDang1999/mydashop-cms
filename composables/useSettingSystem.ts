// ** Third Party Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

// ** Types Imports
import type { IMetadata, ISettingSystemForm } from '~/types/setting-system.type'

// ** State
const path = ref<string>(ROUTE.SYSTEM_SETTINGS)

const queryKey = {
    dataTable: `${path.value}-data-table`,
    dataList: `${path.value}-data-list`,
    retrieve: `${path.value}-retrieve`,
    metadata: `${path.value}-metadata`
}

export default function () {
    return {
        path
    }
}

export const useSettingSystemFormInput = () => {
    const queryClient = useQueryClient()

    return useMutation<ISettingSystemForm, Error, ISettingSystemForm>({
        mutationFn: body => useFetcher(body.id ? `${path.value}/${body.id}` : path.value, { method: body.id ? 'PATCH' : 'POST', body }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey.dataList] })
            queryClient.invalidateQueries({ queryKey: [queryKey.retrieve] })

            useNotification(MESSAGE.SUCCESS)
        },
        onError: error => useNotificationMessage(error.message)
    })
}

export const useSettingSystemDataList = (key?: string) => {
    // ** useHooks
    const { data, suspense } = useQuery({
        queryKey: [queryKey.dataList, key],
        queryFn: () => useFetcher(path.value, {
            params: { key }
        })
    })

    return {
        suspense,
        data: computed(() => data.value as ISettingSystemForm[])
    }
}

export const useSettingSystemRetrieve = () => {
    // ** useHooks
    const { data } = useQuery({
        queryKey: [queryKey.retrieve],
        queryFn: () => useFetcher(path.value)
    })

    return {
        data: computed(() => data.value as ISettingSystemForm[])
    }
}

export const useMetadata = async () => {
    // ** useHooks
    const { data, suspense } = useQuery({
        queryKey: [queryKey.metadata],
        queryFn: () => useFetcher(path.value + '/metadata')
    })

    await suspense()

    return {
        data: computed(() => data.value as IMetadata)
    }
}
