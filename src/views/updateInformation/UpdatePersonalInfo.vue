<template>
    <div class="mlr-20">
        <div class="personal-info-update pd-30">
            <h3>个人信息修改</h3>
            <div class="update-avatar grid mt-30">
                <div class="update-avatar-left">头像</div>
                <img class="update-avatar-middle ml-30" :src = avatarImg />
                <div class="update-avatar-right">修改</div>
            </div>
            <div class="update-avatar grid">
                <div class="update-avatar-left">昵称</div>
                <div class="update-avatar-name ml-30">{{ avatarName }}</div>
                <div class="update-avatar-right">修改</div>
            </div>
            <div class="update-avatar grid">
                <div class="update-avatar-left">生日</div>
                <div class="update-avatar-phone ml-30">{{ getTime(birthday) }}</div>
                <div class="update-avatar-right">修改</div>
            </div>
            <div class="update-avatar grid">
                <div class="update-avatar-left">手机号</div>
                <div class="update-avatar-phone ml-30">{{ phoneNumber }}</div>
                <div class="update-avatar-right">修改</div>
            </div>
            <div class="update-avatar grid">
                <div class="update-avatar-left">登录密码</div>
                <div class="update-avatar-phone ml-30">安全强度 : 弱</div>
                <div class="update-avatar-right">修改</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.personal-info-update{
    width: 58vw;
    background-color: white;
    border: 1px solid red;
}
.pd-30{
    padding: 30px;
}
.update-avatar{
    border-top: 1px solid red;
    padding: 15px;
}
.grid{
    display: grid;
    grid-template-columns: 1fr 6fr 1fr;
    align-items: center;
}
.update-avatar-left{
    font-size: 18px;
    border-right: 1px solid red;
    text-align: center;
}
.update-avatar-middle{
    width: 48px;
    height: 48px;
    border-radius: 24px;
}
.update-avatar-right{
    padding: 10px;
    border: 1px solid red;
    text-align: center;
    border-radius: 30px;
}
</style>
<script lang="ts" setup>
import { queryUserInfoApi }  from '@/api/api';
import { ref } from 'vue';
import { getTime } from '@/assets/util/index';

let avatarImg = ref('');
let avatarName = ref('');
let phoneNumber = ref();
let birthday = ref('');
getuserInfo();

async function getuserInfo(){
    let res = await queryUserInfoApi();
    console.log(res);
    avatarImg.value = res.data.data.avatarImg;
    avatarName.value = res.data.data.avatarName;
    phoneNumber.value = res.data.data.phoneNumber;
    birthday.value = res.data.data.birthday;
}
</script>