// ** Third Party Imports
import { useMutation, useQuery } from '@tanstack/vue-query'

// ** Types Imports
import type { IAuthForm, IAuthProfile } from '~/types/auth.type'

// ** State
const path = ref<string>(ROUTE.AUTHENTICATION)

export const useAuthLogin = () => {
    const route = useRoute()

    return useMutation<IAuthProfile, Error, IAuthForm>({
        mutationFn: body => useFetcher(`${path.value}/sign-in`, { method: 'POST', body }),
        onSuccess: data => {
            setToken(data.accessToken)
            setUserData(data.admins)

            navigateTo(route.query.to ? String(route.query.to) : '/')
            useNotification('Đăng nhập thành công!')
        },
        onError: () => useNotificationError(MESSAGE.ERROR)
    })
}

export const useAuthLogout = () => useQuery({
    queryKey: [path.value + 'Logout'],
    queryFn: () => useFetcher(path.value + '/sign-out')
})
