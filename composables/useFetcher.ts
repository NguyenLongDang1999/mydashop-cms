// ** Types Imports
import type { UseFetchOptions } from 'nuxt/dist/app/composables'
import type { FetchContext, FetchResponse } from 'ofetch'
import type { IAuthProfile } from '~/types/auth.type'

let refreshTokenPromise: Promise<void> | null = null
const refreshTokenLock = ref<boolean>(false)

export const useFetcher = async <T>(
    path: string,
    opts?: UseFetchOptions<unknown> | undefined
): Promise<T> => {
    const config = useRuntimeConfig()

    if (refreshTokenLock.value) {
        await refreshTokenPromise
    }

    try {
        const { data, error } = await useFetch(path, {
            baseURL: config.public.apiBase,
            credentials: 'include',
            headers: useRequestHeaders(),
            keepalive: true,
            onRequest,
            onResponseError,
            ...opts
        })

        if (error.value) {
            if (error.value?.data?.message) {
                throw new Error(error.value?.data?.message || 'An unknown error occurred during data fetching.')
            }

            throw new Error(error.value?.data?.error || 'An unknown error occurred during data fetching.')
        }

        if (!data.value) {
            throw new Error('No data returned from the fetch operation.')
        }

        return data.value as T
    } catch (err: unknown) {
        throw new Error(err instanceof Error ? err.message : 'An error occurred during data fetching.')
    }
}

const onRequest = ({ options, request }: FetchContext) => {
    if (request !== 'auth/sign-in') {
        const access_token = JSON.parse(getToken() || 'null')

        if (access_token) {
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${access_token}`
            }
        }
    }
}

const onResponseError = async ({ response }: FetchContext & { response: FetchResponse<ResponseType> }) => {
    if (
        response.status === 401 &&
        !response.ok
    ) {
        if (!refreshTokenLock.value) {
            refreshTokenLock.value = true

            refreshTokenPromise = new Promise<void>(async (resolve, reject) => {
                try {
                    const res = await useFetcher<IAuthProfile>('/auth/refresh')

                    setToken(res.accessToken)
                    resolve()
                } catch {
                    removeToken()
                    removeUserData()
                    navigateTo(ROUTER.LOGIN)
                    reject()
                } finally {
                    refreshTokenLock.value = false
                }
            })
        }

        await refreshTokenPromise
    }
}
