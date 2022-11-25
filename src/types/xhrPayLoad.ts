export interface LoginPayLoad {
    username: string,
    password: string
}

export interface RegisterPayload extends LoginPayLoad {
    phoneNumber: string
}
export interface ArticleValidate {
    title: string,
    content: string
}