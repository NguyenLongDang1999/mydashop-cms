export interface IAuthForm {
    email: string
    password: string
}

export interface IAuthProfile {
    accessToken: string
    admins: {
        id: number
        email: string
        name: string
        role: number
        image_uri: string
    }
}
