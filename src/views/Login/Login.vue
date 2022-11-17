<template>
    <div class="content">
        <div class="login" v-if="isActiveRegister == true">
            <div class="register-text" @click="toRegisterView">注册 </div>  
            <img src="@/assets/images/icon-bj_2.png" class="logo-wulala"> 
            <div class="login_box">
                <input type="text" name='name' id='name' v-model="loginFrom.username" required  />
                <label for="name" >用户名</label>
            </div>
            <div class="login_box">
                <input type="password" name='pwd' id='pwd' v-model="loginFrom.password" required>
                <label for="pwd">密码</label>
            </div>
            <a @click="userLogin">
                登录
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </a>
        </div>
        <div class="register" v-else>
            <div class="login-text" @click="toLoginView">登录</div>  
            <img src="@/assets/images/icon-bj_2.png" class="logo-wulala"> 
            <div class="register_box">
                <input type="text" name='name' id='username' v-model="registerFrom.username" required />
                <label for="name" >用户名</label>
            </div>
            <div class="register_box">
                <input type="text" name='name' id='password' v-model="registerFrom.password" required />
                <label for="name" >密码</label>
            </div>
            <div class="register_box">
                <input type="text" name='name' id='nickname' v-model="registerFrom.avatarName" required />
                <label for="nickname" >昵称</label>
            </div>
            <div class="register_box">
                <input type="text" name='name' id='phone' v-model="registerFrom.phoneNumber" required />
                <label for="name" >手机号</label>
            </div>
            <a @click="userRegister">
                注册
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </a>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    min-height: 700px;
    min-width: 1300px;
    /* background-image: url('@/assets/images/login-bj.webp'); */
    background-size: 100% 100%;
}

.logo-wulala {
    filter: invert(100%);
    height: 100px;
}

/* * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} */

body {
    /*弹性布局 让页面元素垂直+水平居中*/
    display: flex;
    justify-content: center;
    align-items: center;
    /*让页面始终占浏览器可视区域总高度*/
    height: 100vh;
    /*背景渐变色*/
    background: linear-gradient(#141e30, #243b55);

}

.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px !important;
    padding: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);
}

.login h2 {
    color: #fff;
    margin-bottom: 30px;
}

.login .login_box {
    position: relative;
    width: 100%;
}

.login .login_box input {
    outline: none;
    border: none;
    width: 100%;
    padding: 10px 0;
    margin-bottom: 30px;
    color: #fff;
    font-size: 16px;
    border-bottom: 1px solid #fff;
    background-color: transparent;
}

.login .login_box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    color: #fff;
    pointer-events: none;
    transition: all 0.5s;
}

.login .login_box input:focus+label,
.login .login_box input:valid+label {
    top: -20px;
    color: #03e9f4;
    font-size: 12px;
}

.login a {
    /* overflow: hidden; */
    position: relative;
    padding: 10px 20px;
    color: #03e9f4;
    text-decoration: none;
    transition: all 0.5s;
    cursor: pointer;
}

.login a:hover {
    color: #fff;
    border-radius: 5px;
    background-color: #03e9f4;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
}

.login a span {
    position: absolute;
}

