import axios from 'axios';
import type { 
    login,
    register,
    gatFoodList,
    gatFoodDetail,
    foodAppraiseList,
    addFoodAppraise,
    cartDelete,
    addShoppingCart,
    addressCreate,
    orderList,
    addressDelete,
    addressUpdate,
    orderCreate,
} from "@/types/xhrPayLoadApi";

const $axios = axios.create({
    baseURL: '/api',
    timeout: 5000,  //如果接口一秒都没有返回结果，则axios会自动帮我们做一个失败(reject)的处理
    // headers: { 'token': token },  //在发送服务端之前，前端设置请求头信息；
    // headers: { 'token': token },  //在发送服务端之前，前端设置请求头信息；
    // headers:{'Content-Type':'multipart/form-data'},
});
// 使用拦截器，定义全局请求头
$axios.interceptors.request.use(config => {
    // 在请求拦截器的请求头里面添加token
    let token = sessionStorage.getItem('token');
    if (config.headers) {
        config.headers.token = token
    }
    return config
})



$axios.interceptors.response.use(function (response) {
    if (response.data.status == 401) {
        window.location.href = '/login'
    }
    return response;
}, function (error) {
    return Promise.reject(error);
})

/**
 * @description 登录接口
 * @param payload object
 * @param payload.username string 用户名  6-20位
 * @param payload.password string 密码  6-20位
 */
export const loginApi = function (payload : login) {
    //payload 是不是服务端要的入参
    //就是网页的预览
    return $axios.post('/user/login', payload)
}
/**
 * @description 注册接口
 * @param payload object
 * @param payload.username string 用户名  6-20位
 * @param payload.password string 密码  6-20位
 * @param payload.username string 昵称  6-20位
 * @param payload.password string 手机号  6-20位
 */
export const registerApi = function (payload : register) {
    //payload 是不是服务端要的入参
    //就是网页的预览
    return $axios.post('/user/register', payload)
}
/**
 * @description 查询用户信息
 * @params payload
 */
export const queryUserInfoApi = function (payload ={}) {
    return $axios.post('/user/info', payload);
}

/**
 * @description 获取类目接口
 * @param payload object
 */
export const getCategoryListApi = function (payload = {}) {
    return $axios.post('/category/list', payload)
}

/**
 * @description 获取菜肴列表接口
 * @param payload object
 */
export const gatFoodListApi = function (payload :gatFoodList) {
    return $axios.post('/food/list', payload)
}
/**
 * @description 获取菜肴详情接口
 * @param payload object
 */
export const gatFoodDetailApi = function (payload :gatFoodDetail) {
    return $axios.post('/food/detail', payload)
}
/**
 * @description 菜肴评价列表接口
 * @param payload object
 */
export const foodAppraiseListApi = function (payload :foodAppraiseList) {
    return $axios.post('comment/food/list', payload)
}
/**
 * @description 新增菜肴评价
 * @param payload object
 */
export const addFoodAppraiseApi = function (payload :addFoodAppraise) {
    return $axios.post('/comment/food/create', payload)
}
/**
 * @description 查看我的购物车；列表
 * @param payload object
 */
export const cartListApi = function (payload = {}) {
    return $axios.post('/cart/list', payload)
}
/**
 * @description 删除我的购物车
 * @param payload object
 */
export const cartDeleteApi = function (payload:cartDelete) {
    return $axios.post('/cart/delete', payload)
}
/**
 * @description 加入购物车
 * @param payload object
 */
export const cartAddApi = function (payload :addShoppingCart) {
    return $axios.post('/cart/add', payload)
}
/**
 * @description 收货地址列表
 * @param payload object
 */
export const addressListApi = function (payload = {}) {
    return $axios.post('/delivery/address/list', payload)
}
/**
 * @description 加入购物车
 * @param payload object
 */
export const addShoppingCartApi = function (payload :addShoppingCart) {
    return $axios.post('/cart/add', payload)
}
/* @description 新增收货地址
* @param payload object
*/
export const addressCreateApi = function (payload :addressCreate) {
    return $axios.post('/delivery/address/create', payload)
}
/**
 * @desscription 订单列表
 */
export const orderListApi = function (payload :orderList) {
    return $axios.post('/order/list', payload)
}
/*
 * @description 删除收货地址
 * @param payload object
 */
 export const addressDeleteApi = function (payload :addressDelete) {
    return $axios.post('/delivery/address/delete', payload)
}
/**
 * @description 修改收货地址信息
 * @param payload object
 */
 export const addressUpdateApi = function (payload :addressUpdate) {
    return $axios.post('/delivery/address/update', payload)
}
/**
 * @description 创建订单
 * @param payload object
 */
 export const orderCreateApi = function (payload :orderCreate) {
    return $axios.post('/order/create', payload)
}