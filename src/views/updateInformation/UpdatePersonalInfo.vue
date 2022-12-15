<template>
    <div class="mlr-20">
        <div class="personal-info-update pd-30">
            <h3>个人信息修改</h3>
            <div class="update-avatar grid mt-30">
                <div class="update-avatar-left">头像</div>
                <UploadAvatar class="update-avatar-middle ml-30"></UploadAvatar>
            </div>
            <div class="update-avatar grid">
                <div class="update-avatar-left">昵称</div>
                <div class="update-avatar-name ml-30">{{ avatarName }}</div>
            </div>
            <div class="update-avatar grid">
                <div class="update-avatar-left">生日</div>
                <div class="update-avatar-phone ml-30">{{ getTime(birthday) }}</div>
            </div>
            <div class="update-avatar grid">
                <div class="update-avatar-left">手机号</div>
                <div class="update-avatar-phone ml-30">{{ phoneNumber }}</div>
            </div>
            <div class="update-avatar grid border-bottom">
                <div class="update-avatar-left">登录密码</div>
                <div class="update-avatar-phone ml-30">安全强度 : 弱</div>
            </div>
            <div class="flex update-user-btn mt-20">
                <el-button @click="updateUserInfo" type="success">确认修改</el-button>
                <div class="update-btn"></div>
                <div class="update-btn" @click="">取消</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.personal-info-update{
    width: 58vw;
    background-color: white;
    border: 1px solid #E5E5E5;
}
.pd-30{
    padding: 30px;
}
.update-avatar{
    border-top: 1px solid #E5E5E5;
    padding: 15px;
}
.grid{
    display: grid;
    grid-template-columns: 1fr 6fr 1fr;
    align-items: center;
}
.update-avatar-left{
    font-size: 18px;
    border-right: 1px solid #E5E5E5;
    text-align: center;
}
.update-avatar-middle{
    width: 60px;
    height: 60px;
    border-radius: 24px;
}
.update-avatar-right{
    padding: 10px;
    border: 1px solid #E5E5E5;
    text-align: center;
    border-radius: 30px;
}

.border-bottom{
    border-bottom: 1px solid #E5E5E5;
}
.update-btn{
    padding: 5px;
    border: 1px solid red;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
}
.update-user-btn{
    width: 30%;
}
.flex{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
<script lang="ts" setup>
import { queryUserInfoApi,updateUserInfoApi }  from '@/api/api';
import { ref } from 'vue';
import { getTime } from '@/assets/util/index';
import UploadAvatar from '@/components/UploadAvatar.vue';
import { useIdStore } from '@/stores/getUserId';
import { storeToRefs } from "pinia";
let aa = useIdStore();
aa.getUserIds();
let { userId } = storeToRefs(useIdStore());
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
async function updateUserInfo(){
    let res = await updateUserInfoApi({
        userId:userId,
        avatarImg:avatarImg.value,
        phoneNumber:phoneNumber.value
    })
    console.log(res);
    
    
}
</script>