// ** Third Party Imports
import { useMutation, useQuery, type MutationObserverOptions, type UseQueryOptions } from '@tanstack/vue-query'

// ** Types Imports
import type { MaybeRefDeep } from '@tanstack/vue-query/build/legacy/types'
import type { UseFetchOptions } from 'nuxt/dist/app/composables'
import type { KeysOf } from 'nuxt/dist/app/composables/asyncData'
import type { FetchContext, FetchResponse } from 'ofetch'
import type { IAuthProfile } from '~/types/auth.type'

export default function <T>(
    path: string,
    endpoint = '/data-list',
    queryKey = 'DataList',
    params = {},
    options?: UseQueryOptions<T, Error, T>
) {
    return useQuery<T>({
        queryKey: [path + queryKey, params],
        queryFn: () => useFetcher(path + endpoint, { params }),
        ...options
    })
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useQueryMutation = <T, U extends Record<string, any> = Record<string, any>>(
    path: string,
    options?: MaybeRefDeep<MutationObserverOptions<T, Error, U, unknown>>,
    purgeDelete = false
) => {
    return useMutation<T, Error, U, unknown>({
        mutationFn: body => {
            const opts = {
                newPath: path,
                method: 'POST'
            }

            if (body.id) {
                opts.method = purgeDelete ? 'DELETE' : 'PATCH'
                opts.newPath = `${path}/${body.id}`
            }

            return useFetcher<T>(opts.newPath, { method: opts.method, body })
        },
        ...options
    })
}

export const useQueryMutationDelete = <T>(
    path: string,
    options?: MaybeRefDeep<MutationObserverOptions<unknown, Error, T, unknown>>,
    method: 'DELETE' | 'PATCH' = 'PATCH'
) => {
    return useMutation<unknown, Error, T, unknown>({
        mutationFn: body => useFetcher<T>(`${path}/${body}`, { method }),
        ...options
    })
}

let refreshTokenPromise: Promise<void> | null = null
const refreshTokenLock = ref<boolean>(false)

export const useFetcher = async <T>(
    path: string,
    opts?: UseFetchOptions<unknown, unknown, KeysOf<unknown>, null, string, 'get' | 'GET' | 'POST' | 'DELETE' | 'PATCH'> | undefined
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
