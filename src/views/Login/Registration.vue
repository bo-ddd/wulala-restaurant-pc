<template>
   <div class="content">
      <div class="register">
         <div class="login" @click="toLoginView">登录</div>  
         <img src="@/assets/images/icon-bj_2.png" class="logo-wulala"> 
         <div class="register_box">
            <input type="text" name='name' id='name' v-model="username" required />
            <label for="name" >用户名</label>
         </div>
         <div class="register_box">
            <input type="text" name='name' id='pass' v-model="password" required />
            <label for="name" >密码</label>
         </div>
         <div class="register_box">
            <input type="text" name='name' id='nickname' v-model="avatarName" required />
            <label for="nickname" >昵称</label>
         </div>
         <div class="register_box">
            <input type="text" name='name' id='phone' v-model="phoneNumber" required />
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

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { registerApi } from '@/api/api';
import { ref } from 'vue'
const router = useRouter();
let username = ref();
let password = ref();
let avatarName = ref();
let phoneNumber = ref();
function toLoginView() {
   router.push({
      name: 'login'
   })
}
async function userRegister() {
   let res = await registerApi({
      username: username.value,
      password: password.value,
      avatarName: avatarName.value,
      phoneNumber: phoneNumber.value
   });
   if (res.status == 1) {
      router.push({ name: 'login' });
   }
}
</script>
<style scoped>
.content {
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100vh;
   min-width: 1300px;
   background-image: url('@/assets/images/login-bj.webp');
   background-size: 100% 100%;
}

.logo-wulala {
   filter: invert(100%);
   height: 100px;
}

* {
   /*初始化 清除页面元素的内外边距*/
   padding: 0;
   margin: 0;
   /*盒子模型*/
   box-sizing: border-box;
}

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
   /*overflow: hidden;*/
   position: relative;
   padding: 10px 20px;
   color: #03e9f4;
   /*取消a表现原有的下划线*/
   text-decoration: none;
   /*同样加个过渡*/
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
   /*to right 就是往右边 下面的同理*/
   background: linear-gradient(to right, transparent, #03e9f4);
   /*动画 名称  时长 linear是匀速运动 infinite是无限次运动*/
   animation: move1 1s linear infinite;

}

.register a span:nth-child(2) {
   right: 0;
   top: -100%;
   width: 2px;
   height: 100%;
   background: linear-gradient(transparent, #03e6f4);
   /*这里多了个0.25s其实是延迟时间*/
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