// ** Types Imports
import type { UseFetchOptions } from '#app'
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
        try {
            if (!refreshTokenLock.value) {
                refreshTokenLock.value = true

                refreshTokenPromise = new Promise<void>(async (resolve, reject) => {
                    useFetcher<IAuthProfile>('/auth/refresh', {
                        onResponse({ response: responseData }) {
                            setToken(responseData._data.accessToken)
                            resolve()

                            refreshTokenLock.value = false
                        },
                        onResponseError() {
                            removeToken()
                            removeUserData()
                            navigateTo(ROUTER.LOGIN)
                            reject()

                            refreshTokenLock.value = false
                        }
                    })
                })
            }

            await refreshTokenPromise
        } catch {
            removeToken()
            removeUserData()
            navigateTo(ROUTER.LOGIN)
        }
    }
}
