export interface IAuthForm {
    email: string
    password: string
}

export interface IAuthProfile {
    access_token: string
    admins: {
        id: number
        email: string
        name: string
        role: number
        image_uri: string
    }
}
