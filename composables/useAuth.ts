// ** Types Imports
import type { IAuthForm, IAuthProfile } from '~/types/auth.type'

// ** State
const path = ref<string>(ROUTE.AUTHENTICATION)

export const useAuthLogin = () => {
    const route = useRoute()

    return useQueryMutation<IAuthProfile, IAuthForm>(`${path.value}/sign-in`, {
        onSuccess: data => {
            setToken(data.accessToken)
            setUserData(data.admins)

            navigateTo(route.query.to ? String(route.query.to) : '/')
            useNotification('Đăng nhập thành công!')
        },
        onError: () => useNotificationError()
    })
}

export const useAuthLogout = () => useQueryFetch(path.value, '/sign-out', 'Logout', {}, {
    enabled: false
})
