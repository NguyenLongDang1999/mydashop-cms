// ** Access Token
export const setToken = (token: string) => {
    return localStorage.setItem(AUTH.TOKEN, token)
}

export const getToken = () => {
    return localStorage.getItem(AUTH.TOKEN)
}

export const removeToken = () => {
    return localStorage.removeItem(AUTH.TOKEN)
}

// ** User Data
export const setUserData = (user: unknown) => {
    return localStorage.setItem(AUTH.USER_DATA, JSON.stringify(user))
}

export const getUserData = () => {
    return localStorage.getItem(AUTH.USER_DATA)
}

export const removeUserData = () => {
    return localStorage.removeItem(AUTH.USER_DATA)
}
