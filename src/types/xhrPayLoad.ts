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
//购物车新增地址
export interface AddressPayLoad {
    address: string,
    phone: string, 
    lockPhone:string,
    name:string,
}