// ** Third Party Imports
import { ofetch } from 'ofetch'

export default function () {
    const _fetcher = ofetch.create({
        baseURL: config.baseURL,
        credentials: 'include',
        headers: {
            Accept: 'application/json'
        },
        retry: 1,
        keepalive: true,
        onRequest: async ({ request, options }) => {
            if (request !== 'auth/sign-in') {
                const access_token = JSON.parse(getToken() || 'null')

                if (access_token) {
                    options.headers = {
                        ...options.headers,
                        Authorization: `Bearer ${access_token}`
                    }
                }
            }
        },
        onResponseError: async ({ response }) => {
            if (
                response.status === 401 &&
                !response.ok
            ) {
                try {
                    const data = await _fetcher('/auth/refresh')

                    setToken(data.accessToken)
                } catch {
                    removeToken()
                    removeUserData()
                    navigateTo(ROUTER.LOGIN)
                }
            }
        }
    })
}
