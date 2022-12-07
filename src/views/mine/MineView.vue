<template>
    <div class="personal-center mlr-20">
        <div class="s-userbar">
            <div class="avatar-name">
                <img :src = avatarImg class="avatar"/>
                <div class="name-phone" @click="navigator('updatePersonalInfo')">
                    <span class="avatarName-text">{{ avatarName }}</span>
                    <span class="phoneNumber-text">({{ phoneNumber }})</span>
                </div>
            </div>
            <div class="my-delivery-address" @click="navigator('settlement')">我的收货地址</div>
            <el-dropdown>
                <span class="el-dropdown-link">
                    我的优惠信息
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>店铺优惠券 : -</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="s-my-counts">
            <div><span class="segmentation">|</span><span class="pd-52 counts-style">待付款</span></div>
            <div><span class="segmentation">|</span><span class="pd-52 counts-style">待发货</span></div>
            <div><span class="segmentation">|</span><span class="pd-52 counts-style">待收货</span></div>
            <div><span class="segmentation">|</span><span class="pd-52 counts-style">待评价</span></div>
            <div><span class="segmentation">|</span><span class="pd-52 counts-style">退款</span></div>
        </div>
        <div class="guess-like">
            <h3 class="title">根据浏览，猜我喜欢</h3>
            <div class="like-of-shop">
                <div class="food-info" v-for="item in foodList">
                    <img :src=item.bannerUrl class="food-img-size" :title='item.foodName' />
                    <div class="food-price">${{ item.price }}</div>
                    <div class="food-desc">{{ item.description }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.pd-52{
    padding: 0 52px;
}
.s-userbar {
    height: 80px;
    width: 60vw;
    background-color: #f5f8fa;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    justify-items: center;
    border: 1px solid rgb(228, 234, 238);
    border-bottom: none;
}
.avatar-name{
    display: flex;
    justify-content: space-around;
}
.avatar{
    width: 60px;
    height: 60px;
    border-radius: 30px;
}
.name-phone{
    padding-left: 18px;
}
.name-phone:hover{
    cursor: pointer;
    color: red;
}   
.avatarName-text{
    font-size: 14px;
}
.phoneNumber-text{
    font-size: 12px;
}
.my-delivery-address{
    font-size: 10px;
}
.my-delivery-address:hover{
    color: red;
    cursor: pointer;
}
.my-discounts-infomation{
    font-size: 10px;
}
.my-discounts-infomation:hover{
    color: red;
    cursor: pointer;
}
.s-my-counts{
    height: 50px;
    display: grid;
    grid-template-columns:repeat(5,1fr);
    align-items: center;
    justify-items: center;
    border: 1px solid rgb(228, 234, 238);
    background-color: white;
}
.segmentation{
    font-size: large;
    color: #e4eaee;
}
.counts-style{
    font-size: 12px;
}
.counts-style:hover{
    user-select: none;
    cursor: pointer;
    color: red;
}
.guess-like{
    margin-top: 30px;
    width: 100%;
    /* padding: 10px; */
    box-sizing: border-box;
    background-color: #a0cdeb;
    border: 1px solid rgb(228, 234, 238);

}
.guess-like h3{
    color: white;
    font-weight: 400;
    font-size: 20px;
    margin: 10px;
}
.like-of-shop{
    padding: 20px 15px;
    background-color: #f5f8fa;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    row-gap: 20px;
}
.food-img-size{
    width: 200px;
    height: 150px;
}
.food-info{
    padding: 30px 20px;
    width: 200px;
    background-color: white;
    border: 1px solid #fff;
}
.food-info:hover{
    border: 1px solid red;
}
.food-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
}
.food-price{
    padding:5px 0;
    font-size: 18px;
    font-weight: 700;
    color: red;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
<script setup lang="ts">
import { ref } from 'vue';
import { queryUserInfoApi,gatFoodListApi } from '@/api/api';
import router from '@/router';
import { ArrowDown } from '@element-plus/icons-vue';

let avatarImg = ref('');    // 头像
let avatarName = ref('');   // 用户名
let phoneNumber = ref();    // 手机号
let foodList = ref();       // 食物列表

userInfomation();
getFoodList();

/**
 * 用户信息
 * @author Mr.H
 */
async function userInfomation() {
    let res = await queryUserInfoApi({});
    console.log(res);
    avatarImg.value = res.data.data.avatarImg;
    avatarName.value = res.data.data.avatarName;
    phoneNumber.value = res.data.data.phoneNumber;
}

/**
 * 路由跳转
 */
function navigator(name:string){
    router.push({name:name})
}

/**
 * 菜肴列表
 */
async function getFoodList(){
    let res = await gatFoodListApi({});
    console.log(res.data.data.list);
    foodList.value = res.data.data.list;
}
</script>