.login a span:first-child {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    /*to right 就是往右边 下面的同理*/
    background: linear-gradient(to right, transparent, #03e9f4);
    /*动画 名称  时长 linear是匀速运动 infinite是无限次运动*/
    animation: move1 1s linear infinite;

}

.login a span:nth-child(2) {
    right: 0;
    top: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(transparent, #03e6f4);
    /*这里多了个0.25s其实是延迟时间*/
    animation: move2 1s linear 0.25s infinite;
}

.login a span:nth-child(3) {
    right: -100%;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to left, transparent, #03e9f4);

    animation: move3 1s linear 0.5s infinite;
}

.login a span:last-child {
    left: 0;
    bottom: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(#03e9f4, transparent);
    animation: move4 1s linear 0.75s infinite;
}

@keyframes move1 {
    0% {
        left: -100%;

    }

    50%,
    100% {
        left: 100%;
    }
}

@keyframes move2 {
    0% {
        top: -100%;

    }

    50%,
    100% {
        top: 100%;
    }
}

@keyframes move3 {
    0% {
        right: -100%;

    }

    50%,
    100% {
        right: 100%;
    }
}

@keyframes move4 {
    0% {
        bottom: -100%;

    }

    50%,
    100% {
        bottom: 100%;
    }
}

.register {
    text-align: right;
    font-size: 16px;
    color: white;
    cursor: pointer;
}

.logo-wulala {
    filter: invert(100%);
    height: 100px;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.register {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    padding: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);

}

.register h2 {
    color: #fff;
    margin-bottom: 30px;
}

.register .register_box {
    position: relative;
    width: 100%;
}

.register .register_box input {
    outline: none;
    border: none;
    width: 100%;
    padding: 10px 0;
    margin-bottom: 30px;
    color: #fff;
    font-size: 16px;
    border-bottom: 1px solid #fff;
    background-color: transparent;
}

.register .register_box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    color: #fff;
    pointer-events: none;
    transition: all 0.5s;
}

.register .register_box input:focus+label,
.register .register_box input:valid+label {
    top: -20px;
    color: #03e9f4;
    font-size: 12px;
}

.register a {
    position: relative;
    padding: 10px 20px;
    color: #03e9f4;
    text-decoration: none;
    transition: all 0.5s;
    cursor: pointer;
}

.register a:hover {
    color: #fff;
    border-radius: 5px;
    background-color: #03e9f4;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
}

.register a span {
    position: absolute;
}

.register a span:first-child {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, #03e9f4);
    animation: move1 1s linear infinite;

}

.register a span:nth-child(2) {
    right: 0;
    top: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(transparent, #03e6f4);
    animation: move2 1s linear 0.25s infinite;
}

.register a span:nth-child(3) {
    right: -100%;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to left, transparent, #03e9f4);

    animation: move3 1s linear 0.5s infinite;
}

.register a span:last-child {
    left: 0;
    bottom: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(#03e9f4, transparent);
    animation: move4 1s linear 0.75s infinite;
}

.login {
    width: 100%;
    text-align: right;
    font-size: 16px;
    color: white;
    cursor: pointer;
}

@keyframes move1 {
    0% {
        left: -100%;

    }

    50%,
    100% {
        left: 100%;
    }
}

@keyframes move2 {
    0% {
        top: -100%;

    }

    50%,
    100% {
        top: 100%;
    }
}

@keyframes move3 {
    0% {
        right: -100%;

    }

    50%,
    100% {
        right: 100%;
    }
}

@keyframes move4 {
    0% {
        bottom: -100%;

    }

    50%,
    100% {
        bottom: 100%;
    }
}
</style>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
// import { useCounterStore } from '@/stores/counter';
// import { loginApi, registerApi } from "@/api/api.js";
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
// import { removeStyle } from 'element-plus/es/utils';
let router = useRouter();
// let {count} = useCounterStore();
// console.log(count);
let loginFrom = ref({
    username: '',
    password: ''
})

let registerFrom = ref({
    username: '',
    password: '',
    avatarName: '',
    phoneNumber: ''
})
let isActiveRegister = ref(false);
let isActive1 = ref(false);

function toRegisterView() {
    isActiveRegister.value = false;
    isActive1.value = true;
}
function toLoginView() {
    isActive1.value = false;
    isActiveRegister.value = true;
}

//校验用户名（正则表达式）
// let regexp = '/^[a-zA-Z0-9_-]{4,16}$/';
// regexp.match(registerFrom.value.username)
function validate() {
    let res = { result: true };
    if (registerFrom.value.username == '') {
        res.result = false;
        ElMessage({
            message: '用户名不能为空',
            type: 'warning',
        })
    } else if (registerFrom.value.password == '') {
        res.result = false;
        ElMessage({
            message: '密码不能为空',
            type: 'warning',
        })
    }else if (registerFrom.value.avatarName == '') {
        res.result = false;
        ElMessage({
            message: '昵称不能为空',
            type: 'warning',
        })
    }else if (registerFrom.value.phoneNumber == '') {
        res.result = false;
        ElMessage({
            message: '手机号不能为空',
            type: 'warning',
        })
    }
    if (!res.result) {
        res.result = false;
        ElMessage({
            message: '',
            type: 'warning',
        })
    };
    return res.result;
}

async function userLogin() {
    let isvalidate = validate();
    if(!isvalidate) return
    let res = await loginApi({
        username: loginFrom.value.username,
        password: loginFrom.value.password,
    });
    if (res.status == 1) {
        ElMessage({
            message: '登录成功',
            type: 'success',
        })
        router.push({ name: 'layout' });
        sessionStorage.setItem('token', res.data.token);
    }
    console.log(res);

}

async function userRegister() {
    let res = await registerApi({
        username: registerFrom.value.username,
        password: registerFrom.value.password,
        avatarName: registerFrom.value.avatarName,
        phoneNumber: registerFrom.value.phoneNumber
    });
    if (res.status == 1) {
        router.push({ name: 'login' });
    }
}
</script>
