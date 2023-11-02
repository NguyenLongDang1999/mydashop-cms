// ** Third Party Imports
import { useMutation, useQuery } from '@tanstack/vue-query'

// ** Types Imports
import type { IAuthForm } from '~/types/auth.type'

// ** State
const path = ref<string>(ROUTE.AUTHENTICATION)

export const useAuthLogin = () => {
    // ** Hooks
    const route = useRoute()
    const _fetcher = useFetchData()

    const { isLoading, mutateAsync: authLogin } = useMutation(
        (body: IAuthForm) => _fetcher(`${path.value}/sign-in`, { method: 'POST', body }),
        {
            onSuccess: data => {
                setToken(data.accessToken)
                setUserData(data.admins)

                navigateTo(route.query.to ? String(route.query.to) : '/')
                useNotification('Đăng nhập thành công!')
            },
            onError: () => useNotification('Đăng nhập thất bại!', true)
        })

    return {
        isLoading,
        authLogin
    }
}

export const useAuthLogout = () => {
    // ** Hooks
    const _fetcher = useFetchData()

    const { refetch } = useQuery({
        queryKey: ['authLogout'],
        queryFn: () => _fetcher(`${path.value}/sign-out`),
        enabled: false,
        onSuccess: () => {
            removeToken()
            removeUserData()

            navigateTo(ROUTER.LOGIN)
            useNotification('Đăng xuất thành công!')
        },
        onError: () => useNotification('Đăng xuất thất bại!', true)
    })

    return { refetch }
}
