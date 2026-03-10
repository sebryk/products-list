export type AuthUser = {
   id: number
   username: string
   email?: string
   firstName: string
   lastName?: string
   gender?: string
   image?: string
}

export type AuthSession = {
   accessToken: string
   refreshToken: string
   user: AuthUser
   rememberMe: boolean
}
