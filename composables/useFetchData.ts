// ** Third Party Imports
import { ofetch } from 'ofetch'

export default function () {
    return ofetch.create({
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
        onResponseError: ({ response }) => {
            if (!response.ok && response.status === 401) {
                navigateTo(ROUTER.LOGIN)
            }
        }
    })
}
