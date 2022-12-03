// 车一页面选购的商品数据
export interface commodityInfo{
    quantity: number; 
    originalPrice: number;
}
// 设为默认地址
export interface defaultAddress{
    id?:number,
    provinceCode?:number,
    cityCode?:number,
    areaCode?:number,
    address?:string,
    isDefaultActive?:number,
    phoneNumber?:string,
    receiver?:string
}
// 点击选择地址
export interface code{ code: number; name: string; }
// 提交订单btn
export interface orderInfo{
    productId:number,//id
    quantity:number,//数量
}
export interface interfaceParameter{
    skuId:number,
    num:number,
}