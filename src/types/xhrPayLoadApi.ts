import type { LocationQueryValue } from "vue-router";
//api
export interface address{
    provinceCode:number, cityCode:number, areaCode:number,
    address:string,phoneNumber:string,receiver:string,id:number,
}
//登录
export interface login{
    username?:string,
    password?:string,
}
//注册
export interface register{
    username?:string,	
    password?:string,	
    avatarName?:string,	
    phoneNumber?:string,	
}

//获取菜肴列表接口
export interface gatFoodList{
    pageSize?:number,
    pageNum?:number,
    categoryId?:number,
}
//获取菜肴详情接口
export interface gatFoodDetail{
    foodId?:number,
}
//菜肴评价列表接口
export interface foodAppraiseList{
    foodId?:LocationQueryValue | LocationQueryValue[],
    pageSize?:number,
    pageNum?:number,
}
//新增菜肴评价
export interface addFoodAppraise{
    userId?:number,
    foodId?:LocationQueryValue | LocationQueryValue[],
    content?:string,
    star?:number,
    isRealName?:number,
}
//删除我的购物车
export interface cartDelete{
    id?:number,
}
//加入购物车
export interface addShoppingCart{
    id?:number,
    productId?:LocationQueryValue | LocationQueryValue[],
    quantity?:number,
}
//新增收货地址
export interface addressCreate{
    provinceCode?:number,
    cityCode?:number,
    areaCode?:number,
    address?:string,
    townCode?:number,
    isDefaultActive?:string,
    phoneNumber?:string,
    receiver?:string,
}
//订单列表
export interface orderList{
    userId?:number,
}
//删除收货地址
export interface addressDelete{
    id?:number,
}
//修改收货地址信息
export interface addressUpdate{
    id?:number,
    provinceCode?:number,
    cityCode?:number,
    areaCode?:number,
    address?:string,
    townCode?:number,
    isDefaultActive?:number,
    phoneNumber?:string,
    receiver?:string,
}
//创建订单
export interface orderCreate{
    addressId?:number,
    rows:any
}