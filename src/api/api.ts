import axios from 'axios';
let baseUrl = '/api';
const instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000, //如果接口一秒都没有返回结果，则axios会自动帮我们做一个失败(reject)的处理
    headers: { 'Content-Type': 'application/json', }, //在发送服务端之前，前端设置请求头信息；

});

// 添加请求拦截器
instance.interceptors.request.use(function (config :any) {
    config.headers.token = sessionStorage.getItem('token');
    return config;
}, function (error) {
    return Promise.reject(error);
})

const getPostConfig = function () {
    return {
        headers: {
            contentType: "application/json",
            token: sessionStorage.getItem('token'),
        }
    }
}

//添加响应拦截器
instance.interceptors.response.use(function (response) {
    if (response.data.status == 401) {
        window.location.href = '/'
    }
    return response;
}, function (error) {
    return Promise.reject(error);
})

/**
* @description 登录接口
* @param payload object
* @param payload.username string 用户名 6-20位
* @param payload.password string 密码 6-20位
*/

export const loginApi = function (payload = {}) {
    //payload 是不是服务端要的入参
    //就是网页的预览
    return instance.post('/user/login', payload);
}