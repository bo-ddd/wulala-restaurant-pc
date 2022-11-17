import axios from 'axios';
const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,  //如果接口一秒都没有返回结果，则axios会自动帮我们做一个失败(reject)的处理
    // headers: { 'token': token },  //在发送服务端之前，前端设置请求头信息；
    // headers: { 'token': token },  //在发送服务端之前，前端设置请求头信息；
    // headers:{'Content-Type':'multipart/form-data'},
});
// 使用拦截器，定义全局请求头
instance.interceptors.request.use(config => {
    // 在请求头中添加token\
    let token = sessionStorage.getItem('token');
    if (config.headers) {
        config.headers.token = token
    }
    return config
})

instance.interceptors.response.use(function (response) {
    if (response.data.status == 401) {
        window.location.href = '/'
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
})

/**
 * @description 登录接口
 * @param payload object
 * @param payload.username string 用户名  6-20位
 * @param payload.password string 密码  6-20位
 */
export const loginApi = function (payload = {}) {
    //payload 是不是服务端要的入参
    //就是网页的预览
    return instance.post('/user/login', payload)
}
/**
 * @description 注册接口
 * @param payload object
 * @param payload.username string 用户名  6-20位
 * @param payload.password string 密码  6-20位
 * @param payload.username string 昵称  6-20位
 * @param payload.password string 手机号  6-20位
 */
export const registerApi = function (payload = {}) {
    //payload 是不是服务端要的入参
    //就是网页的预览
    return instance.post('/user/register', payload)
}


/**
 * @description 获取类目接口
 * @param payload object
 */
export const getCCategoryListApi = function (payload = {}) {
    return instance.post('/category/list', payload)
}